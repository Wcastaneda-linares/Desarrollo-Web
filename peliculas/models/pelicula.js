const mongoose = require('mongoose');

const peliculaSchema = new mongoose.Schema({
 // _id: mongoose.Schema.Types.ObjectId,
  titulo: String,
  director: String,
  anio_lanzamiento: Number,
  genero: String,
  calificacion: Number,
  sinopsis: String,
  actores_principales: [String]
}, { collection: 'pelis' });

module.exports = mongoose.model('Pelicula', peliculaSchema);
