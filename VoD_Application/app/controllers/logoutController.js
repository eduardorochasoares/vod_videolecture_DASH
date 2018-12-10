module.exports.logout = function(req, res){
    res.clearCookie("auth");
    res.redirect("/login");

};
