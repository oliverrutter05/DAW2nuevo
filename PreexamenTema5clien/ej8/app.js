const envio = document.getElementById("envio");
const socio = document.getElementById("socio");
const precio = document.getElementById("precio");

function calcularPrecio() {

    let total = 30;

    if(socio.checked) {
        total = total - (total * 0.1);
    }

    if(envio.value === "domicilio") {
        total = total + 4;
    }

    precio.textContent = total.toFixed(2) + "€";
}

calcularPrecio();

envio.addEventListener("change", calcularPrecio);
socio.addEventListener("change", calcularPrecio);