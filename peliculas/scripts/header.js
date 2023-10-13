// Crear un encabezado (h1)
const h1 = document.createElement("h1");
h1.textContent = "Gestión de Películas";

// Crear un div
const div = document.createElement("div");
div.style.textAlign = "center";

// Crear un enlace (a)
const link = document.createElement("a");
link.href = "/";

// Crear un botón
const button = document.createElement("button");
button.id = "create";
button.className = "btn-create";
button.textContent = "Volver a Inicio";

// Agregar el botón al enlace
link.appendChild(button);

// Agregar el enlace al div
div.appendChild(link);

// Agregar el encabezado, el div y una línea horizontal (hr) al cuerpo del documento
const body = document.body;
body.appendChild(h1);
body.appendChild(div);

// Crear y agregar la línea horizontal
const hr = document.createElement("hr");
body.appendChild(hr);


