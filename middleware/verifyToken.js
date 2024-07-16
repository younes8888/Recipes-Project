import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
            if (err) {
                return res.status(498).json({ message: 'token is not valid' });
            } else {
                req.user = data;
            next();
            }
        });
    } else {
        res.status(498).json({ message: 'token is not valid' });
    }
};

export default verifyToken;
