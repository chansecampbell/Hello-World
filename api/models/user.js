var mongoose = require("mongoose");
var bcrypt   = require('bcrypt-nodejs');
var validator     = require("validator");

var userSchema = mongoose.Schema({
  local: {
    username: { type: String },
    fullname: { type: String },
    image: { type: String },
    email: { type: String, unique: true, required: true },
    passwordHash: { type: String }
  }
});

userSchema.methods.validatePassword = function(password){
  return bcrypt.compareSync(password, this.local.passwordHash, null);
};

userSchema.virtual('password')
  .set(function(password){
    this.local._password    = password;
    this.local.passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  });

userSchema.virtual('passwordConfirmation')
  .set(function(passwordConfirmation){
    this.local._passwordConfirmation = passwordConfirmation;
  });

userSchema.path('local.passwordHash').validate(function(){
  if (this.isNew){
    if (!this.local._password){
      this.invalidate('password', 'Password is required');
    }
    if (this.local._password.length < 6){
      this.invalidate('password', 'Password must be longer than 6 characters.');
    }
    if (this.local._password !== this.local._passwordConfirmation){
      this.invalidate('passwordConfirmation', 'Passwords must match');
    }
  }
  });

userSchema.path('local.email')
  .validate(function(email){
    if (!validator.isEmail(email)){
      this.invalidate('email', 'must be a valid email address');
    }
  });

userSchema.set('toJSON', {
  transform: function(doc, ret, options){
      delete ret.passwordHash;
      return ret;
   }
  });

module.exports = mongoose.model("User", userSchema);
