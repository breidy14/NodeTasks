const User = require('../models').User;

module.exports = {
    new: function(req,res){
        res.render('registrations/new')
    },
    create: function(req,res){
        let data = {
            email: req.body.email,
            password: req.body.password
        };

        User.create(data).then(user=>{
            res.render('sessions/login');
        }).catch(err=>{
            res.render('sessions/login');
        });
    }
};