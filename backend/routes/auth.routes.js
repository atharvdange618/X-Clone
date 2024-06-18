import express from 'express';
const router = express.Router();
import { signup, logout, login, getMe } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

router.get("/me", protectRoute, getMe)
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

export default router;
