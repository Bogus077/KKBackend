import { Request, Response } from 'express'
import bcrypt from 'bcrypt';
import { validateData, userSignUpRules } from '../utils/validationRules';
import { sequelize } from '../database/database.config';
import { User } from '../models/index';
import { createRefreshToken, createToken } from '../utils/token';
import { JwtPayload } from 'src/middlewares/authJwt';
import { checkPhone, isUserExists, loginUser, makeCall, signUpUser } from '../utils/user';
import { MakeCallType } from '../schema/phone';
import { CreateUserType, LoginUserType } from 'src/schema/user';

export async function makeCallRequest(req: Request, res: Response) {
  try {
    const userIP = req.headers['x-real-ip'];
    const requestData = { ...req.body, userIP } as MakeCallType['request'];
    const result = await makeCall(requestData);

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function signUpRequest(req: Request, res: Response) {
  try {
    const requestData = req.body as CreateUserType['request'];
    // Проверка кода подтверждения
    await checkPhone(requestData.phone, requestData.code);
    // Проверка номера телефона
    await isUserExists(requestData.phone);

    const createdUser = await signUpUser(requestData);
    const accessToken = createToken(createdUser);
    const refreshToken = await createRefreshToken(createdUser);

    res.status(200).send({
      userId: createdUser.id,
      tokens: {
        accessToken,
        refreshToken,
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function loginRequest(req: Request, res: Response) {
  try {
    const requestData = req.body as LoginUserType['request'];
    const user = await loginUser(requestData);
    const accessToken = createToken(user);
    const refreshToken = await createRefreshToken(user);

    res.status(200).send({
      accessToken,
      refreshToken
    });
  } catch (error) {
    res.status(500).send(error);
  }
}
