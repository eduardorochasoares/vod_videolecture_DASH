var mysql = require('mysql');

var conn = function(){
    return  mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : 'root',
      database : 'vod_streamming_system'
    });
};

module.exports = conn;
