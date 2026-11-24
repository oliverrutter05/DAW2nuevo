const elementosStock = document.querySelectorAll(".stock");

for (const parrafo of elementosStock) {
    parrafo.textContent += " --disponible";
}