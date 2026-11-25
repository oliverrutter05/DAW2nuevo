const lista = document.getElementById("lista");
const total = document.getElementById("total");

function actualizarLista() {
    total.textContent = lista.querySelectorAll("li").length;
}

actualizarLista();

lista.addEventListener("click", () => {

    let boton = event.target.closest(".borrar");

    if(boton) {
        let li = boton.closest("li");
        li.remove();
    }

    actualizarLista();

})