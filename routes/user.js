import express from 'express';
import userControllers from '../controllers/user.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to the homepage')
});
// routes
router.post('/register', userControllers.register);
router.post('/login', userControllers.login);
router.post('/logout', userControllers.logout);

export default router;
