const reserva = document.getElementById("reserva");

const nombre = document.getElementById("nombre");
const ciudad = document.getElementById("ciudad");

const errNombre = document.getElementById("errNombre");
const errCiudad = document.getElementById("errCiudad");

const aviso = document.getElementById("aviso");

reserva.addEventListener("submit", function(event) {

    event.preventDefault();

    let nombreValor = nombre.value.trim();
    let ciudadValor = ciudad.value.trim();

    let correcto = true;

    if (nombreValor.length < 3) {

        errNombre.textContent = "El nombre debe de tener al menos 3 caracteres";
        correcto = false;
    }
    else {
        errNombre.textContent = "";
    }

    if (correcto) {
        aviso.textContent = "Reserva completada";
    }
    else {
        aviso.textContent = "";
    }

})

