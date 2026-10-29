const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyckozovdrrRQpxQ0GC9-MAGNeqxHCmuy8kuB4KSb_D04xPok21I8-g4SaK6p64JI7LZA/exec";

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id"); // Lee la fila por ?id=

    if (!idParam) {
        document.getElementById("nombre-invitado").innerText = "Invitación Personal";
        document.getElementById("total-pases").innerText = "02 PASES";
        document.getElementById("detalle-pases").innerText = "02 adultos";
        iniciarAnimacion();
        return;
    }

    // Consultamos pasando el id de la fila
    fetch(`${WEB_APP_URL}?id=${encodeURIComponent(idParam)}`)
        .then(response => response.json())
        .then(data => {
            if (data.found) {
                // 1. DATO 1: Nombre (Si cambias el nombre en Excel, se actualiza aquí)
                document.getElementById("nombre-invitado").innerText = data.nombre;

                // 2. DATO 2: Total de pases
                document.getElementById("total-pases").innerText = `${data.total} PASES`;

                // 3 y 4. DATOS 3 Y 4: Desglose exacto (Adultos y Niños)
                let detalleTexto = "";
                if (data.ninos > 0) {
                    // Si hay niños, muestra ambos
                    detalleTexto = `${data.ninos} ${data.ninos === 1 ? 'niño' : 'niños'} | ${data.adultos} ${data.adultos === 1 ? 'adulto' : 'adultos'}`;
                } else {
                    // Si los niños son 0, SOLO muestra los adultos
                    detalleTexto = `${data.adultos} ${data.adultos === 1 ? 'adulto' : 'adultos'}`;
                }

                document.getElementById("detalle-pases").innerText = detalleTexto;
            } else {
                document.getElementById("nombre-invitado").innerText = "Invitado";
                document.getElementById("total-pases").innerText = "PASES RESERVADOS";
                document.getElementById("detalle-pases").innerText = "Acceso general";
            }
            iniciarAnimacion();
        })
        .catch(error => {
            console.error("Error al consultar Google Sheets:", error);
            document.getElementById("nombre-invitado").innerText = "Invitado";
            document.getElementById("total-pases").innerText = "02 PASES";
            document.getElementById("detalle-pases").innerText = "02 adultos";
            iniciarAnimacion();
        });
});

function iniciarAnimacion() {
    const cartilla = document.getElementById("cartilla");
    const sello = document.getElementById("sello");

    setTimeout(() => {
        cartilla.classList.add("animar-cartilla");
    }, 1000); 

    setTimeout(() => {
        sello.classList.add("aparecer-sello");
    }, 1000); 
}
