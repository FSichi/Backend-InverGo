const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({

    nombre: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    fechas: {
        inicio: {
            type: String,
            required: true
        },
        finalizacion: {
            type: String,
            required: true
        },
    },
    licencia: {
        tipo: {
            type: String,
            required: true
        },
        activa: {
            type: Boolean,
            required: true
        },
    },
    uidFirebase: {
        type: String,
        required: true
    }

});

const Usuario = mongoose.model('Usuario', UsuarioSchema, 'usuarios');
module.exports = Usuario;
