const cantidad = document.getElementById("cantidad");
const socio = document.getElementById("socio");
const comprobar = document.getElementById("comprobar");
const error = document.getElementById("error");

comprobar.addEventListener("submit", () => {

    let numero = cantidad.valueUsNumber();
    let maximo; 

    if(socio.checked) {
        maximo = 6;
    }
    else {
        maximo = 3;
    }

    if(cantidad.value === "" |
        numero > 1 |
        numero < maximo |
        !Number.isInteger(numero)) {

            error.textContent = "Cantidad no posible";
        }
        else {
            error.textContent = "";
        }
})