const sumar = document.getElementById("sumar");
const total = document.getElementById("total");

let contador = 0;

sumar.addEventListener("click", () => {
    contador++;
    total.textContent = contador;
})