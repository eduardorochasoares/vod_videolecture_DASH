
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt-nodejs');

var userModel = require('../models/userModel')();
require("dotenv-safe").load();


module.exports.index = function(req, res){
    res.render("site/index");

};

module.exports.login = function(req, res){
    res.render("site/login", {validationErrors : {}, loginError : {}});
};

module.exports.authentication = function(req, res){
    var data = req.body;
    var id = ''

    req.assert('email', 'Fill in the E-mail').notEmpty();
    req.assert('email', 'Not a valid E-mail').isEmail();

    req.assert('password', 'Fill in the Password').notEmpty().trim().escape();
    req.assert('password', 'Password must to have from 8 to 15 characteres').len(8, 15);

    var validationErrors = req.validationErrors();

    if(validationErrors){
        res.render('site/login', {validationErrors : validationErrors, loginError : {}});
        return;
    }

    userModel.getUserByLogin(req.body.email, function(error, ret){
        if(ret[0] && !error){
            bcrypt.compare(req.body.password, ret[0].password, function(err, resComp) {
                if(resComp == true){
                    id = ret[0].id;
                    var token = jwt.sign({ id }, process.env.SECRET, {
                     
                    });
                    res.cookie("auth", token);
                    res.redirect("/catalog");
                }else{
                    res.render('site/login', {validationErrors: {}, loginError : ['Login or password do not match']});
                }

            });

        }

    });



};
