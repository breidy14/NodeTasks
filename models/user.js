'use strict';

const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      validation: {
        unique: true,
        msg: 'Email ya en uso'
      },
      allowNull: false,
      validation:{
        isEmail: true,
        msg: 'No es un email'
      }
    },
    password_hash: DataTypes.STRING,
    password: DataTypes.VIRTUAL
  }, {});

  User.login = function(email,password){
    return User.findOne({
      where: {
        email: email, //tambien puedes usar short hand property y solo poner email
      }
    }).then(user=>{
      if(!user) return null;

      return user.authenticatePassword(password).then(valid=>{
        if(valid) 
        return user;
        
        return null // Tambien se puede escribir .then(valid=> valid ? user : null);
      });
    })
  };
  
  User.prototype.authenticatePassword = function(password){
    return new Promise((res,rej)=>{
      bcrypt.compare(password,this.password_hash,function(err,valid){
        if(err) return rej(err);

        res(valid);
      })
    })
  };

  User.associate = function(models) {
    // associations can be defined here
  };

  User.beforeCreate(function(user,options){
    //bcrypt.hash
    return new Promise((res,rej)=>{

      if(user.password){
        bcrypt.hash(user.password, 10, function(error,hash){
          user.password_hash = hash;
          res();
        })
      };

    });

  });
  
  return User;
};