const mongoose = require('mongoose');

const PeticionSchema = new mongoose.Schema({

    nombre: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    tipoLicencia: {
        type: String,
        required: true
    },
    fechas: {
        newFechaFin: {
            type: String,
            required: true
        },
        accion: {
            type: String,
            required: true
        }
    },
    estado: {
        type: Boolean,
        required: true
    },

});

const Peticion = mongoose.model('Peticion', PeticionSchema, 'peticiones');
module.exports = Peticion;
