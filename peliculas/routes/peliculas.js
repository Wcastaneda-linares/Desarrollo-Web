const express = require('express');
const router = express.Router();
const Pelicula = require('../models/pelicula');

// Ruta para obtener todas las películas
router.get('/', async (req, res) => {
  try {
    const peliculas = await Pelicula.find();
    res.json(peliculas);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener las películas');
  }
});

router.get('/peliculas/:id', async (req, res) => {
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


// Ruta para crear una nueva película
router.post('/create', async (req, res) => {
  const { titulo, director, anio_lanzamiento, genero, calificacion, sinopsis, actores_principales } = req.body;
  
  try {
    const nuevaPelicula = new Pelicula({
      titulo,
      director,
      anio_lanzamiento,
      genero,
      calificacion,
      sinopsis,
      actores_principales
    });

    await nuevaPelicula.save();
    res.status(201).json(nuevaPelicula);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al crear una película');
  }
});



router.get('/peliculas/:id/update', async (req, res) => {
  try {
    const pelicula = await Pelicula.findById(req.params.id);


    if (!pelicula) {
      return res.status(404).send('Película no encontrada');
    }

    res.render('/peliculas/update', { pelicula });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error al buscar la película', error.message);
  }
});

router.post('/peliculas/:id/update', async (req, res) => {
  try {
    const pelicula = await Pelicula.findById(req.params.id);

    if (!pelicula) {
      return res.status(404).send('Película no encontrada',);
    }

    // Actualiza los campos de la película con los datos del formulario
    pelicula.titulo = req.body.titulo;
    // Actualiza otros campos de la película según sea necesario

    // Guarda los cambios en la base de datos
    await pelicula.save();

    // Redirige a la página de inicio u otra página de confirmación
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al actualizar la película', error.message);
  }
});

// Ruta para crear una nueva película
router.post('/peliculas/create', async (req, res) => {
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
    res.status(500).send('Error al crear una película');
  }
});


router.get('/peliculas/:id/delete', async (req, res) => {
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



module.exports = router;
