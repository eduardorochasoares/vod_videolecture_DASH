
module.exports.catalog = function(req, res, list, dash_server_ip){
    res.render("site/catalog", {videolist: list, dash_server : dash_server_ip});
};
