
var loginController = require('../controllers/loginController');
var signUpController = require('../controllers/signupController');
var catalogController = require('../controllers/catalogController');
var logoutController  = require('../controllers/logoutController');
module.exports = function(app){


    app.get('/login',function(req,res){
        loginController.login(req, res);
      //console.log(clientModel.all())
    });
    app.get('/signup',function(req,res){
        signUpController.signUp(req, res);
      //console.log(clientModel.all())
    });

    app.post('/signup', function(req, res){
        signUpController.store(req, res);
    });

    app.post('/login',function(req, res){
        loginController.authentication(req, res);
    });

    

    app.get('/logout',function(req,res){
        logoutController.logout(req, res);
      //console.log(clientModel.all())
    });

};
