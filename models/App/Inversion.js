const mongoose = require('mongoose');

const InversionSchema = new mongoose.Schema({

    tipo: {
        type: String,
        required: true
    },
    estado: {
        type: Boolean,
        required: true
    },
    capitales: {
        capital: {
            type: String,
            required: true
        },
        capitalFinal: {
            type: String,
            required: true
        },
    },
    fechas: {
        inicio: {
            type: String,
            required: true
        },
        fin: {
            type: String,
            required: true
        },
        fechaAlta: {
            type: String,
            required: true
        },
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

const Inversion = mongoose.model('Inversion', InversionSchema, 'inversiones');
module.exports = Inversion;