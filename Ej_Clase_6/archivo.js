async function seleccionarArchivo() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const fileInput = document.getElementById('fileInput');
            const selectedFile = fileInput.files[0];
            if (selectedFile) {
                resolve(selectedFile.name);
            } else {
                reject('No se seleccionó ningún archivo.');
            }
        }, getRandomDelay());
    });
}

function openFileInput() {
    const fileInput = document.getElementById('fileInput');
    fileInput.click(); // Abre el cuadro de diálogo de selección de archivo cuando se hace clic en el contenedor.
}

// También puedes mantener el evento de cambio para mostrar el nombre del archivo seleccionado:
const fileInput = document.getElementById('fileInput');
const selectedFilename = document.getElementById('selectedFilename');

fileInput.addEventListener('change', function() {
    if (fileInput.files.length > 0) {
        selectedFilename.textContent = 'Archivo seleccionado: ' + fileInput.files[0].name;
    } else {
        selectedFilename.textContent = '';
    }
});

async function verificarFormato(nombreArchivo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulemos que solo los archivos multimedia son admitidos (por ejemplo, mp4, jpg).
            const formatoValido = nombreArchivo.endsWith('.mp4') || nombreArchivo.endsWith('.jpg');
            if (formatoValido) {
                resolve(true);
            } else {
                reject('El formato del archivo no es válido.');
            }
        }, getRandomDelay());
    });
}

async function verificarTamaño(nombreArchivo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulemos que el tamaño máximo permitido es de 5 MB.
            const tamañoValido = getRandomSize() <= 5;
            if (tamañoValido) {
                resolve(true);
            } else {
                reject('El archivo excede el tamaño permitido.');
            }
        }, getRandomDelay());
    });
}

async function cargarArchivo(nombreArchivo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`El archivo "${nombreArchivo}" se ha cargado exitosamente.`);
        }, getRandomDelay());
    });
}

function getRandomDelay() {
    return Math.random() * 3000 + 1000; // Retardo aleatorio entre 1 y 4 segundos.
}

function getRandomSize() {
    return Math.random() * 10; // Tamaño aleatorio entre 0 y 10 MB.
}

async function startFileUpload() {
    const output = document.getElementById('output');
    output.innerHTML = '';

    try {
        const nombreArchivo = await seleccionarArchivo();
        output.innerHTML += `Archivo seleccionado: ${nombreArchivo}<br>`;

        const formatoValido = await verificarFormato(nombreArchivo);
        output.innerHTML += 'Formato válido: ' + formatoValido + '<br>';

        const tamañoValido = await verificarTamaño(nombreArchivo);
        output.innerHTML += 'Tamaño válido: ' + tamañoValido + '<br>';

        const resultadoCarga = await cargarArchivo(nombreArchivo);
        output.innerHTML += resultadoCarga;
    } catch (error) {
        output.innerHTML += `Error: ${error}`;
    }
}
