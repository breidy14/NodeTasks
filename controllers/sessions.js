//const { use } = require('../routes/tasks_routes');
//const { json } = require('sequelize/types');

const User = require('../models').User;

module.exports = {
    new: function(req,res){
        res.render('sessions/login');
    },
    create: function(req,res){
        User.login(req.body.email, req.body.password)
        .then(user => {
            if(user){
                /*req.session.User={
                    userId: user.id,
                    userName: user.first_name,
                    userLastName: user.last_name
                }*/
                req.session.userId = user.id;
                res.redirect('/projects')
            }else{
                res.render('sessions/login',{
                    msgErr:"Usuario o Contraseña inválidos"
                });
            }
        })
        .catch(err=>{
            console.log(err);
            res.json(err);
        });
    },
    destroy: function(req,res){
        req.session.destroy(function(){
            res.redirect('/sessions');
        });
    }
}