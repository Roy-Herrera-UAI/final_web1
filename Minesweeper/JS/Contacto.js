document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var nombre = document.getElementById("nombre").value.trim();
    var email = document.getElementById("email").value.trim();
    var mensaje = document.getElementById("mensaje").value.trim();
    var errorMsg = document.getElementById("errorMsg");
    errorMsg.textContent = "";
    var nombreRegex = /^[a-zA-Z0-9 ]+$/;
    if (!nombreRegex.test(nombre)) {
        errorMsg.textContent = "El nombre debe ser alfanumérico.";
        return;
    }
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errorMsg.textContent = "Email inválido.";
        return;
    }
    if (mensaje.length <= 5) {
        errorMsg.textContent = "El mensaje debe tener más de 5 caracteres.";
        return;
    }
    var asunto = "Contacto desde Buscaminas";
    var cuerpo = "Nombre: " + nombre + "%0D%0A"
               + "Email: " + email + "%0D%0A%0D%0A"
               + mensaje;
    window.location.href = "mailto:roy.herrera@alumnos.uai.edu.ar"
        + "?subject=" + encodeURIComponent(asunto)
        + "&body=" + cuerpo;
});