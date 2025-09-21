const form = document.getElementById("form-producto")
const error = document.getElementById("mensaje_error")
const error2 = document.getElementById("mensaje_error2")
const error3 = document.getElementById("mensaje_error3")
const error4 = document.getElementById("mensaje_error4")

form.addEventListener("submit", function(evento){
    evento.preventDefault();
    const productos = {

   

    product : document.getElementById("product").value.trim(),
    product_name : document.getElementById("nombre_producto").value.trim(),
    descripcion : document.getElementById("descripcion").value.trim(),
    precio : document.getElementById("precio").value.trim(),
    stock : document.getElementById("stock").value.trim(),
    critical_stock : document.getElementById("critical_stock").value.trim(),
    categoria : document.getElementById("categoria").value.trim(),
    imagen_producto : document.getElementById("imagen_producto").value.trim()
    };
    // validaciones

    if(productos.product === "" || productos.product_name === "" || productos.precio === "" || productos.stock === "" || productos.critical_stock === "" || productos.categoria === ""){
        error.innerText = "Por favor, complete todos los campos obligatorios.";
        error.style.display = "block"
        return;
    }else{
        error.style.display = "none";
    }

    if(productos.product.length < 3){
        error2.innerText = "El codigo del producto debe tener al menos 3 caracteres.";
        error2.style.display = "block";
        return;
    }else{
        error2.style.display = "none";
    }

    if(productos.product_name.length > 100){
        error3.innerText = "El nombre del producto no debe exceder los 100 caracteres.";
        error3.style.display = "block";
        return;
    }else{
        error3.style.display = "none";
    }

    if(productos.descripcion.length > 500){
        error.innerText = "La descripcion no debe exceder los 500 caracteres.";
        error.style.display = "block";
        return;
    }else{
        error.style.display = "none";
    }

    if(productos.precio <= 0){
        error4.innerText = "El precio no puede ser menor que 0.";
        error4.style.display = "block";
    }else{
        error4.style.display = "none";
    }

    if(productos.stock <= 0){
        error.innerText = "El stock no puede ser menor que 0.";
        error.style.display = "block";
    }else{
        error.style.display = "none";
    }



    //guardar en localstorage
    let producto = JSON.parse(localStorage.getItem("productos")) || [];
    producto.push(productos);
    localStorage.setItem("productos", JSON.stringify(producto));

    alert("Nuevo producto agregado!");
    window.location.href = "producto.html";
    form.reset();

});



document.addEventListener('DOMContentLoaded', function() {
    const cancelButton = document.getElementById('cancelButton');

    cancelButton.addEventListener('click', function() {
        window.history.back();
    });
});