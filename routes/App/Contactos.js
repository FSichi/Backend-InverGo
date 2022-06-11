const express = require('express');
const router = express.Router();

const ContactoModel = require('../../models/App/Contacto');

router.get('/', (req, res) => {

    ContactoModel.find({}, (err, result) => {
        if (err) {
            res.status(500).json({
                message: 'Error al obtener los Contactos',
                error: err
            });
        } else {
            res.json(result);
        }
    });

});

router.get('/:id', (req, res) => {

    ContactoModel.findById(req.params.id, (err, result) => {
        if (err) {
            res.status(500).json({
                message: 'Error al obtener el Contacto',
                error: err
            });
        } else {
            res.json(result);
        }
    });

});

router.post('/', async (req, res) => {

    const contacto = new ContactoModel(req.body);

    try {
        await contacto.save();
        res.json(contacto);
    } catch (error) {
        console.log(error);
    }

});

router.put('/:id', (req, res) => {

    const contactoUpdate = new ContactoModel(req.body);

    ContactoModel.findByIdAndUpdate(req.params.id, contactoUpdate, (err, result) => {
        if (err) {
            res.status(500).json({
                message: 'Error al actualizar el Contacto',
                error: err
            });
        } else {
            res.json(result);
        }
    });

});

router.delete('/:id', (req, res) => {

    ContactoModel.findByIdAndRemove(req.params.id, (err, result) => {
        if (err) {
            res.status(500).json({
                message: 'Error al eliminar el Contacto',
                error: err
            });
        } else {
            res.json(result);
        }
    });

});

module.exports = router;