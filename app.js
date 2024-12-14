const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pool = require('./db'); //importa la conexion a la base de datos
const routes = require('./routes');

const app = express();
const PORT = 3000;

//Middleware
app.use(bodyParser.json()); //Para procesar JSON
app.use(cors()); // Habilita CORS para todas las rutas
app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.use('/api', routes); //montar ruta en /apis
app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});
