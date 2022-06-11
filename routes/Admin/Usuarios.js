const express = require('express');
const router = express.Router();

const UsuarioModel = require('../../models/Admin/Usuario');

/* Me retorna todos los Usuarios */
router.get('/', (req, res) => {

    UsuarioModel.find({}, (err, result) => {
        (err)
            ? res.status(500).json({ message: 'Error al obtener los Usuarios', error: err })
            : res.json(result);
    });

});

/* Me retorna el usuario segun su Id*/
router.get('/:id', (req, res) => {

    UsuarioModel.findById(req.params.id, (err, result) => {
        (err)
            ? res.status(500).json({ message: 'Error al obtener el Usuario', error: err })
            : res.json(result);
    });

});

/* Crea un Usuario segun la informacion que le envio. */
router.post('/', async (req, res) => {

    const usuario = new UsuarioModel(req.body);

    try {
        await usuario.save();
        res.send('Usuario Guardado');
    } catch (error) {
        console.log(error);
    }

});

/* Actualiza un Usuario segun la informacion que le envio. */
router.put('/:id', (req, res) => {

    const usuarioUpdate = new UsuarioModel(req.body);

    UsuarioModel.findByIdAndUpdate(req.params.id, usuarioUpdate, (err, result) => {
        (err)
            ? res.status(500).json({ message: 'Error al actualizar el Usuario', error: err })
            : res.json(result);
    });

});

/* Elimina un Usuario segun su ID */
router.delete('/:id', (req, res) => {

    UsuarioModel.findByIdAndRemove(req.params.id, (err, result) => {
        (err)
            ? res.status(500).json({ message: 'Error al eliminar el Usuario', error: err })
            : res.status(200).json({ message: 'Usuario Eliminado' });
    });

});


/* ---------- DASHBOARD ---------- */

/* Me retorna todos los Usuarios ademas separando cada uno por su licencia*/
router.get('/dash/all', async (req, res) => {

    const usuarios = await UsuarioModel.find({});
    var usuariosPA = usuarios.filter(usuario => usuario.licencia.tipo === 'PA');
    var usuariosPV = usuarios.filter(usuario => usuario.licencia.tipo === 'PV');

    const resp = [usuarios.length, usuariosPA.length, usuariosPV.length];
    res.json(resp);
});

/* Me retorna la distribucion de Dinero de las licencias */
router.get('/dash/money', async (req, res) => {

    const usuarios = await UsuarioModel.find({});
    var usuariosPA = usuarios.filter(usuario => usuario.licencia.tipo === 'PA');
    var usuariosPV = usuarios.filter(usuario => usuario.licencia.tipo === 'PV');

    var totalAnual = (usuariosPA.length * 150);
    var totalVitalicio = (usuariosPV.length * 450);
    var totalGnral = (usuariosPA.length * 150) + (usuariosPV.length * 450);

    var totalF = (totalGnral * 0.8);
    var totalM = (totalGnral * 0.2);

    const resp = [
        new Intl.NumberFormat("de-DE").format(totalAnual),
        new Intl.NumberFormat("de-DE").format(totalVitalicio),
        new Intl.NumberFormat("de-DE").format(totalGnral),
        new Intl.NumberFormat("de-DE").format(totalF),
        new Intl.NumberFormat("de-DE").format(totalM),
    ];

    res.json(resp);
});


module.exports = router;