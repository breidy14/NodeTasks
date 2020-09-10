const e = require('express');

const Project = require('../models').Project;
const Task = require('../models').Task;

module.exports = {
    index: (req,res) =>{
        /**/
        const user_id = req.session.userId;
        Project.List(user_id)
        .then(projects =>{
            res.render('projects/index',{
                projects,
                nombrePagina: 'Proyectos'
            });
        }).catch(err=>{
            console.log(err);
        });
    },
    show: function(req,res){
        Project.findByPk(req.params.id).then(function(project){//
            res.render('projects/show',{
                project,
                nombrePagina: 'Proyectos'
            }) // en JS cuando la variable y la clave rienene el mismo nombre, puedes solo escribir el nombre una vez, no es necesarion poner ej: {task: task}
        }).catch(err=>{
            console.log(err);
        });
    },
    edit: function(req,res){
        Project.findByPk(req.params.id).then(function(project){//
            res.render('projects/edit',{
                project,
                nombrePagina: 'Proyectos'
            }).catch(err=>{
                console.log(err);
            });
        });
    },
    create: (req,res) =>{
        const user_id = req.session.userId;
        const projects = Project.List(user_id);
        const name = req.body.name;
        let errs = [];

        if(!name){
            errs.push({'texto': 'Agrega un Nombre al Proyecto'})
        };

        // En caso de haber errores al traer los datos insertados
        if(errs.length > 0 ){
            res.render('projects/new',{
                projects,
                nombrePagina: 'Nuevo Proyecto'
            }).catch(err=>{
                console.log(err);
            });
        }else{
            // En caso de que no
            Project.create({
                name,
                user_id
            }).then(project=>{
                res.redirect('/projects');
            }).catch(err=>{
                res.render('projects/new');
                console.log(err);
            })
        }
    },
    update: function(req,res){
        Project.update({name: req.body.name},{
            where: {
                id: req.params.id
            }
        }).then(function(response){
            res.redirect('/projects/'+req.params.id)
        }).catch(err=>{
            console.log(err);
        });
    },
    destroy: function(req,res){
        Project.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(contElementosEliminados){
            res.redirect('/projects/')
        }).catch(err=>{
            console.log(err);
        });
    },
    new: function(req,res){
        const user_id = req.session.userId;
        Project.List(user_id)
        .then(projects =>{
            res.render('projects/new',{
                projects,
                nombrePagina: 'Proyectos'
            });
        }).catch(err=>{
            console.log(err);
        });
        
    }
}