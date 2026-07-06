const contenedor = document.getElementById("contenedorFinca");

// sacar ID de la URL
const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));

// buscar finca
const finca = fincas.find(f => f.id === id);

const mapa = `
<iframe
    width="100%"
    height="400"
    style="border:0;border-radius:15px"
    loading="lazy"
    allowfullscreen
    src="https://www.google.com/maps?q=${finca.ubicacion.lat},${finca.ubicacion.lng}&z=16&output=embed">
</iframe>
`;

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
