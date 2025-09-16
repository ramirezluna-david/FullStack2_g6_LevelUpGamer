const admin_user = "admin";
const admin_pass = "admin123";

// Función para validar credenciales
function es_admin(usuario, password){
    return usuario === admin_user && password === admin_pass;
}