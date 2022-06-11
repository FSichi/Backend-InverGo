const express = require('express');
const router = express.Router();

const ContactoModel = require('../models/App/Contacto');
const EventoModel = require('../models/App/Evento');
const InversionModel = require('../models/App/Inversion');
const UsuarioModel = require('../models/Admin/Usuario');

const getDataset = async (uidF) => {

    var dataset = {
        fichaUser: {},
        contactos: [],
        eventos: [],
        inversiones: [],
    };

    try {
        dataset.fichaUser = await UsuarioModel.findOne({ "uidFirebase": uidF });
        dataset.contactos = await ContactoModel.find({ "uidFirebase": uidF });
        dataset.eventos = await EventoModel.find({ "uid.firebase": uidF });
        dataset.inversiones = await InversionModel.find({ "uid.firebase": uidF });

        return dataset;
    } catch (e) {
        throw e;
    }
}

router.get('/getDataset/:uid', (req, res) => {
    getDataset(req.params.uid)
        .then(dataset => res.json(dataset))
        .catch(err => res.json(err));
});

module.exports = router;