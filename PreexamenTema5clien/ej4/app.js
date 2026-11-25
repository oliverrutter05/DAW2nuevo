const discos = [
    {titulo: "Blue Train", precio: 18},
    {titulo: "Kind of Blue", precio: 24},
    {titulo: "Abbey Road", precio: 20}
];

const lista = document.getElementById("discos");

discos.forEach(function(disco) {

    if(disco.precio <= 20) {

        let li = document.createElement("li");

        li.textContent = disco.titulo + " - " + disco.precio.toFixed(2) + "€";

        lista.appendChild(li);
    }
})