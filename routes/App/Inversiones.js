const express = require('express');
const router = express.Router();

const InversionModel = require('../../models/App/Inversion');

router.get('/', (req, res) => {

    InversionModel.find({}, (err, result) => {
        if (err) {
            res.status(500).json({
                message: 'Error al obtener las Inversiones',
                error: err
            });
        } else {
            res.json(result);
        }
    });

});

router.get('/:id', (req, res) => {

    InversionModel.findById(req.params.id, (err, result) => {
        if (err) {
            res.status(500).json({
                message: 'Error al obtener la Inversion',
                error: err
            });
        } else {
            res.json(result);
        }
    });

});

router.post('/', async (req, res) => {

    const inversion = new InversionModel(req.body);

    try {
        await inversion.save();
        res.json(inversion);
    } catch (error) {
        console.log(error);
    }

});

router.put('/:id', (req, res) => {

    const inversionUpdate = new InversionModel(req.body);

    InversionModel.findByIdAndUpdate(req.params.id, inversionUpdate, (err, result) => {
        if (err) {
            res.status(500).json({
                message: 'Error al actualizar la Inversion',
                error: err
            });
        } else {
            res.json(result);
        }
    });

});

router.delete('/:id', (req, res) => {

    InversionModel.findByIdAndRemove(req.params.id, (err, result) => {
        if (err) {
            res.status(500).json({
                message: 'Error al eliminar la Inversion',
                error: err
            });
        } else {
            res.json(result);
        }
    });

});

module.exports = router;