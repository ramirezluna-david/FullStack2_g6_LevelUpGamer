// Referencias a elementos del DOM
const form = document.querySelector("form");
const errorCorreo = document.getElementById("error-correo");
const errorPassword = document.getElementById("error-password");
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

// Función para validar contraseña
function validarPassword(password) {
    if (password === "") {
        return "La contraseña es requerida.";
    }
    if (password.length < 4) {
        return "La contraseña debe tener al menos 4 caracteres.";
    }
    if (password.length > 10) {
        return "La contraseña no puede tener más de 10 caracteres.";
    }
    
    return null; // Sin errores
}

// Event listener para el formulario
form.addEventListener("submit", function(evento) {
    evento.preventDefault();
    
    // Obtener valores de los campos
    const correo = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    
    let valido = true;
    
    // Validar correo
    const errorCorreoMsg = validarCorreo(correo);
    if (errorCorreoMsg) {
        mostrarError(errorCorreo, errorCorreoMsg);
        valido = false;
    } else {
        ocultarError(errorCorreo);
    }
    
    // Validar contraseña
    const errorPasswordMsg = validarPassword(password);
    if (errorPasswordMsg) {
        mostrarError(errorPassword, errorPasswordMsg);
        valido = false;
    } else {
        ocultarError(errorPassword);
    }
    
    // Si todo está válido
    if (valido) {
        ocultarError(errorGeneral);
        
        // Verificar credenciales específicas
        if (correo === "admin@duoc.cl" && password === "admin123") {
            alert("Inicio de sesión exitoso - Bienvenido Administrador");
            window.location.href = "/html/admin/admin.html";
        } else if (correo.endsWith("@duoc.cl") && password === "duoc123") {
            alert("Inicio de sesión exitoso - Bienvenido Usuario DuocUC");
            window.location.href = "/html/user-view/index-lvlup.html";
        } else if (correo.endsWith("@gmail.com") && password === "gmail123") {
            alert("Inicio de sesión exitoso - Bienvenido Usuario Gmail");
            window.location.href = "/html/user-view/index-lvlup.html";
        } else {
            mostrarError(errorGeneral, "Credenciales incorrectas. Verifique su correo y contraseña.");
        }
    } else {
        mostrarError(errorGeneral, "Por favor, corrige los errores antes de continuar.");
    }
});

// Validación en tiempo real
document.getElementById("email").addEventListener("input", function() {
    const correo = this.value.trim();
    const error = validarCorreo(correo);
    if (error) {
        mostrarError(errorCorreo, error);
    } else {
        ocultarError(errorCorreo);
    }
});

document.getElementById("password").addEventListener("input", function() {
    const password = this.value.trim();
    const error = validarPassword(password);
    if (error) {
        mostrarError(errorPassword, error);
    } else {
        ocultarError(errorPassword);
    }
});