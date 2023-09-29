document.addEventListener("DOMContentLoaded", function(){
    let usuario=localStorage.getItem('usuario');
    let password=localStorage.getItem('password');
    if(usuario!=null && password!=null){
        window.location = "index.html";
    }
});

function login(){
    let user = document.getElementById('usuario').value;
    let pass = document.getElementById('contrasena').value;
    let record = document.getElementById('recordar').checked;
    
    sessionStorage.setItem('usuario', user);
    sessionStorage.setItem('password', pass);
    if (record){
        localStorage.setItem('usuario', user);
        localStorage.setItem('password', pass);
    }

    if((user!=="") && (pass!=="")){
        window.location.replace("index.html");
    }
    else{
        alert('Error en nombre de usuario o contraseña');
    }
    
}

document.getElementById('switch').addEventListener('click', () => {
    document.body.classList.toggle('dark');
     switchButton.classList.toggle('active');
 });