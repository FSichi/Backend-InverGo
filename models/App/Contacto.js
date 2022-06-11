const mongoose = require('mongoose');

const ContactoSchema = new mongoose.Schema({

    nombre: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    nacionalidad: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    tipoContacto: {
        type: String,
        required: true
    },
    fechaAlta: {
        type: String,
        required: true
    },
    uidFirebase: {
        type: String,
        required: true
    }

});

const Contacto = mongoose.model('Contacto', ContactoSchema, 'contactos');
module.exports = Contacto;
