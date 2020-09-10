module.exports = function(req,res,next){
    if(!req.originalUrl.includes("projects")) return next();

    if(req.session.userId) return next();

    res.redirect('/sessions');
}