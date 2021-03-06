import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const verifyUser = (req, res, next) => {

  try {
    if (!req.headers.auth) {
        res.status(401).send({ status: 401, error:'Authentication required'});
      }
else{jwt.verify(req.headers.auth, process.env.secretKey, (err, result) => {
  if (err) {
    res.status(401).json({
      status: 401,
      error: 'Invalid authentication'
    });
  } else {
    req.user = result;
    next();
  }
});
}
    

  } catch (err) {
    /* istanbul ignore next*/ 
    res.status(500).json({
      status: 500,
      error: err.message
    });
  }

};
export default verifyUser;