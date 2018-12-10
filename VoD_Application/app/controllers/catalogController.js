
module.exports.catalog = function(req, res, list){
    console.log(list);
    res.render("site/catalog", {videolist: list});
};
