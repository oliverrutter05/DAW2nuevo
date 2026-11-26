const cantidad = document.getElementById("cantidad");
const comprobar = document.getElementById("comprobar");
const error = document.getElementById("error");

comprobar.addEventListener("submit", () => {

    let numero = cantidad.valueAsNumber;

    if(numero <= 6 && numero >= 1) {
        cantidad.textContent = numero;
    }
    else {
        error.textContent = "Cantidad no válida";
    }

})