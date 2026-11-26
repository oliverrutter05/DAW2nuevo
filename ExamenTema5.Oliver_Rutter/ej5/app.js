const lista = document.getElementById("li");

lista.addEventListener("click", (event) => {

    let boton = event.value.closest(".borrar");

    if(boton) {

        let li = boton.closest("li");
        li.remove();
        
    }

})