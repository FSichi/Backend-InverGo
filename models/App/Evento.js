const mongoose = require('mongoose');

const EventoSchema = new mongoose.Schema({

    fecha: {
        type: String,
        required: true
    },
    hora: {
        type: String,
        required: true
    },
    lugar: {
        type: String,
        required: true
    },
    persona: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    uid: {
        firebase: {
            type: String,
            required: true
        },
        enlace: {
            type: String,
            required: true
        }
    }

});

const Evento = mongoose.model('Evento', EventoSchema, 'eventos');
module.exports = Evento;