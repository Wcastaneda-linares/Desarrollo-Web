//Declarando un arreglo:
let miCaja = [];   // Declaración inicial de arreglo en JS

//Los arreglos pueden contener múltiples tipos de datos
let miCaja = ['hola', 1, 2, 3, true, 'hey'];

//toString() convierte un arreglo en una cadena de texto
let colores = ['verde', 'amarillo', 'azul'];
console.log(colores.toString()); // verde,amarillo,azul

//join() convierte un arreglo en una cadena de texto, pero permite especificar el separador
let colores = ['verde', 'amarillo', 'azul'];
console.log(colores.join('-')); // verde-amarillo-azul

//concat() permite concatenar un arreglo con otro
let primerosNumeros = [1, 2, 3];
let segundosNumeros = [4, 5, 6];
let combinado = primerosNumeros.concat(segundosNumeros);
console.log(combinado); // [1, 2, 3, 4, 5, 6]

//push() agrega un elemento al final del arreglo
let buscadores = ['chrome', 'firefox', 'edge'];
buscadores.push('safari', 'opera mini');
console.log(buscadores); 
// ["chrome", "firefox", "edge", "safari", "opera mini"]

//pop() elimina el último elemento del arreglo
let buscadores = ['chrome', 'firefox', 'edge'];
buscadores.pop(); // "edge"
console.log(buscadores); // ["chrome", "firefox"]

//shift() elimina el primer elemento del arreglo
let buscadores = ['chrome', 'firefox', 'edge'];
buscadores.shift(); // "chrome"
console.log(buscadores); // ["firefox", "edge"]

//unshift() agrega un elemento al inicio del arreglo
let buscadores = ['chrome', 'firefox', 'edge'];
buscadores.unshift('safari');
console.log(buscadores); //  ["safari", "chrome", "firefox", "edge"]

//splice() elimina elementos de un arreglo
let colores = ["verde", "amarillo", "azul", "púrpura"];
const menosColores = colores.splice(0, 3);
console.log(colores, menosColores); 
// ["púrpura"]
// ["verde", "amarillo", "azul"]

//slice() extrae elementos de un arreglo
let numeros = [1, 2, 3, 4]
console.log(numeros.slice(0, 3)) // regresa [1, 2, 3]
console.log(numeros) // regresa el array original

//split() convierte una cadena de texto en un arreglo
cadena.split(separador, límite)

//indexOf() busca un elemento en un arreglo
let frutas = ['manzana', 'naranja', false, 3]
frutas.indexOf('naranja'); // devuelve 1
frutas.indexOf(3); // devuelve 3
frutas.indexOf(null); // devuelve -1 (no fue encontrado)

//lastIndexOf() busca un elemento en un arreglo, pero desde el final
let frutas = ['manzana', 'naranja', false, 3, 'manzana']
frutas.lastIndexOf('manzana'); // devuelve 4

//filter() filtra los elementos de un arreglo
let resultados = arreglo.filter(function(elemento, índice, arreglo) {
  // devuelve true si el elemento pasa el filtro
});

//map() modifica los elementos de un arreglo
const usuarios = ['tina', 'danny', 'mark', 'bolaji'];
const lista = usuarios.map(elem => {
	return '<li>' + elem + '</li>';
});
const render = '<ul>' + lista.join('') + '</ul>';
document.write(render);

//reduce() reduce los elementos de un arreglo a un solo valor
let valor = arreglo.reduce(function(acumulador, valorActual, índice, arreglo) {
}, valorInicial);

//forEach() ejecuta una función por cada elemento de un arreglo
const colores = ['verde', 'amarillo', 'azul'];

colores.forEach((elemento, índice) => console.log(elemento, índice));
// devuelve el índice y todos los elementos del arreglo
// "verde" 0
// "amarillo" 1
// "azul" 2

//every() verifica si todos los elementos de un arreglo pasan una prueba
const numeros = [1, -1, 2, 3];
let todosPositivos = numeros.every((valor) => {
	return valor >= 0;
})
console.log(todosPositivos); // devolvería false

//some() verifica si al menos un elemento de un arreglo pasa una prueba
const numeros = [1, -1, 2, 3];
let alMenosUnoPositivo = numeros.every((valor) => {
	return valor >= 0;
})
console.log(alMenosUnoPositivo); // devolvería true

//includes() verifica si un arreglo contiene un elemento
let usuarios = ['paddy', 'zaddy', 'faddy', 'baddy'];
usuarios.includes('baddy'); // devuelve true

