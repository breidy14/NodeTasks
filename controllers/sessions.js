//const { use } = require('../routes/tasks_routes');
//const { json } = require('sequelize/types');

const User = require('../models').User;

module.exports = {
    new: (req,res)=>{
        res.render('sessions/login');
    },
    create: (req,res)=>{
        User.login(req.body.email, req.body.password)
        .then(user => {
            if(user){
                //req.session.user = user; obtener usuario y guardar en express session, perfeccionar en v2
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
        });
    },
    destroy: (req,res)=>{
        req.session.destroy(()=>{
            res.redirect('/sessions');
        });
    }
}