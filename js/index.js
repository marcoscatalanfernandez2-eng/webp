const contenedor = document.getElementById("contenedorFincas");

function mostrarFincas(lista){

    contenedor.innerHTML="";

    lista.forEach((finca,index)=>{

        let puntos="";

        finca.imagenes.forEach((img,i)=>{

            puntos+=`<span class="dot ${i==0?"activo":""}"></span>`;

        });

        contenedor.innerHTML+=`

        <div class="card">

            <div class="slider">

                <button class="flecha izquierda"
                    onclick="cambiarImagen(event,${index},-1)">
                    ❮
                </button>

                <img
                    id="imagen-${index}"
                    src="${finca.imagenes[0]}"
                    onclick="abrirFinca(${finca.id})"
                >

                <button class="flecha derecha"
                    onclick="cambiarImagen(event,${index},1)">
                    ❯
                </button>

                <div class="favorito">❤</div>

                <div class="puntos" id="puntos-${index}">
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

const imagenActual={};

fincas.forEach((f,i)=>{

    imagenActual[i]=0;

});

function cambiarImagen(event,indice,direccion){

    event.stopPropagation();

    const finca=fincas[indice];

    imagenActual[indice]+=direccion;

    if(imagenActual[indice]<0)

        imagenActual[indice]=finca.imagenes.length-1;

    if(imagenActual[indice]>=finca.imagenes.length)

        imagenActual[indice]=0;

    document.getElementById("imagen-"+indice).src=

        finca.imagenes[imagenActual[indice]];

    const dots=document
        .getElementById("puntos-"+indice)
        .children;

    [...dots].forEach(d=>d.classList.remove("activo"));

    dots[imagenActual[indice]].classList.add("activo");

}

function abrirFinca(id){

    location.href="finca.html?id="+id;

}
