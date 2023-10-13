//@ts-check

let add = document.getElementById("add");
let subtract = document.getElementById("substract");
let output = document.getElementById("output");

add.addEventListener("click", function () {
    let resultado = parseInt(output.innerText) + 1;
    output.innerText = resultado.toString();

    if (resultado > 10) {
        output.innerText = "0";
        alert("Ya llegaste al 10");
    }
});

subtract.addEventListener("click", function () {
    let resultado = parseInt(output.innerText) - 1;
    output.innerText = resultado.toString();

    if (resultado < 0) {
        output.innerText = "10";
        alert("Ya llegaste al 0");
    }
});
