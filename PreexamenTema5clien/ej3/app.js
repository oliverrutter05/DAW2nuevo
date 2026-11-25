const busqueda = document.getElementById("busqueda");
const lista = document.querySelectorAll("#lista li");

busqueda.addEventListener("input", () => {

    let textoBuscado = busqueda.value.trim().toLowerCase();

    lista.forEach((li) => {

        let textoLi = li.textContent.toLowerCase();

        if(textoLi.includes(textoBuscado)) {
            li.hidden = false;
        }
        else {
            li.hidden = true;
        }
    })
})