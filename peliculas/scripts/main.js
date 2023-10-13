
document.addEventListener('DOMContentLoaded', () => {
  const updateForm = document.getElementById('update-form');
  const peliculaIdInput = document.getElementById('peliculaId');
  const tituloInput = document.getElementById('titulo');
  const directorInput = document.getElementById('director');
  const anioLanzamientoInput = document.getElementById('anio_lanzamiento');
  const generoInput = document.getElementById('genero');
  const calificacionInput = document.getElementById('calificacion');
  const sinopsisInput = document.getElementById('sinopsis');
  const actoresPrincipalesInput = document.getElementById('actores_principales');
 
  // Obtén el ID de la película desde la URL
  const urlParts = window.location.pathname.split('/');
  const peliculaId = urlParts[urlParts.length - 2]; // Toma el último segmento de la URL
 
  // Actualiza el atributo 'action' del formulario con el ID de la película
  updateForm.action = `/peliculas/${peliculaId}/update`;
 
 
  
 
 // Realiza una solicitud al servidor para obtener los detalles de la película
 fetch(`/peliculas/${peliculaId}`)
    .then(response => response.json())
    .then(pelicula => {
      // Llena el formulario con los detalles de la película
      peliculaIdInput.value = pelicula._id;
      tituloInput.value = pelicula.titulo;
      directorInput.value = pelicula.director;
      anioLanzamientoInput.value = pelicula.anio_lanzamiento;
      generoInput.value = pelicula.genero;
      calificacionInput.value = pelicula.calificacion;
      sinopsisInput.value = pelicula.sinopsis;
 
      // Asegurarse de que actores_principales sea un arreglo antes de intentar unirlo
      if (Array.isArray(pelicula.actores_principales)) {
        actoresPrincipalesInput.value = pelicula.actores_principales.join(', ');
      }
 
      // Llena otros campos según sea necesario
    })
    .catch(error => console.error(error));
 
 
  // Resto del código para enviar el formulario y manejar la actualización...
 });
 

