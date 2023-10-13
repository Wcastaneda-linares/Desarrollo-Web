  document.addEventListener("DOMContentLoaded", () => {
    // Obtén una referencia al formulario de creación
    const createForm = document.getElementById("create-form");
    createForm.addEventListener("submit", (event) => {
      event.preventDefault();
  
      const formData = new FormData(createForm);
      const nuevaPelicula = {};
      formData.forEach((value, key) => {
        nuevaPelicula[key] = value;
      });
  
      // Enviar los datos al servidor para crear una nueva película
      fetch("/peliculas/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevaPelicula),
      })
        .then((response) => {
          if (response.ok) {
            // Si la respuesta es exitosa (código 200), muestra un mensaje de éxito
            alert("Película agregada con éxito.");
            console.log("Película creada con éxito");
          } else {
            // Si hay un problema en la respuesta, muestra un mensaje de error
            alert(
              "Se produjo un error al agregar la película. Por favor, inténtalo de nuevo."
            );
            console.error("Error al crear la película");
          }
          // Actualizar la página (opcional)
          window.location.reload();
        })
        .catch((error) => {
          // Si ocurre un error en la solicitud, muestra un mensaje de error
          alert(
            "Se produjo un error al agregar la película. Por favor, inténtalo de nuevo."
          );
          console.error("Error al crear la película:", error);
        });
    });
  });