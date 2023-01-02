const express = require('express');
export const router = express.Router();
import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();
import { verifyJWT } from '../middlewares';

import {
  signUpRequest,
  loginRequest,
  makeCallRequest,

} from "../controllers/user.controller";

router.use([jsonParser]);

router.put('/signUp', signUpRequest);
router.post('/login', loginRequest);
router.post('/makeCall', makeCallRequest);
