const express = require('express')
const router = express.Router();
const {check} = require('express-validator')
const{crearUsuario, loginUsuario } = require('../Controllers/auth')
const {validarCampos} = require('../middlewares/validar-campos')

router.post('/',loginUsuario)

router.post(
    '/new',
    [
        check('name','El nombre es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
        check('password',).isLength({min: 6}),
        validarCampos
    ],

crearUsuario)


module.exports = router;