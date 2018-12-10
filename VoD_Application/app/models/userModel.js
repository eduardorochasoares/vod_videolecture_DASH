var db = require('../../config/db')
module.exports = function(){
        this.save = function(data, ret){
            var conn = db();
            return conn.query('insert into user set ?', data, ret);

        };
        this.getUserByLogin = function(email, ret){
            var conn  = db();
            return conn.query('select * from user where email = ?', email, ret);
        }
    return this;
};
