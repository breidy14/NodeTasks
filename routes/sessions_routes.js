const express = require('express');

let SessionsController = require('../controllers/sessions');
let RegistrationsController = require('../controllers/registrations');

let router = express.Router();

router.route('/sessions').get(SessionsController.new)
.post(SessionsController.create)
.delete(SessionsController.destroy);

router.route('/registrations').get(RegistrationsController.new)
.post(RegistrationsController.create);

module.exports = router;