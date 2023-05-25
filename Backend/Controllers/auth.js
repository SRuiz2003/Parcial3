const express = require('express')
const Usuario = require('../models/Usuario')
const crearUsuario = async (req,res = express.response) => {
    const {name,email,password} = req.body
    
    try{
        let usuario = await Usuario.findOne({email:email})
        if(usuario){
            return res.status(400).json({
                ok: false,
                msg: 'El usuario con este correo ya existe',
            })
        }

        return res.status(200).json({
            ok:true,
            usuario
        })
    }catch(error){
        console.log(error);
        res.status(400).json({
            ok:false,
            error,
        })
    }

}

const loginUsuario= async (req,res = express.response) => {
    const {email,password} = req.body
    
    let usuario = await Usuario.findOne({email:email ,password:password})
    return res.json({
        ok:true,
        usuario
    })
}



module.exports = {
    loginUsuario,
    crearUsuario
}