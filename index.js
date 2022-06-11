const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
require('dotenv').config();

//Crear el servidor de express
const app = express();

// CONEXION MONGO DATABASE
dbConnection();

// Lectura y Parseo del Body
app.use(express.json());
app.use(cors());

/* ---------------- RUTAS ---------------- */

const GeneralRoutes = require('./routes/General');
app.use('/general', GeneralRoutes);

/* ------ RUTAS - ADMIN ------ */

const UsuariosRoutes = require('./routes/Admin/Usuarios');
app.use('/usuarios', UsuariosRoutes);

const PeticionesRoutes = require('./routes/Admin/Peticiones');
app.use('/peticiones', PeticionesRoutes);

const RegistrosRoutes = require('./routes/Admin/Registros');
app.use('/registros', RegistrosRoutes);

/* ------ RUTAS - APP ------ */

const ContactosRoutes = require('./routes/App/Contactos');
app.use('/contactos', ContactosRoutes);

const EventosRoutes = require('./routes/App/Eventos');
app.use('/eventos', EventosRoutes);

const InversionesRoutes = require('./routes/App/Inversiones');
app.use('/inversiones', InversionesRoutes);


app.get('/', (req, res) => {
    res.send('Aplicacion Despierta');
});

// Escuchar Peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});