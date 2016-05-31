var express = require('express');
var router  = express.Router();

var usersController = require('../controllers/usersController');
var journeysController = require('../controllers/journeysController');
var countriesController = require('../controllers/countriesController');
var authenticationsController = require('../controllers/authenticationsController');

router.post('/login', authenticationsController.login);
router.post('/register', authenticationsController.register);

router.route('/')
  .get(usersController.usersIndex);

router.route('/users')
  .get(usersController.usersIndex);

router.route('/users/:id')
  .get(usersController.usersShow)
  .put(usersController.usersUpdate)
  .delete(usersController.usersDelete);

router.route('/journeys')
  .get(journeysController.journeysIndex);

router.route('/journeys/:id')
  .get(journeysController.journeysShow)
  .put(journeysController.journeysUpdate)
  .delete(journeysController.journeysDelete);

router.route('/countries')
  .get(countriesController.countriesIndex);

router.route('/countries/:id')
  .get(countriesController.countriesShow)

module.exports = router;
