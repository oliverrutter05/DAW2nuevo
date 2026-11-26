const reserva = document.getElementById("reserva");
const nombre = document.getElementById("nombre");
const aviso = document.getElementById("aviso");

reserva.addEventListener("submit", (event) => {

    event.preventDefault();

    let nombreValor = nombre.value.trim();

    if(nombreValor.length < 3) {
        aviso.textContent = "Nombre demasiado corto";
    }
    else {
        aviso.textContent = "Reserva de " + nombreValor;
    }

})