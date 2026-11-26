const reserva = document.getElementById("reserva");

const nombre = document.getElementById("nombre");
const ciudad = document.getElementById("ciudad");

const errNombre = document.getElementById("errNombre");
const errCiudad = document.getElementById("errCiudad");

const aviso = document.getElementById("aviso");

reserva.addEventListener("submit", (event) => {

    event.preventDefault();

    let nombreValor = nombre.value.trim();
    let ciudadValor = ciudad.value.trim();

    let correcto = true;

    if(nombreValor.length < 3) {
        errNombre.textContent = "El nombre debe de tener más de 3 caracteres";
        correcto = false;
    }
    else {
        errNombre.textContent = "";
    }

    if(ciudadValor === "") {
        errCiudad.textContent = "'Ciudad' no puede estar vacío";
        correcto = false;
    }
    else {
        errCiudad.textContent = "";
    }

    if(correcto) {
        aviso.textContent = "Reserva realizada";
    }
    else {
        aviso.textContent = "";
    }
})