import jwt from 'jsonwebtoken';

export const checkAuth = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization || !authorization.startsWith('Bearer ')) {
            return next({ status: 401, message: 'Missing or invalid authorization header.' });
        }
        const [, token] = authorization.split(' ');

        
    } catch (error) {

    }
}