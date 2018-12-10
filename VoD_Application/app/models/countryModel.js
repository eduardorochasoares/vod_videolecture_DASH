var db = require('../../config/db')

module.exports = function(){
        this.all = function(ret){
            var conn = db();
            return conn.query('select * from countries', ret);

        };
    return this;
};
