import express, { json } from 'express';
import jwt from 'jsonwebtoken';

import mongoose from 'mongoose';
import { validationResult } from 'express-validator';
import { registerValidation } from './validations/auth.js';

mongoose.connect(`mongodb+srv://dremor93:Ltwu3bszWXE4zjWD@cluster0.x2zrya7.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => console.log("Connect DB success"))
    .catch((err) => console.log('DB error', err))

const app = express();

app.use(json());

app.post('/auth/register', registerValidation, function (req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty) {
        return res.status(400).json(errors.array());
    }

    res.json({
        success: true
    })
    
})

app.listen(4444, (err) => {
    
    if (err) {
        return console.log(err);
    }

    console.log('Server OK!');
})