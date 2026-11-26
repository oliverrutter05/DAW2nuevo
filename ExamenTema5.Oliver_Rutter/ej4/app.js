const titulos = ["Blue Train", "Kind of Blue", "Abbey Road"];

const discos = document.getElementById("discos");

titulos.forEach(li => {

    let lista = document.createElement("li");
    lista.textContent = li;

    discos.appendChild(lista);
})