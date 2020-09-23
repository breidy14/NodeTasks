const User = require('../models').User;

module.exports = {
    new: function(req,res){
        res.render('sessions/sign-in');
    },
    create: function(req,res){
        let data = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
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