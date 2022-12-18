'use strict';

import express, { Application, Request, Response } from 'express'
import { router as UserRouter } from "./routes/user.router";
import { router as AuthRouter } from './routes/auth.router';
import { serverConfig } from './config/config';
import cors from 'cors';
import { onConnection } from './utils/socket/connection';
const app = express();
import http from 'http';
const server = http.createServer(app);
import { Server, Socket } from "socket.io";
import { verifyJwtSocket, verifyOfficerRole } from './utils/socket/authHandler';
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

// app.use(tokenValidation);
app.use(cors());
app.use('/user', UserRouter);
app.use('/auth', AuthRouter);
app.get('/', (request, response) => {
  response.send('Hello, Hackerman!');
});

// обрабатываем подключение веб-сокета
io.use((socket, next) => verifyJwtSocket(socket, next));
io.use((socket, next) => verifyOfficerRole(socket, next));
io.on('connection', (socket: Socket) => onConnection(io, socket))

server.listen(serverConfig);

console.log(`App started on ${serverConfig.port}`);
