function login(){
    let user = document.getElementById('usuario').value;
    let pass = document.getElementById('contrasena').value;
    let record = document.getElementById('recordar').checked;
    
    if (record){
        sessionStorage.setItem('usuario', user);
        sessionStorage.setItem('password', pass);
    }

    if((user!=="") && (pass!=="")){
        console.log('hasta aca va bien');
        window.location.replace("index.html");
    }
    else{
        alert('Error en nombre de usuario o contraseña');
    }
    
}