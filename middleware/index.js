const jwt = require('jsonwebtoken')

const logger = (req, res, next) => {
  console.log('Logging route: ', req.url, new Date().toISOString());
  next();
}

const authenticate = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !== 'undefined'){
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;

    jwt.verify(req.token, 'secret', (err, decoded) => {
      if(err){
        res.sendStatus(403);
      }else{
        req.user = decoded
      }
    });
    next();
  }else{
    res.sendStatus(403);
  }
  
}

module.exports = {
  logger,
  authenticate
}