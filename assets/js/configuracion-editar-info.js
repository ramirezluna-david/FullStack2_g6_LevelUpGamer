// Referencias a elementos del DOM
const form = document.getElementById("form-editar-info");
const errorNombre = document.getElementById("error-nombre");
const errorApellido = document.getElementById("error-apellido");
const errorAlias = document.getElementById("error-alias");
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

// Función para validar nombre (reutilizada de registro.js)
function validarNombre(nombre) {
    if (nombre === "") {
        return "El nombre es requerido.";
    }
    if (nombre.length > 50) {
        return "El nombre no puede tener más de 50 caracteres.";
    }
    return null; // Sin errores
}

// Función para validar apellidos (reutilizada de registro.js)
function validarApellidos(apellidos) {
    if (apellidos === "") {
        return "Los apellidos son requeridos.";
    }
    if (apellidos.length > 100) {
        return "Los apellidos no pueden tener más de 100 caracteres.";
    }
    return null; // Sin errores
}

// Función para validar alias
function validarAlias(alias) {
    if (alias === "") {
        return "El alias es requerido.";
    }
    if (alias.length < 3) {
        return "El alias debe tener al menos 3 caracteres.";
    }
    if (alias.length > 20) {
        return "El alias no puede tener más de 20 caracteres.";
    }
    
    // Validar que solo contenga letras, números y guiones bajos
    const regexAlias = /^[a-zA-Z0-9_]+$/;
    if (!regexAlias.test(alias)) {
        return "El alias solo puede contener letras, números y guiones bajos.";
    }
    
    return null; // Sin errores
}

// Función para validar correo (reutilizada de registro.js)
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

// Función para validar fecha de nacimiento
function validarFechaNacimiento(fecha) {
    if (fecha === "") {
        return null; // Campo opcional
    }
    
    const fechaNacimiento = new Date(fecha);
    const fechaActual = new Date();
    const fechaMinima = new Date("1900-01-01");
    
    if (fechaNacimiento > fechaActual) {
        return "La fecha de nacimiento no puede ser en el futuro.";
    }
    
    if (fechaNacimiento < fechaMinima) {
        return "La fecha de nacimiento no puede ser anterior a 1900.";
    }
    
    // Validar que sea mayor de 13 años
    const edadMinima = new Date();
    edadMinima.setFullYear(edadMinima.getFullYear() - 13);
    
    if (fechaNacimiento > edadMinima) {
        return "Debes ser mayor de 13 años para usar esta plataforma.";
    }
    
    return null; // Sin errores
}

// Event listener para el formulario
form.addEventListener("submit", function(evento) {
    evento.preventDefault();
    
    // Obtener valores de los campos
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const alias = document.getElementById("alias").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const fechaNacimiento = document.getElementById("fecha-nacimiento").value.trim();
    
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
    
    // Validar alias
    const errorAliasMsg = validarAlias(alias);
    if (errorAliasMsg) {
        mostrarError(errorAlias, errorAliasMsg);
        valido = false;
    } else {
        ocultarError(errorAlias);
    }
    
    // Validar correo
    const errorCorreoMsg = validarCorreo(correo);
    if (errorCorreoMsg) {
        mostrarError(errorCorreo, errorCorreoMsg);
        valido = false;
    } else {
        ocultarError(errorCorreo);
    }
    
    // Validar fecha de nacimiento
    const errorFechaMsg = validarFechaNacimiento(fechaNacimiento);
    if (errorFechaMsg) {
        mostrarError(document.getElementById("error-fecha"), errorFechaMsg);
        valido = false;
    } else {
        ocultarError(document.getElementById("error-fecha"));
    }
    
    // Si todo está válido
    if (valido) {
        ocultarError(errorGeneral);
        alert("Información actualizada exitosamente");
        // Redirigir de vuelta al perfil
        window.location.href = "/html/user-view/configuracion-cuenta/configuracion-mi-perfil.html";
    } else {
        mostrarError(errorGeneral, "Por favor, corrige los errores antes de guardar los cambios.");
    }
});

// Validación en tiempo real
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

document.getElementById("alias").addEventListener("input", function() {
    const alias = this.value.trim();
    const error = validarAlias(alias);
    if (error) {
        mostrarError(errorAlias, error);
    } else {
        ocultarError(errorAlias);
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

document.getElementById("fecha-nacimiento").addEventListener("change", function() {
    const fecha = this.value.trim();
    const error = validarFechaNacimiento(fecha);
    if (error) {
        mostrarError(document.getElementById("error-fecha"), error);
    } else {
        ocultarError(document.getElementById("error-fecha"));
    }
});

// Función para cargar datos actuales del usuario (simulación)
function cargarDatosUsuario() {
    // Simular carga de datos del usuario actual
    document.getElementById("nombre").value = "David Alejandro";
    document.getElementById("apellido").value = "Ramírez Luna";
    document.getElementById("alias").value = "David";
    document.getElementById("correo").value = "davidrrluna@gmail.com";
    document.getElementById("fecha-nacimiento").value = "2025-01-01";
}

// Cargar datos al inicializar la página
document.addEventListener('DOMContentLoaded', function() {
    cargarDatosUsuario();
});