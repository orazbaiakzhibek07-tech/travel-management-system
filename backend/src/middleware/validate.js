const { body, validationResult } = require('express-validator');

const checkValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false, 
      errors: errors.array().map(e => ({ field: e.path, message: e.msg }))
    });
  }
  next();
};

const validateRegister = [
  body('name')
    .trim()
    .notEmpty().withMessage('Аты міндетті')
    .isLength({ min: 2 }).withMessage('Аты 2 символдан кем болмасын'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email міндетті')
    .isEmail().withMessage('Email форматы дұрыс емес'),
  body('password')
    .isLength({ min: 6 }).withMessage('Құпия сөз 6 символдан кем болмасын'),
  checkValidation
];

const validateTrip = [
  body('title')
    .trim()
    .notEmpty().withMessage('Сапар атауы міндетті'),
  body('price')
    .notEmpty().withMessage('Баға міндетті')
    .isNumeric().withMessage('Баға сан болуы керек'),
  body('country')
    .trim()
    .notEmpty().withMessage('Ел атауы міндетті'),
  body('city')
    .trim()
    .notEmpty().withMessage('Қала атауы міндетті'),
  checkValidation
];

module.exports = { validateRegister, validateTrip };