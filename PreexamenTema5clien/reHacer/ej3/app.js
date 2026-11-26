const busqueda = document.getElementById("busqueda");
const lista = document.querySelectorAll("#lista li");

busqueda.addEventListener("input", () => {

    let resultado = busqueda.value.trim().toLowerCase();

    lista.forEach((li) => {

        let listaLi = li.textContent.toLowerCase();

        if(listaLi.includes(resultado)) {
            li.hidden = false;
        }
        else {
            li.hidden = true;
        }
    })

})