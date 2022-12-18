const express = require('express');
export const router = express.Router();
import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();
import { verifyJWT, isAdmin, isOfficer } from '../middlewares';

import { 
  signUpRequest, 
  signInRequest, 

} from "../controllers/user.controller";

router.use([jsonParser]);

router.post('/signUp', signUpRequest);
router.post('/signIn', signInRequest);
