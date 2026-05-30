const router = require('express').Router();
const auth = require('../middleware/auth');
const { validateRegister } = require('../middleware/validate');
const { register, login, getMe } = require('../controllers/authController');

router.post('/register', validateRegister, register);
router.post('/login', login);
router.get('/me', auth, getMe);

module.exports = router;