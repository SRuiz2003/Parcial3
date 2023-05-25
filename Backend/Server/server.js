const express = require('express');
require('dotenv').config();
const {dbConnection} = require('../database/config');
const cors = require('cors');

class Server {
    constructor(){
        this.headers = {
            cors:{
                origin:'http://127.0.0.1:5173',
                methods: ["GET","POST"]
            }
        }

        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app)
        this.io = require('socket.io')(this.server, this.headers)

        this.paths = {
            auth: '/api/auth',
            chat: '/api/chat'
        }
        this.connectToDB();
        this.addMidlewares();
        this.setRoutes();
        this.sockets();

    }
    
    async connectToDB(){
        await dbConnection;
    }

    addMidlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'))

    }

    setRoutes(){
        this.app.use(this.paths.auth , require('../Routes/auth'))
        this.app.use(this.paths.task, require('../Routes/chat'))

    }

    sockets(){
        this.io.on('connection', socket => {
            console.log('Cliente Conectado', socket.id);
            socket.on('disconect', () => {
                console.log('Cliente desconectado');
            })
        })
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', process.env.PORT)
        })
    }

}

module.exports = Server;
