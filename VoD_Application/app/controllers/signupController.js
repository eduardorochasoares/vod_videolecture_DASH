var countryModel = require('../models/countryModel')();
var userModel = require('../models/userModel')();
var encrypt = require('../../config/server');
//var bcrypt = require('bcrypt-nodejs');

module.exports.signUp = function(req, res){

    countryModel.all(function(error, ret){

        //res.render("site/signup", {countries: ret, errors: {}, data:{}});
    });

};

module.exports.store = function(req, res){
    var data = req.body;
    req.assert('name', 'Fill in the name').notEmpty().trim().escape();
    req.assert('name', 'Name must to have from 3 to 50 characteres').len(3, 20);
    req.assert('email', 'Fill in the E-mail').notEmpty();
    req.assert('email', 'Not a valid E-mail').isEmail();

    req.assert('password', 'Fill in the Password').notEmpty().trim().escape();
    req.assert('password', 'Password must to have from 8 to 15 characteres').len(8, 15);

    req.assert('confirmpass', 'Passwords do not match ').equals(req.body.password);
    req.assert('confirmpass', 'Fill in the Password').notEmpty().trim().escape();
    req.assert('confirmpass', 'Password must to have from 8 to 15 characteres').len(8, 15);


    req.assert('phone', 'Fill in the phone').notEmpty().trim().escape();
    req.assert('phone', 'Phone must at least 8 digits').len(8,);



    req.assert('address', 'Fill in the address').notEmpty().trim().escape();


    var validationErrors = req.validationErrors();

    if(validationErrors){

        countryModel.all(function(error, ret){
            res.render("site/signup", {countries : ret, errors : validationErrors, data :data});

        });

        return;
    }

    bcrypt.hash(req.body.password, null, null, function(error, hash) {
        data.password = hash;
        // Store hash in DB.
        userModel.save(data, function(error, ret){
            if (!error){
                res.redirect("/");
            }else{
                console.log("Error to insert user");
                res.redirect("/");
            }
        });

    });


};
