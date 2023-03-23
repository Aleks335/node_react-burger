const jwt = require("jsonwebtoken");
const {secret} = require('./constants');

function validateTokenMiddleware(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    console.log(token);
  
    if (token == null) return res.sendStatus(401);

    // верефикация токена
    jwt.verify(token, secret, (err, decoded) => {
      if (err) return res.sendStatus(403);
      req.tokenData = decoded;
      next();
    });
}

module.exports = {
    validateTokenMiddleware
}