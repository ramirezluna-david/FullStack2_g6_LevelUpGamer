function temp_delete(){
    var plantilla = document.getElementById("plantilla_delete");
    if(plantilla.style.display === "none" || plantilla.style.display === ""){
        plantilla.style.display = "block";
    } else{
        plantilla.style.display = "none";
    }
}

//Eliminar usuario
function delete_user(){
    const camp_delete = document.getElementById("camp_delete");
    const accept = document.getElementById("aceptar");
    const error = document.getElementById("mensaje_error");
    
    if (camp_delete.value.trim() === ""){
        error.innerText = "Error: Debe ingresar el RUT del usuario"
        error.style.display = "block"
        return;
    }else{
        error.style.display = "none";
    }
}
