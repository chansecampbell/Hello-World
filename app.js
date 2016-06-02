var express        = require('express');
var cors           = require('cors');
var path           = require('path');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var mongoose       = require('mongoose');
var passport       = require('passport');
var cookieParser   = require("cookie-parser");
var methodOverride = require("method-override");
var jwt            = require('jsonwebtoken');
var expressJWT     = require('express-jwt');
var request        = require('request-promise');
var qs             = require('qs');
var multer         = require('multer');
var s3             = require('multer-s3');
var uuid           = require('uuid');

var app            = express();

var config         = require('./config/config');
var User           = require('./models/user');
var secret         = require('./config/config').secret;

mongoose.connect(config.database);

require('./config/passport')(passport);

app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors({
  origin: config.appUrl,
  credentials: true
}));

// After the user logs in with facebook, facebook's server will send a request to this endpoint
// with a code and a client id, which we will use to get an access token
app.post('/api/auth/facebook', function(req, res) {
  var params = {
    code: req.body.code,
    client_id: req.body.clientId,
    client_secret: process.env.SATELIZER_FACEBOOK_API_SECRET,
    redirect_uri: config.appUrl + "/"
  };
  console.log(params);

  // step 1, we make a request to facebook for an access token
  request.get({ url: config.oauth.facebook.accessTokenUrl, qs: params, json: true })
    .then(function(accessToken) {
      console.log("Access token is ", accessToken);
      // step 2, we use the access token to get the user's profile data from facebook's api
      return request.get({ url: config.oauth.facebook.profileUrl, qs: accessToken, json: true });
    })
    .then(function(profile) {
      console.log("Profile is ", profile);
      // step 3, we try to find a user in our database by their email
      return User.findOne({ email: profile.email })
        .then(function(user) {
          console.log("User is ", user);
          // if we find the user, we set their facebookId and picture to their profile data
          if(user) {
            if (profile.picture.data.url){
              user.picture = profile.picture.data.url; 
            } else {
              user.picture = user.picture;
            }
          }
          else {
            // otherwise, we create a new user record with the user's profile data from facebook
            user = new User({
              facebookId: profile.id,
              firstName: profile.first_name,
              lastName: profile.last_name,
              picture: profile.picture.data.url,
              email: profile.email
            });
          }
          // either way, we save the user record
          return user.save();
        });
      })
      .then(function(user) {
        // step 4, we create a JWT and send it back to our angular app
        var token = jwt.sign(user, config.secret, { expiresIn: '24h' });
        return res.send({ token: token });
      })
      .catch(function(err) {
        // we handle any errors here
        return res.status(500).json({ error: err });
      });
});

app.use(passport.initialize());

app.use('/api', expressJWT({ secret: secret })
  .unless({
    path: [
      { url: '/api/login', methods: ['POST'] },
      { url: '/api/register', methods: ['POST'] },
      { url: '/api/auth/facebook', methods: ['POST'] }
    ]
  }));

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({message: 'Unauthorized request.'});
  }
  next();
});

var upload = multer({
  storage: s3({
    // the folder within the bucket
    dirname: 'uploads',
    // set this to your bucket name
    bucket: process.env.WDI_S3_BUCKET,
    // your AWS keys
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    // the region of your bucket
    region: 'eu-west-1',
    // IMPORTANT: set the mime type to that of the file
    contentType: function(req, file, next) {
      next(null, file.mimetype);
    },
    // IMPORTANT: set the file's filename here
    // ALWAYS CHANGE THE FILENAME TO SOMETHING RANDOM AND UNIQUE
    // I'm using uuid (https://github.com/defunctzombie/node-uuid)
    filename: function(req, file, next) {
      // Get the file extension from the original filename
      var ext = '.' + file.originalname.split('.').splice(-1)[0];
      // create a random unique string and add the file extension
      var filename = uuid.v1() + ext;
      next(null, filename);
    }
  })
});

// This will upload a single file.
app.post('/upload/single', upload.single('file'), function(req, res) {
  res.status(200).json({ filename: req.file.key });
});

// This will upload multiple files.
app.post('/upload/multi', upload.array('files'), function(req, res) {
  filenames = Object.keys(req.files).map(function(key) {
    console.log("sending the photo to s3..")
    return req.files[key].key;
  });
  res.status(200).json({ filenames: filenames });
});

var routes = require('./config/routes');
app.use("/api", routes);

app.use(express.static(__dirname + "/front-end"));

app.get("/*", function(req, res) {
    res.sendFile(__dirname + "/front-end/index.html");
});

app.listen(config.port);
console.log("Express is alive and kicking on port " + config.port);
