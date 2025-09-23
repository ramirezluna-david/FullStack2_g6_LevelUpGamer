function temp_edit(){
    var plantilla = document.getElementById("plantilla_edit");
    if(plantilla.style.display === "none" || plantilla.style.display === ""){
        plantilla.style.display = "block";
    } else{
        plantilla.style.display = "none";
    }
}

function edit_prod(){
    const camp_edit = document.getElementById("camp_edit");
    const accept = document.getElementById("aceptar");
    const error = document.getElementById("mensaje_error");

    const prod_edit = camp_edit.value.trim();
    
    if (camp_edit.value.trim() === ""){
        error.innerText = "Error: Debe ingresar el codigo del producto";
        error.style.display = "block";
        return;
    }else{
        error.style.display = "none";
    }

    let productos = JSON.parse(localStorage.getItem("productos")) || [];

    const producto = productos.find(p => p.product === prod_edit);

        if (!producto){
        error.innerText = "Error codigo de producto no identificado.";
        error.style.display = "block";
        return;
    }
    localStorage.setItem("producto_edit", prod_edit);

    window.location.href = "editar_prod.html";
}