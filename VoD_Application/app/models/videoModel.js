module.exports = function(){
        this.all = function(ret){

            let fs = require('fs');
            let aux = fs.readFileSync("../DASH_Server/video_list.txt", 'utf8');
            aux = aux.split('\n');
            let response = [];
            for (let i = 0; i < aux.length;  i ++){
                response.push(aux[i].split(":")[0]);
            }
            response.splice(-1, 1);
            //console.log(ret);
            return response;


        };
        return this;
};
