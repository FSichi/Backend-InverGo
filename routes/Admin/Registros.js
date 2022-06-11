const express = require('express');
const router = express.Router();

const RegistroModel = require('../../models/Admin/Registro');


/* Me retorna todos los Registros */
router.get('/', (req, res) => {

    RegistroModel.find({}, (err, result) => {
        (err)
            ? res.status(500).json({ message: 'Error al obtener los Registros', error: err })
            : res.json(result);
    });

});

/* Me retorna el Registro segun su estado*/
router.get('/estado/activo', async (req, res) => {
    const registro = await RegistroModel.findOne({ "estado": true });
    res.json(registro);
});

/* Crea un Registro segun la informacion que le envio. */
router.post('/', async (req, res) => {

    const registro = new RegistroModel(req.body);

    try {
        await registro.save();
        res.send('Registro Guardado');
    } catch (error) {
        console.log(error);
    }

});

/* Actualiza un Registro segun la informacion que le envio. */
router.put('/:id', (req, res) => {

    const registroUpdate = new RegistroModel(req.body);

    RegistroModel.findByIdAndUpdate(req.params.id, registroUpdate, (err, result) => {
        (err)
            ? res.status(500).json({ message: 'Error al actualizar el Registro', error: err })
            : res.json(result);
    });

});

router.delete('/:id', (req, res) => {

    RegistroModel.findByIdAndRemove(req.params.id, (err, result) => {
        (err)
            ? res.status(500).json({ message: 'Error al eliminar el Registro', error: err })
            : res.status(200).json({ message: 'Registro Eliminado' });
    });

});

/* ------------------ PARA EL DASH ------------------*/

/* Me retorna la distribucion de Dinero deL Registro Activo */
router.get('/dash/all', async (req, res) => {

    const registros = await RegistroModel.find({});
    const registroActual = registros.find(reg => reg.estado === true);

    var totalAnual = (parseInt(registroActual.cantidadLicencias.anuales) * 150);
    var totalVitalicio = (parseInt(registroActual.cantidadLicencias.vitalicias) * 450);
    var totalGnral = (parseInt(registroActual.cantidadLicencias.anuales) * 150) + (parseInt(registroActual.cantidadLicencias.vitalicias) * 450);

    const totalF = (totalGnral * 0.8);
    const totalM = (totalGnral * 0.2);

    const resp = [
        registroActual,
        new Intl.NumberFormat("de-DE").format(totalAnual),
        new Intl.NumberFormat("de-DE").format(totalVitalicio),
        new Intl.NumberFormat("de-DE").format(totalGnral),
        new Intl.NumberFormat("de-DE").format(totalF),
        new Intl.NumberFormat("de-DE").format(totalM),
    ];

    res.json(resp);

});


module.exports = router;