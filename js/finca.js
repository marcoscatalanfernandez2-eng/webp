const contenedor = document.getElementById("contenedorFinca");

// sacar ID de la URL
const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));

// buscar finca
const finca = fincas.find(f => f.id === id);

if (!finca) {

    contenedor.innerHTML = "<h2>Finca no encontrada</h2>";

} else {

    let galeria = "";

    finca.imagenes.forEach(img => {
        galeria += `<img src="${img}" class="img-finca">`;
    });

    contenedor.innerHTML = `

        <div class="finca-container">

            <h2>${finca.titulo}</h2>

            <p class="ubicacion">
                ${finca.municipio}, ${finca.provincia}
            </p>

            <div class="galeria">
                ${galeria}
            </div>

            <div class="info-finca">

                <p><b>Precio:</b> ${finca.precio} €/mes</p>
                <p><b>Superficie:</b> ${finca.metros} m²</p>
                <p><b>Comunidad:</b> ${finca.comunidad}</p>

            </div>

            <div class="contacto">

                <a href="tel:600123123" class="btn">
                    📞 Llamar
                </a>

                <a href="mailto:contacto@parcelas.es" class="btn">
                    ✉️ Email
                </a>

            </div>

        </div>

    `;

}
