const express = require('express');
const router = express.Router();

const PeticionModel = require('../../models/Admin/Peticion');
const UsuarioModel = require('../../models/Admin/Usuario');

/* Me retorna todas las Peticiones */
router.get('/', (req, res) => {

    PeticionModel.find({}, (err, result) => {
        (err)
            ? res.status(500).json({ message: 'Error al obtener las Peticiones', error: err })
            : res.json(result);
    });

});

/* Me retorna la Peticion segun su Id*/
router.get('/:id', async (req, res) => {

    const peticion = await PeticionModel.findById(req.params.id);
    const usuario = await UsuarioModel.findOne({ "correo": peticion.correo });

    const resp = [peticion, usuario._id];

    res.json(resp);

});

/* Me retorna Peticiones Activas y Completadas */
router.get('/table/all', async (req, res) => {

    const peticiones = await PeticionModel.find({});

    const peticionesActivas = peticiones.filter(peticion => peticion.estado === false);
    const peticionesCompletadas = peticiones.filter(peticion => peticion.estado === true);

    const returnObject = [peticionesActivas, peticionesCompletadas];

    res.json(returnObject);

});


/* Crea una Peticion segun la informacion que le envio. */
router.post('/', async (req, res) => {

    const peticion = new PeticionModel(req.body);

    try {
        await peticion.save();
        res.send('Peticion Guardada');
    } catch (error) {
        console.log(error);
    }

});

/* Actualiza una Peticion segun la informacion que le envio. */
router.put('/:id', (req, res) => {

    const peticionUpdate = new PeticionModel(req.body);

    PeticionModel.findByIdAndUpdate(req.params.id, peticionUpdate, (err, result) => {
        (err)
            ? res.status(500).json({ message: 'Error al actualizar la Peticion', error: err })
            : res.json(result)
    });

});

router.delete('/:id', (req, res) => {

    PeticionModel.findByIdAndRemove(req.params.id, (err, result) => {
        (err)
            ? res.status(500).json({ message: 'Error al eliminar la Peticion', error: err })
            : res.status(200).json({ message: 'Peticion eliminada' });
    });

});

module.exports = router;