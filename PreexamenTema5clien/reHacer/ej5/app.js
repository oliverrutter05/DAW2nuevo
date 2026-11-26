const lista = document.getElementById("lista");
const total = document.getElementById("total");

function contadorLista () {
    total.textContent = lista.querySelectorAll("li").length;

}

contadorLista();

lista.addEventListener("click", () => {

    let boton = event.target.closest(".borrar");

    if(boton) {
        let li = boton.closest("li");
        li.remove();
    }

    contadorLista();
})