// Referencias a elementos del DOM
const form = document.querySelector("form");
const errorNombre = document.getElementById("error-nombre");
const errorCorreo = document.getElementById("error-correo");
const errorComentario = document.getElementById("error-comentario");
const errorGeneral = document.getElementById("error-general");

// Función para mostrar errores
function mostrarError(elemento, mensaje) {
    elemento.textContent = mensaje;
    elemento.style.display = "block";
}

// Función para ocultar errores
function ocultarError(elemento) {
    elemento.textContent = "";
    elemento.style.display = "none";
}

// Función para validar nombre
function validarNombre(nombre) {
    if (nombre === "") {
        return "El nombre es requerido.";
    }
    if (nombre.length > 100) {
        return "El nombre no puede tener más de 100 caracteres.";
    }
    return null; // Sin errores
}

// Función para validar correo
function validarCorreo(correo) {
    if (correo.length > 100) {
        return "El correo no puede tener más de 100 caracteres.";
    }
    
    // Si el campo no está vacío, validar formato y dominio
    if (correo !== "") {
        // Validar dominios permitidos
        const dominiosPermitidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];
        const esValido = dominiosPermitidos.some(dominio => correo.endsWith(dominio));
        
        if (!esValido) {
            return "Solo se permiten correos con dominios: @duoc.cl, @profesor.duoc.cl, @gmail.com";
        }
        
        // Validar formato básico de email
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(correo)) {
            return "Formato de correo inválido.";
        }
    }
    
    return null; // Sin errores
}

// Función para validar comentario
function validarComentario(comentario) {
    if (comentario === "") {
        return "El comentario es requerido.";
    }
    if (comentario.length > 500) {
        return "El comentario no puede tener más de 500 caracteres.";
    }
    return null; // Sin errores
}

// Event listener para el formulario
form.addEventListener("submit", function(evento) {
    evento.preventDefault();
    
    // Obtener valores de los campos
    const nombre = document.getElementById("contacto-nombre").value.trim();
    const correo = document.getElementById("contacto-correo").value.trim();
    const comentario = document.getElementById("contacto-comentario").value.trim();
    
    let valido = true;
    
    // Validar nombre
    const errorNombreMsg = validarNombre(nombre);
    if (errorNombreMsg) {
        mostrarError(errorNombre, errorNombreMsg);
        valido = false;
    } else {
        ocultarError(errorNombre);
    }
    
    // Validar correo
    const errorCorreoMsg = validarCorreo(correo);
    if (errorCorreoMsg) {
        mostrarError(errorCorreo, errorCorreoMsg);
        valido = false;
    } else {
        ocultarError(errorCorreo);
    }
    
    // Validar comentario
    const errorComentarioMsg = validarComentario(comentario);
    if (errorComentarioMsg) {
        mostrarError(errorComentario, errorComentarioMsg);
        valido = false;
    } else {
        ocultarError(errorComentario);
    }
    
    // Si todo está válido
    if (valido) {
        ocultarError(errorGeneral);
        alert("¡Mensaje enviado exitosamente! Nos pondremos en contacto contigo pronto.");
        form.reset();
    } else {
        mostrarError(errorGeneral, "Por favor, corrige los errores antes de enviar el mensaje.");
    }
});

// Validación en tiempo real
document.getElementById("contacto-nombre").addEventListener("input", function() {
    const nombre = this.value.trim();
    const error = validarNombre(nombre);
    if (error) {
        mostrarError(errorNombre, error);
    } else {
        ocultarError(errorNombre);
    }
});

document.getElementById("contacto-correo").addEventListener("input", function() {
    const correo = this.value.trim();
    const error = validarCorreo(correo);
    if (error) {
        mostrarError(errorCorreo, error);
    } else {
        ocultarError(errorCorreo);
    }
});

document.getElementById("contacto-comentario").addEventListener("input", function() {
    const comentario = this.value.trim();
    const error = validarComentario(comentario);
    if (error) {
        mostrarError(errorComentario, error);
    } else {
        ocultarError(errorComentario);
    }
    
    // Mostrar contador de caracteres
    const contador = document.getElementById("contador-caracteres");
    if (contador) {
        contador.textContent = `${comentario.length}/500 caracteres`;
    }
});