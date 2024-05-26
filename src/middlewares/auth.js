import jwt from 'jsonwebtoken';

export const auth = (req,res, next) =>{
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({error: 'Unauthorized'});
    } 

    const token = authHeader.split('')[1];

    if(!token){
        return res.status(401).json({error:'Unauthorized'});
    }

    jwt.verify(token, config.secret, (err, user) => {
        if(err){
            return res.status(403).json({error:'Forbidden'});
        }
        req.user = user;

        next();
    })
};