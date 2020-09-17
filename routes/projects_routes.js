const express = require('express');
const ProjectsController = require('../controllers/projects');

//express validator
//const { body } = require('express-validator/check');

let router = express.Router();


router.route('/projects').get(ProjectsController.index).post(ProjectsController.create);

router.get('/projects/new', ProjectsController.new); // esta ruta debe de ir antes de la rutas que utilizan wildcar, 
//ya /new tambien podria ser un wildcar, y entonces nuca se llegaria a la peticion 
//crear nuevo es decir /new

router.get('/projects/:id/edit', ProjectsController.edit);

router.route('/projects/:id')
.put(ProjectsController.update);
//.delete(ProjectsController.destroy);

router.route('/projects/:url') 
.get(ProjectsController.show)
.delete(ProjectsController.destroy);

module.exports = router;
