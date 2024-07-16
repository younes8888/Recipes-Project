import express from 'express';
import userControllers from '../controllers/user.js';

const router = express.Router();

//Homepage route
router.get('/', (req, res) => {
    res.send('Welcome to the homepage')
});

//Users routes
router.get('/users', userControllers.getAllUsers);
router.get('/users/:id', userControllers.getOneUser)

// Post routes
router.post('/register', userControllers.register);
router.post('/login', userControllers.login);
router.post('/logout', userControllers.logout);

export default router;
