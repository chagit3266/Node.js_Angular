import jwt from 'jsonwebtoken';

export const checkAuth = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization || !authorization.startsWith('Bearer ')) {
            return next({ status: 401, message: 'Missing or invalid authorization header.' });
        }
        const [, token] = authorization.split(' ');
        const secret = process.env.JWT_SECRET || "JWT_SECRET";
        const verified = jwt.verify(token, secret);//חילוץ מהטוקן
        req.currentUser = verified;
        
    } catch (error) {
        next({ status: 401, message: 'Invalid token.' })
    }
}

export const checkAdmi = (req, res, next) => {

}