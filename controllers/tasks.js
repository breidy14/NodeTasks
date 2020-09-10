const Task = require('../models').Task;

module.exports = {
    index: function(req,res){
        //Task.findAll().then((tasks)=>{
        //    res.render('tasks/index',{tasks: tasks});
        //})
        Task.findAll({
            where: {project_id: 1}//Buscar la forma de pasar el id del proyecto
        }).then(tasks =>{
            res.render('tasks/index',{
                tasks,
                nombrePagina: 'Tareas'
            });
        }).catch(err=>{
            console.log(err);
        });
    },
    show: function(req,res){
        Task.findByPk(req.params.id).then(function(task){
            res.render('tasks/show',{task}) // en JS cuando la variable y la clave rienene el mismo nombre, puedes solo escribir el nombre una vez, no es necesarion poner ej: {task: task}
        })
    },
    edit: function(req,res){
        Task.findByPk(req.params.id).then(function(task){
            res.render('tasks/edit',{task})
        });
    },
    create: function(req,res){
        Task.create({
            description: req.body.description
        }).then(task=>{
            res.json(task);
        }).catch(err=>{
            console.log(err);
            res.json(err);
        })
    },
    update: function(req,res){
        Task.update({description: req.body.description},{
            where: {
                id: req.params.id
            }
        }).then(function(response){
            res.redirect('/tasks/'+req.params.id)
        })
    },
    destroy: function(req,res){
        Task.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(contElementosEliminados){
            res.redirect('/tasks/')
        })
    },
    new: function(req,res){
        res.render('tasks/new');
    }
};