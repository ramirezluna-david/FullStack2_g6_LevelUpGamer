const form = document.getElementById("form-inicio")
const error = document.getElementById("mensaje_error")

form.addEventListener("submit", function(evento){
    evento.preventDefault();

    let user = document.getElementById("usuario").value.trim();
    let password = document.getElementById("password").value.trim();

    let valido = true; // bandera para sabe si todo va bien

        //Reglas de negocio
    
        // Validar campos vacios
        if (user === "" || password === ""){
            error.textContent = "Error: Debe llenar todos los campos!.";
            error.style.display = "block";
            valido = false
            
        }else{
            alert("Bienveido " + user + "!");
            error.style.display = "none";
            valido = true;
            window.location.href = "index2.html"
        // Aqui puedes continnuar con el login
    }
});
