const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const path = require('path');
const Pelicula = require('./models/pelicula');

mongoose.connect('mongodb://localhost/peliculas', { useNewUrlParser: true, useUnifiedTopology: true });
 // Asegúrate de que la ruta sea correcta

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const peliculasRouter = require('./routes/peliculas');
const pelicula = require('./routes/peliculas');
app.use('/peliculas', pelicula);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.use(express.static(path.join(__dirname, 'views')));

app.get('/peliculas/:id/update', (req, res) => {
  res.sendFile(__dirname + '/views/update.html');
});

app.get('/peliculas/:id/delete', async (req, res) => {
  try {
    const pelicula = await Pelicula.findByIdAndRemove(req.params.id);

    if (!pelicula) {
      return res.status(404).send('Película no encontrada');
    }

    res.status(204).json({ message: 'Película eliminada con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la película' });
  }
});






app.get('/peliculas/create', (req, res) => {
  res.sendFile(__dirname + '/views/create.html');
});

// Ruta para crear una nueva película
app.post('/peliculas/create', async (req, res) => {
  try {
    const { titulo, director, anio_lanzamiento, genero, calificacion, sinopsis, actores_principales } = req.body;
    
    // Crea una nueva película con los datos proporcionados
    const nuevaPelicula = new Pelicula({
      titulo,
      director,
      anio_lanzamiento,
      genero,
      calificacion,
      sinopsis,
      actores_principales: actores_principales.split(',').map(actor => actor.trim()), // Divide los actores por comas y elimina espacios
    });

    // Guarda la película en la base de datos
    await nuevaPelicula.save();
    
    // Responde con un mensaje de éxito o el objeto JSON de la película creada
    res.status(201).json(nuevaPelicula);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al crear una película: ' + error.message);
  }
});


app.get('/peliculas/:id', async (req, res) => {
  try {
    const pelicula = await Pelicula.findById(req.params.id);

    if (!pelicula) {
      return res.status(404).json({ error: 'Película no encontrada' });
    }

    res.json(pelicula);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Error al buscar la película: ' + error.message });
  }
});


app.post('/peliculas/:id/update', async (req, res) => {
  try {
    const pelicula = await Pelicula.findById(req.params.id);

    if (!pelicula) {
      return res.status(404).json({ error: 'Película no encontrada' });
    }

    // Actualiza los campos de la película con los datos del formulario
    pelicula.titulo = req.body.titulo;
    pelicula.director = req.body.director;
    pelicula.anio_lanzamiento = req.body.anio_lanzamiento;
    pelicula.genero = req.body.genero;
    pelicula.calificacion = req.body.calificacion;
    pelicula.sinopsis = req.body.sinopsis;
    pelicula.actores_principales = req.body.actores_principales.split(',').map(actor => actor.trim());

    // Guarda los cambios en la base de datos
    await pelicula.save();

    // Redirige a la página de inicio u otra página de confirmación
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la película', message: error.message });
  }
});




// Configura Express para servir archivos estáticos desde la carpeta "scripts"
app.use('/scripts', express.static(path.join(__dirname, 'scripts')));



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
