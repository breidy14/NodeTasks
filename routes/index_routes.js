const express = require('express');
const router =express.Router();

//controlador
const indexController = require("../controllers/index");

router.route('/index').get(indexController.index);

module.exports = router;