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
    show: async (req,res) => {
        const user_id = req.session.userId;
        const projectsPromise = Project.List(user_id);
        
        const projectPromise = Project.findOne({
            where:{
                url: req.params.url
            }
        }).catch(err=>{
            console.log(err);
        });;
        
        const [projects, project] = await Promise.all([projectsPromise, projectPromise ]);
        
        const tasks = await Task.findAll({
            where: {
                project_id : project.id
            },
            // include: [
            //     { model: Proyectos }
            // ]
        });
    
        if(!project) return next();
        // render a la vista
        res.render('tasks', {
            nombrePagina : 'Task',
            project,
            projects, 
            tasks
        })
    },
    edit: async (req,res)=> {
        const user_id = req.session.userId;
        const projectsPromise = Project.List(user_id);
        
        const projectPromise = Project.findOne({
            where:{
                id: req.params.id,
            }
        }).catch(err=>{
            console.log(err);
        });;
        
        const [projects, project] = await Promise.all([projectsPromise, projectPromise ]);
        
        res.render('projects/edit',{
            project,
            projects,
            nombrePagina: 'Proyectos'
        })
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
            })
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
    update: (req,res)=> {
        Project.update({name: req.body.name},{
            where: {
                id: req.params.id
            }
        }).then((response)=> {
            res.redirect('/projects/'+req.params.id)
        }).catch(err=>{
            console.log(err);
        });
    },
    destroy: (req,res)=> {
        Project.destroy({
            where: {
                id: req.params.id
            }
        }).then((contElementosEliminados)=> {
            res.redirect('/projects/')
        }).catch(err=>{
            console.log(err);
        });
    },
    new: (req,res)=> {
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