
import express from 'express';
import signup from '../controller/auth.controllers.js';
import login from '../controller/user.controllers.js';
const router = express.Router();

router.post('/signup', signup);
router.post('/login',login)
export default  router;