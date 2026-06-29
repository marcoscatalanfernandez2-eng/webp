const contenedor = document.getElementById("contenedorFincas");

const estadoImagen = {};

function mostrarFincas(lista){

    contenedor.innerHTML = "";

    lista.forEach(finca => {

        let puntos = "";

        finca.imagenes.forEach((img, i) => {
            puntos += `<span class="dot ${i === 0 ? "activo" : ""}"></span>`;
        });

        contenedor.innerHTML += `

        <div class="card">

            <div class="slider">

                <button class="flecha izquierda"
                    onclick="cambiarImagen(event, ${finca.id}, -1)">
                    ❮
                </button>

                <img
                    id="img-${finca.id}"
                    src="${finca.imagenes[0]}"
                    data-id="${finca.id}"
                >

                <button class="flecha derecha"
                    onclick="cambiarImagen(event, ${finca.id}, 1)">
                    ❯
                </button>

                <div class="favorito">❤</div>

                <div class="puntos" id="dots-${finca.id}">
                    ${puntos}
                </div>

            </div>

            <div class="info">

                <h3>${finca.titulo}</h3>
                <p>${finca.municipio}, ${finca.provincia}</p>
                <p>${finca.metros} m²</p>
                <strong>${finca.precio} €/mes</strong>

            </div>

        </div>

        `;

    });

}

mostrarFincas(
    fincas.filter(f => f.destacada).slice(0, 6)
);

document.getElementById("busqueda").addEventListener("input", function () {

    const texto = this.value.toLowerCase();

    const resultado = fincas.filter(f =>

        f.comunidad.toLowerCase().includes(texto) ||
        f.provincia.toLowerCase().includes(texto) ||
        f.municipio.toLowerCase().includes(texto)

    );

    mostrarFincas(resultado);

});

document.getElementById("mostrarTodas").onclick = function () {
    location.href = "todas.html";
};

function cambiarImagen(event, id, direccion) {

    if(event){
    event.stopPropagation();
    }

    const finca = fincas.find(f => f.id === id);

    if (!estadoImagen[id]) {
        estadoImagen[id] = 0;
    }

    estadoImagen[id] += direccion;

    if (estadoImagen[id] < 0) {
        estadoImagen[id] = finca.imagenes.length - 1;
    }

    if (estadoImagen[id] >= finca.imagenes.length) {
        estadoImagen[id] = 0;
    }

    document.getElementById("img-" + id).src =
        finca.imagenes[estadoImagen[id]];

    const dots = document
        .getElementById("dots-" + id)
        .children;

    [...dots].forEach(d => d.classList.remove("activo"));

    dots[estadoImagen[id]].classList.add("activo");

}

function abrirFinca(id) {
    location.href = "finca.html?id=" + id;
}

// ---------------- GESTOS TÁCTILES ----------------

let inicioX = 0;
let inicioY = 0;
let moviendo = false;

document.addEventListener("touchstart", function(e){

    const img = e.target.closest("img[id^='img-']");

    if(!img) return;

    inicioX = e.touches[0].clientX;
    inicioY = e.touches[0].clientY;

    moviendo = false;

});

document.addEventListener("touchmove", function(e){

    const img = e.target.closest("img[id^='img-']");

    if(!img) return;

    const dx = e.touches[0].clientX - inicioX;
    const dy = e.touches[0].clientY - inicioY;

    if(Math.abs(dx) > 15 && Math.abs(dx) > Math.abs(dy)){
        moviendo = true;
    }

});

document.addEventListener("touchend", function(e){

    const img = e.target.closest("img[id^='img-']");

    if(!img) return;

    const finX = e.changedTouches[0].clientX;

    const diferencia = finX - inicioX;

    const id = parseInt(img.dataset.id);

    if(moviendo){

        if(diferencia < -50){

            cambiarImagen(null,id,1);

        }
        else if(diferencia > 50){

            cambiarImagen(null,id,-1);

        }

    }
    else{

        abrirFinca(id);

    }

});
