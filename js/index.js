const contenedor = document.getElementById("contenedorFincas");

function mostrarFincas(lista){

    contenedor.innerHTML="";

    lista.forEach(finca=>{

        contenedor.innerHTML += `

        <div class="card">

            <img src="${finca.imagenes[0]}">

            <div class="info">

                <h3>${finca.titulo}</h3>

                <p>${finca.municipio}</p>

                <p>${finca.metros} m²</p>

                <p>${finca.precio} €/mes</p>

            </div>

        </div>

        `;

    });

}

mostrarFincas(
    fincas.filter(f=>f.destacada).slice(0,6)
);

document
.getElementById("busqueda")
.addEventListener("input",function(){

    const texto=this.value.toLowerCase();

    const resultado=fincas.filter(f=>

        f.comunidad.toLowerCase().includes(texto)

        ||

        f.provincia.toLowerCase().includes(texto)

        ||

        f.municipio.toLowerCase().includes(texto)

    );

    mostrarFincas(resultado);

});

document
.getElementById("mostrarTodas")
.onclick=function(){

    location.href="todas.html";

}
