import express from 'express';
import { createUser, getUser, getUsers } from '../controllers/users.controller';

const router = express.Router();

router.get('/:user', getUser);
router.get('/users', getUsers);
router.post('/users', createUser);

export default router;