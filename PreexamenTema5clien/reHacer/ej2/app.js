const menos = document.getElementById("menos");
const mas = document.getElementById("mas");
const total = document.getElementById("total");

let contador = 0;

menos.disabled = true;

mas.addEventListener("click", () => {
    contador++;
    total.textContent = contador;
    menos.disabled = false;
});

menos.addEventListener("click", () => {
    contador--;
    total.textContent = contador;

    if(total === 0) {
        menos.disabled = true;
    }
})