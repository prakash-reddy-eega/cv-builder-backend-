import jwt from 'jsonwebtoken'
import { APIResponse } from '../utils/common.js';

export const jwtValidation = (req, res, next) => {
    let jwtToken;
    const authHeader = req.headers.authorization
    if (authHeader) {
        jwtToken = authHeader.split(" ")[1];
      if (jwtToken === undefined) {
        const response = new APIResponse(0, 'Unauthorized User')
        res.status(401);
        res.send(response);
      } else {
        jwt.verify(jwtToken, process.env.JWT_SECRET_KEY, async (error, payload) => {
          if (error) {
            const response = new APIResponse(0, 'Invalid JWT TOKEN')
            res.status(401).send(response);
          } else {
            next();
          }
        });
      }
    }else{
        const response = new APIResponse(0, 'Unauthorized User')
        res.status(401);
        res.send(response);
    }  
}
