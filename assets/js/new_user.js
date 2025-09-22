const form = document.getElementById("form-usuario");
const error = document.getElementById("mensaje_error");
const error_email = document.getElementById("email_error");
const region_select = document.getElementById("region");
const comuna_select = document.getElementById("comuna");

const comuna_region = {
    metropolitana : ["Santiago"],
    araucania : ["Temuco"],
    nuble : ["chillan"]
};

        region_select.addEventListener("change", function (){
            const region = region_select.value;

            comuna_select.innerHTML = '<option value="">--Seleccione una comuna--</option>';

            if (region && comuna_region[region]){
                comuna_region[region].forEach(comuna =>{
                    const option = document.createElement("option");
                    option.value = comuna.toLowerCase();
                    option.textContent = comuna;
                    comuna_select.appendChild(option);
                })
            }
        });

form.addEventListener("submit", function(evento){
    evento.preventDefault();

    const usuario = {
        rut : document.getElementById("rut").value.trim(),
        nombre : document.getElementById("nombre").value.trim(),
        apellido : document.getElementById("apellido").value.trim(),
        email : document.getElementById("email").value.trim(),
        fecha_nacimiento : document.getElementById("fecha_nacimiento").value.trim(),
        user : document.getElementById("user").value.trim(),
        region : region_select.value.trim(),
        comuna : comuna_select.value.trim(),
        direccion : document.getElementById("direccion").value.trim()
    };
    //validaciones

    if (
        usuario.rut === "" || 
        usuario.nombre === "" || 
        usuario.apellido === "" || 
        usuario.email === "" || 
        usuario.user === "" || 
        usuario.region === "" || 
        usuario.comuna === "" || 
        usuario.direccion === ""
    ) {
        error.innerText = "Por favor, complete todos los campos obligatorios.";
        error.style.display = "block";
        return;
    }else{
        error.style.display = "none";
    }
    //RUT
    if (usuario.rut.length > 9 || usuario.rut.length < 7){
      error.innerText = "El RUT debe tener entre 7 y 9 caracteres maximo."
      error.style.display = "block";
    return;
    }else{
        error.style.display = "none";
    }
    
    //nombre 
    if(usuario.nombre.length >= 50){
      error.innerText = "El nombre no puede exceder más de 50 caracteres."
      error.style.display = "block";
    return;
    }else{
        error.style.display = "none";
    }
    //apellido
    if(usuario.apellido.length >= 100){
      error.innerText = "El apellido no puede exceder más de 100 caracteres."
      error.style.display = "block";
    return;
    }else{
      error.style.display = "none";  
    }
    
    //correo
        if (usuario.email.length > 100){
            error_email.innerText = "El correo no debe superar los 100 caracteres.";
            error_email.style.display = "block";
            return;
        }


        const regex = /^[a-zA-Z0-9._%+-]+@(duocuc\.cl|profesor\.duocuc\.cl|gmail\.com)$/;
        if (!regex.test(usuario.email)){
            error_email.innerText = "El correo debe ser de dominio @duocuc.cl, @profesor.duocuc o @gmail.com";
            error_email.style.display = "block";
            return;
        }

    //direccion
    if (usuario.direccion.length > 300){
        error.innerText = "La direccion no debe superar los 300 caracteres";
        error.style.display = "block";
        return;
    }else{
    error.style.display = "none";  
    }




        //guardar en localstorage
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    error_email.style.display = "none";
    alert("Nuevo usuario agregado!");
    window.location.href = "usuario.html";
    form.reset();
});