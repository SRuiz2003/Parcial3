const express = require('express')
const msg = require('../models/Msg')
const enviarMensaje = async(req,res = express.response) =>{
    const{message,emisor} = req.body

    if(message!=""){

        return res.status(200).json({
            ok:true,
            message,
            emisor
        })
    }else{

        return res.status(400).json({
            ok:false,
            msg: 'El mensaje no puede estar vacio!'
        })
    }
    
}

module.exports = {enviarMensaje};