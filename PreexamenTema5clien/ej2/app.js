let contador = 0;

const btnMenos = document.getElementById("menos");
const btnMas = document.getElementById("mas");
const total= document.getElementById("total");

btnMenos.disabled = true;

btnMas.addEventListener("click", () => {
    contador++;
    total.textContent = contador;
    btnMenos.disabled = false;
});

btnMenos.addEventListener("click", () => {
    if(contador === 0) {
        btnMenos.disabled = true;
    }

    contador--;
    total.textContent = contador;
});


