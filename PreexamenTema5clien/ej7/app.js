const cantidad = document.getElementById("cantidad");
const socio = document.getElementById("socio");
const comprobar = document.getElementById("comprobar");
const error = document.getElementById("error");

comprobar.addEventListener("click", () => {

    let numero = cantidad.valueAsNumber();
    let maximo;

    if(socio.checked) {
        maximo = 6;
    }
    else {
        maximo = 3;
    }

    if(cantidad.value === "" |
        !Number.isInteger(numero) |
        numero < 1 |
        numero > maximo
    ){
        error.textContent = "Cantidad no válida.";
    }
    else {
        error.textContent = "";
    }

})