const regalo = document.getElementById("regalo");
const precio = document.getElementById("precio");

regalo.addEventListener("input", () => {

    let precioBase = 20;
    let eurosEnvoltorio = 2;

    if(precioBase.checked) {
        precio.textContent = "Total: " + precioBase;
        regalo.change();
    }
    if (eurosEnvoltorio.checked) {
        precio.textContent = "Total: " + eurosEnvoltorio;
        regalo.change();
    } 
    else {
        
    }
})