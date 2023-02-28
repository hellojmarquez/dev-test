import express from 'express';
import { Router } from 'express';
import {
	getuserData,
	loginUser,
	modifyUserData,
} from '../controllers/api.controllers.js';
import { verifiedUser } from '../middleware/verifiedUser.js';
const ROUTER = Router();

ROUTER.post('/user', verifiedUser, getuserData);
ROUTER.post('/', loginUser);
ROUTER.put('/', verifiedUser, modifyUserData);

export default ROUTER;
