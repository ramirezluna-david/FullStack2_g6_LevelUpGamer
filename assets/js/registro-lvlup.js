// Referencias a elementos del DOM
const form = document.getElementById("form-registro");
const errorNombre = document.getElementById("error-nombre");
const errorApellido = document.getElementById("error-apellido");
const errorCorreo = document.getElementById("error-correo");
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
    if (nombre.length > 50) {
        return "El nombre no puede tener más de 50 caracteres.";
    }
    return null; // Sin errores
}

// Función para validar apellidos
function validarApellidos(apellidos) {
    if (apellidos === "") {
        return "Los apellidos son requeridos.";
    }
    if (apellidos.length > 100) {
        return "Los apellidos no pueden tener más de 100 caracteres.";
    }
    return null; // Sin errores
}

// Función para validar correo
function validarCorreo(correo) {
    if (correo === "") {
        return "El correo es requerido.";
    }
    if (correo.length > 100) {
        return "El correo no puede tener más de 100 caracteres.";
    }
    
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
    
    return null; // Sin errores
}

// Event listener para el formulario
form.addEventListener("submit", function(evento) {
    evento.preventDefault();
    
    // Obtener valores de los campos
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const correo = document.getElementById("correo").value.trim();
    
    let valido = true;
    
    // Validar nombre
    const errorNombreMsg = validarNombre(nombre);
    if (errorNombreMsg) {
        mostrarError(errorNombre, errorNombreMsg);
        valido = false;
    } else {
        ocultarError(errorNombre);
    }
    
    // Validar apellidos
    const errorApellidoMsg = validarApellidos(apellido);
    if (errorApellidoMsg) {
        mostrarError(errorApellido, errorApellidoMsg);
        valido = false;
    } else {
        ocultarError(errorApellido);
    }
    
    // Validar correo
    const errorCorreoMsg = validarCorreo(correo);
    if (errorCorreoMsg) {
        mostrarError(errorCorreo, errorCorreoMsg);
        valido = false;
    } else {
        ocultarError(errorCorreo);
    }
    
    // Si todo está válido
    if (valido) {
        ocultarError(errorGeneral);
        alert("Formulario válido - Datos correctos");
        // Aquí puedes agregar la lógica para enviar el formulario
        // form.submit();
    } else {
        mostrarError(errorGeneral, "Por favor, corrige los errores antes de continuar.");
    }
});

// Validación en tiempo real (opcional)
document.getElementById("nombre").addEventListener("input", function() {
    const nombre = this.value.trim();
    const error = validarNombre(nombre);
    if (error) {
        mostrarError(errorNombre, error);
    } else {
        ocultarError(errorNombre);
    }
});

document.getElementById("apellido").addEventListener("input", function() {
    const apellido = this.value.trim();
    const error = validarApellidos(apellido);
    if (error) {
        mostrarError(errorApellido, error);
    } else {
        ocultarError(errorApellido);
    }
});

document.getElementById("correo").addEventListener("input", function() {
    const correo = this.value.trim();
    const error = validarCorreo(correo);
    if (error) {
        mostrarError(errorCorreo, error);
    } else {
        ocultarError(errorCorreo);
    }
});