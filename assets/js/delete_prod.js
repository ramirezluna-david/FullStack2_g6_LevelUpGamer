function temp_delete(){
    var plantilla = document.getElementById("plantilla_delete");
    if(plantilla.style.display === "none" || plantilla.style.display === ""){
        plantilla.style.display = "block";
    } else{
        plantilla.style.display = "none";
    }
}

//Eliminar producto
function delete_prod(){
    const camp_delete = document.getElementById("camp_delete_prod");
    const accept = document.getElementById("aceptar");
    const error = document.getElementById("mensaje_error");

    const prod_eliminar = camp_delete.value.trim();
    
    if (camp_delete.value.trim() === ""){
        error.innerText = "Error: Debe ingresar el codigo del producto";
        error.style.display = "block";
        return;
    }else{
        error.style.display = "none";
    }

    let productos = JSON.parse(localStorage.getItem("productos")) || [];

    const index = productos.findIndex(p => p.product === prod_eliminar);

    if (index === -1){
        error.innerText = "Error producto no encontrado con ese codigo.";
        error.style.display = "block";
        return;
    }

    //eliminar usuario
    productos.splice(index, 1);

    //guardar nuevamente en localstorage
    localStorage.setItem("productos", JSON.stringify(productos));

    alert("Producto eliminado correctamente!!!.");

    //recargar la pagina para actualizar la tabla

    window.location.reload()

}