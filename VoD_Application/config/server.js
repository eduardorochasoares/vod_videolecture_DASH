 /*** Configuration of the server.

        Setting the routes and libs
 ***/



module.exports = function(){
    var express = require('express');
    var cors = require('cors')
    var bodyParser = require('body-parser');
    var expressValidator =  require('express-validator');
    var session = require('express-session');
    var bcrypt = require('bcrypt-nodejs')
    var app = express();
    require("dotenv-safe").load();





    app.set('view engine', 'ejs');
    app.set('views', './app/views');

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(cors())

    app.use(expressValidator());
    var routes = require('../app/routes/web');
    routes(app);
    var privateRoutes = require('../app/routes/privateRoutes');
    privateRoutes(app);

    app.listen(8001,function(){
      console.log("localhost:8001");
    });

}
