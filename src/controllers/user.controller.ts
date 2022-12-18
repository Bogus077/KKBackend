import { Request, Response } from 'express'
import bcrypt from 'bcrypt';
import { validateData, userSignUpRules } from '../utils/validationRules';
import {sequelize} from '../database/database.config';
import { User } from '../models/index';
import { signUpNewUser, UserlogIn } from '../utils/user';
import { createRefreshToken, createToken } from '../utils/token';
import { JwtPayload } from 'src/middlewares/authJwt';

export async function signUpRequest(req: Request, res: Response) {
  try{
    const createdUser = await signUpNewUser(req.body);
    const result = {
      id: createdUser.id,
      name: createdUser.name,
      surname: createdUser.surname,
      phone: createdUser.phone,
      accessToken: createToken(createdUser),
      refreshToken: await createRefreshToken(createdUser),
    }

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}

export async function signInRequest(req: Request, res: Response) {
  try{
    const requestData = req.body;
    const result = await UserlogIn(requestData);

    res.status(200).send(result);
  }catch(error){
    res.status(500).send(error);
  }
}
