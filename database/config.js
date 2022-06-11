const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.DB_CNN_MDB);
        console.log('DB Mongoose Conectada con Exito');
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de inicializar la base de datos')
    }
}

module.exports = {
    dbConnection
}