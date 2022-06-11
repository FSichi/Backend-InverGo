const mongoose = require('mongoose');

const RegistroSchema = new mongoose.Schema({

    estado: {
        type: Boolean,
        required: true
    },
    cantidadLicencias: {
        anuales: {
            type: String,
            required: true
        },
        vitalicias: {
            type: String,
            required: true
        }
    },
    registro: {
        dineroTotal: {
            type: String,
            required: true
        },
        fechaPago: {
            type: String,
            required: true
        }
    }

});

const Registro = mongoose.model('Registro', RegistroSchema, 'registros');
module.exports = Registro;
