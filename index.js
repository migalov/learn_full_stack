import express, { json } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import mongoose from 'mongoose';
import { validationResult } from 'express-validator';
import { registerValidation } from './validations/auth.js';

import UserModel from './models/User.js'

mongoose.connect(`mongodb+srv://admin:qqqqqq@cluster0.x2zrya7.mongodb.net/blog?retryWrites=true&w=majority`)
    .then(() => console.log("Connect DB success"))
    .catch((err) => console.log('DB error', err));

const app = express();

app.use(json());

app.post('/auth/register', registerValidation, async (req, res) => {
    try {
        const   errors = validationResult(req),
            password = req.body.password,
            salt = await bcrypt.genSalt(10),
            hash = await bcrypt.hash(password, salt)

        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }
        

        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash
        })

        const user = await doc.save();

        const token = jwt.sign(
            {
                _id: user._id,
            },
            'secret', 
            {
                expiresIn: '30d',
            }
        );

        const { passwordHash, ...userData } = user._doc;

        res.json({
            ...userData,
            token
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось зарегистрироваться!"
        })
    }
    
})

app.listen(4444, (err) => {
    
    if (err) {
        return console.log(err);
    }

    console.log('Server OK!');
})