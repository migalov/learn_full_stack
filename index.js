import express, { json } from 'express';
import dotenv from 'dotenv';
dotenv.config({ path: `.env` });

import mongoose from 'mongoose';
import { registerValidation } from './validations/auth.js';

import checkAuth from './utils/checkAuth.js';
// import { register, login, getMe } from './controllers/UserController.js';
import * as UserController from './controllers/UserController.js';

mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log("Connect DB success"))
    .catch((err) => console.log('DB error', err));

const app = express();

app.use(json());

app.post('/auth/login', UserController.login);
app.post('/auth/register', registerValidation, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);