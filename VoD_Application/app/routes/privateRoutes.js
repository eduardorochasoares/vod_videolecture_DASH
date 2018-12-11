var catalogController = require('../controllers/catalogController');
var loginController = require('../controllers/loginController');
var videoController = require('../controllers/videoController');
require("dotenv-safe").load();
var dash_server_ip = 'http://127.0.0.1:8000';
var jwt = require('jsonwebtoken');

var verifyJWT = function(req, res, next){
      //get token store in the cookies
      if (!req.headers['cookie']){
          res.redirect('/login');
      }
      var token = req.headers['cookie'].split("=")[1];
      if (!token){
          res.clearCookie("auth");
          return res.redirect('/login');
      }
      jwt.verify(token, process.env.SECRET, function(err, decoded) {
        if (err){
            res.clearCookie("auth");

            return res.redirect('/login');
        }
        // se tudo estiver ok, salva no request para uso posterior
        req.userId = decoded.id;
        next();

      });
}

module.exports = function(app){

    app.get('/catalog', verifyJWT,  function(req, res){
        list = videoController.getVideoList(req, res);

        catalogController.catalog(req, res, list, dash_server_ip);

    });
      //console.log(clientModel.all())

  app.get('/video/:videoID',verifyJWT, function(req, res) {
      //video_file_path = videoController.getVideoPath(req, res);
      video_name = req.params.videoID;
      videoController.streamingVideo(req, res, video_name, dash_server_ip);

  });

  app.get('/', verifyJWT, function(req,res){
      res.redirect('/catalog');
    //console.log(clientModel.all())
  });


};
