// PEGA AQUÍ LA URL DE TU GOOGLE APPS SCRIPT
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwtnp1KUeI21I8mt-USazfS_1ZmqlPCCMQznalmf0q3aEre9LNSUOh4_PStedmAR1hL/exec";

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const nombreInvitadoParam = urlParams.get("invitado");

    if (!nombreInvitadoParam) {
        document.getElementById("nombre-invitado").innerText = "Invitación Personal";
        document.getElementById("total-pases").innerText = "02 PASES";
        document.getElementById("detalle-pases").innerText = "02 adultos";
        iniciarAnimacion();
        return;
    }

    fetch(`${WEB_APP_URL}?name=${encodeURIComponent(nombreInvitadoParam)}`)
        .then(response => response.json())
        .then(data => {
            if (data.found) {
                document.getElementById("nombre-invitado").innerText = data.nombre;
                document.getElementById("total-pases").innerText = `${data.total} PASES`;

                let detalleTexto = "";
                if (data.ninos > 0) {
                    detalleTexto = `${data.ninos} ${data.ninos === 1 ? 'niño' : 'niños'} | ${data.adultos} ${data.adultos === 1 ? 'adulto' : 'adultos'}`;
                } else {
                    detalleTexto = `${data.adultos} ${data.adultos === 1 ? 'adulto' : 'adultos'}`;
                }

                document.getElementById("detalle-pases").innerText = detalleTexto;
            } else {
                document.getElementById("nombre-invitado").innerText = nombreInvitadoParam;
                document.getElementById("total-pases").innerText = "PASES RESERVADOS";
                document.getElementById("detalle-pases").innerText = "Acceso general";
            }
            iniciarAnimacion();
        })
        .catch(error => {
            console.error("Error al consultar Google Sheets:", error);
            document.getElementById("nombre-invitado").innerText = nombreInvitadoParam;
            document.getElementById("total-pases").innerText = "02 PASES";
            document.getElementById("detalle-pases").innerText = "02 adultos";
            iniciarAnimacion();
        });
});

// Control de la secuencia suave y en orden
function iniciarAnimacion() {
    const cartilla = document.getElementById("cartilla");
    const sello = document.getElementById("sello");

    // 1. La cartilla baja a su posición exacta
    setTimeout(() => {
        cartilla.classList.add("animar-cartilla");
    }, 600); 

    // 2. El sello de cera aparece inmediatamente después de la cartilla
    setTimeout(() => {
        sello.classList.add("aparecer-sello");
    }, 1800); 
}