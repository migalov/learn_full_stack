import { body } from 'express-validator';

export const registerValidation = [
    body('email', 'Неправильная почта').isEmail(),
    body('password', 'Короткий пароль').isLength({ min: 5 }),
    body('fullName', 'Короткое имя').isLength({ min: 3 }),
    body('avatarUrl', 'Неправильная ссылка на аватар').optional().isURL()
]