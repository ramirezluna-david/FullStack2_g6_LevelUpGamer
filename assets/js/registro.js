const form = document.getElementById("form-registro")
const error = document.getElementById("mensaje_error")
const error2 = document.getElementById("mensaje_error2")
const error3 = document.getElementById("mensaje_error3")
const error4 = document.getElementById("mensaje_error4")


form.addEventListener("submit", function(evento){
    evento.preventDefault();

    let email = document.getElementById("email").value.trim();
    let user = document.getElementById("usuario").value.trim();
    let password = document.getElementById("password").value.trim();
    let password2 = document.getElementById("password2").value.trim();
    let mayor18 = document.getElementById("mayor").checked;

    let valido = true; // bandera para sabe si todo va bien

        //Reglas de negocio
    
        // Validar campos vacios
        if (email === "" || user === "" || password === "" || password2 === ""){
            error.textContent = "Error: Debe llenar todos los campos!.";
            error.style.display = "block"
            valido = false;
        }else{
            error.textContent = "";
            error.style.display = "none"
        


        //Validar si las contraseñas coincidan
        if (password != password2){
            error2.textContent = "Error: las contraseñas deben ser las mismas.";
            error2.style.display = "block"
            valido = false
        }else{
            error2.textContent = "";
            error2.style.display = "none"
    
        }

        //Validar el correo electronico
        let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if(!regex.test(email)){
            error3.textContent = "Error: correo invalido.";
            error3.style.display = "block"
            valido = false;
        }else{
            error3.textContent = "";
            error3.style.display = "none"
        }
        
        //validar si el correo es de duoc
        if(email.endsWith("@duocuc.cl")){
            alert("Felicidades gano un 20%!!!");
        }

        //validar checkbox
        if(!mayor18){
            error4.textContent = "Debes confirmar que eres mayor de 18 años";
            error4.style.display = "block"
            valido = false;
        }

    if(valido){
        alert("Registro completado")
        form.reset();
    }
    }
});




