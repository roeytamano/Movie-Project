import express from 'express';
import { createUser, getUser, getUsers, loginUser } from '../controllers/users.controller';

const router = express.Router();

router.get('/:user', getUser);
router.get('/users', getUsers);
router.post('/users', createUser);
router.post('/users/login', loginUser);

export default router;