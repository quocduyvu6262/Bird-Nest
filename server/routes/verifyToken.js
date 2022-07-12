const jwt = require('jsonwebtoken');


module.exports = function(req, res, next) {
    const token = req.header('auto-token');
    if(!token) return res.status(401).send('Access Denied.');

    // verify the token
    try{
        const verify = jwt.verify(token, process.env.SECRET_KEY);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token.');
    }
}