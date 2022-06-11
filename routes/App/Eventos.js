const express = require('express');
const router = express.Router();

const EventoModel = require('../../models/App/Evento');

router.get('/', (req, res) => {

    EventoModel.find({}, (err, result) => {
        if (err) {
            res.status(500).json({
                message: 'Error al obtener los Eventos',
                error: err
            });
        } else {
            res.json(result);
        }
    });

});

router.get('/:id', (req, res) => {

    EventoModel.findById(req.params.id, (err, result) => {
        if (err) {
            res.status(500).json({
                message: 'Error al obtener el Evento',
                error: err
            });
        } else {
            res.json(result);
        }
    });

});

router.post('/', async (req, res) => {

    const evento = new EventoModel(req.body);

    try {
        await evento.save();
        res.json(evento);
    } catch (error) {
        console.log(error);
    }

});

router.put('/:id', (req, res) => {

    const eventoUpdate = new EventoModel(req.body);

    EventoModel.findByIdAndUpdate(req.params.id, eventoUpdate, (err, result) => {
        if (err) {
            res.status(500).json({
                message: 'Error al actualizar el Evento',
                error: err
            });
        } else {
            res.json(result);
        }
    });

});

router.delete('/:id', (req, res) => {

    EventoModel.findByIdAndRemove(req.params.id, (err, result) => {
        if (err) {
            res.status(500).json({
                message: 'Error al eliminar el Evento',
                error: err
            });
        } else {
            res.json(result);
        }
    });

});

module.exports = router;