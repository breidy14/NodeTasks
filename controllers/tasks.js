const Task = require('../models').Task;
const Project = require('../models').Project;
module.exports = {
    edit: (req,res) => {
        Task.findByPk(req.params.id).then(function(task){
            res.render('tasks/edit',{task})
        });
    },
    create: async (req,res, next) => {
        const project = await Project.findOne({where: {url: req.params.url}});
        const project_id = project.id;
        const name = req.body.name;
        const estado = 0;
        Task.create({
            name,
            project_id,
            estado
        }).then(task=>{
            res.redirect(`/projects/${req.params.url}`);
        }).catch(err=>{
            console.log(err);
        })
    },
    update: async (req,res, next) => {
        const task = await Task.findOne({where:{id: req.params.id}})
        //let estado = 0;

        if(task.estado === 0){
            task.estado = 1
        }else{
            task.estado = 0;
        }

        const result = await task.save();

        if(!result) return next();
        
        res.status(200).send('Actualizado');
    },
    destroy: (req,res) => {
        Task.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(contElementosEliminados){
            res.status(200).send('Tarea Eliminada Correctamente');
        }).catch(err=>{
            console.log(err);
        })
    }
};