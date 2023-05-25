const {Schema,model} = require('mongoose')

MsgSchema = Schema({
    id: {
        type : String,
        require: true
    },
    msg: {
        type: String,
        require: true
    },
    user: {
        type: String,
        require: true
    }
})
MsgSchema.virtual('Mesagge',{
    ref:'Msg',
    localField: '_id',
    foreignField: 'user',
    justOne: false
})

module.exports = model('Mensaje',MsgSchema);