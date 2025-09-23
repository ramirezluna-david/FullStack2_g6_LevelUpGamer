function temp_edit(){
    var plantilla = document.getElementById("plantilla_edit");
    if(plantilla.style.display === "none" || plantilla.style.display === ""){
        plantilla.style.display = "block";
    } else{
        plantilla.style.display = "none";
    }
}
//Eliminar usuario
function edit_user(){
    const camp_edit = document.getElementById("camp_edit");
    const accept = document.getElementById("aceptar");
    const error = document.getElementById("mensaje_error");

    const rut_edit = camp_edit.value.trim();
    
    if (camp_edit.value.trim() === ""){
        error.innerText = "Error: Debe ingresar el RUT del usuario"
        error.style.display = "block"
        return;
    }else{
        error.style.display = "none";
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuario = usuarios.find(u => u.rut === rut_edit);

        if (!usuario){
        error.innerText = "Error usuario no encontrado con ese RUT.";
        error.style.display = "block";
        return;
    }
    localStorage.setItem("usuario_edit", rut_edit);

    window.location.href = "edit_user.html";
}