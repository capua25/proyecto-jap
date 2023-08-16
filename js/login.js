function login(){
    let user = document.getElementById('usuario').value;
    let pass = document.getElementById('contrasena').value;
    let record = document.getElementById('recordar').checked;
    
    if (record){
        localStorage.setItem('usuario', user);
        localStorage.setItem('password', pass);
    }

    if((user!=="") && (pass!=="")){
        window.location.replace("index.html");
        localStorage.setItem("loggedIn", "true");
    }
    else{
        alert('Error en nombre de usuario o contraseña');
    }
    
}