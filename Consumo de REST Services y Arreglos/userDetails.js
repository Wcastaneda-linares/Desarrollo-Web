//Función asíncrona que recibe un parámetro de entrada, el id del usuario a buscar
async function fetchUserDetails(userId) {
    //Se hace la petición a la API con el id del usuario
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const userData = await response.json();
    return userData;
}
//Array con los id de los usuarios a buscar
const userIDsToFetch = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

//obtenemos el div donde se mostrarán los detalles de los usuarios
const userDetailsDiv = document.getElementById('userDetails');
userDetailsDiv.innerHTML = '<h2>Detalles de los usuarios</h2>';

//Para cada id de usuario se hace la petición a la API
userIDsToFetch.forEach(userId => {
    fetchUserDetails(userId)
        .then(userData => {
            userDetailsDiv.innerHTML += `
                <div class="user">
                <p><strong>Id de usuario:</strong> ${userData.id}</p>
                <p><strong>Nombre:</strong> ${userData.name}</p>
                <p><strong>Usuario:</strong> ${userData.username}</p>
                <p><strong>Correo electrónico:</strong> ${userData.email}</p>
                <p><strong>Teléfono:</strong> ${userData.phone}</p>
                <p><strong>Sitio Web:</strong> ${userData.website}</p>
                <br><br>
                </div>
            `;
        })
        //Si hay algún error se muestra en el div
        .catch(error => {
            console.error('Error:', error);
            userDetailsDiv.innerHTML += `<p>Error al recuperar los detalles del usuario para ID ${userId}.</p>`;
        });
});
