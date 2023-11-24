document.addEventListener("DOMContentLoaded", function(){
    let usuario=localStorage.getItem('usuario');
    let token=localStorage.getItem('token');
    if(usuario!=null && token!=null){
        sessionStorage.setItem('usuario',usuario);
        sessionStorage.setItem('token',token);
        window.location = "index.html";
    }
});

async function login(){
    let user = document.getElementById('usuario').value;
    let pass = document.getElementById('contrasena').value;
    let email = document.getElementById('email').value;
    let record = document.getElementById('recordar').checked;

    const res = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: user, password: pass})
    });
    const data = await res.json();
    if (data.auth){
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('usuario', user);
        sessionStorage.setItem('user_id', data.user_id);
        sessionStorage.setItem('email', email);
        if (record){
            localStorage.setItem('usuario', user);
            sessionStorage.setItem('token', data.token);
            localStorage.setItem('user_id', data.user_id);
            localStorage.setItem('email', email);
        }
        window.location = "index.html";
    }else{
        alert('Error al iniciar sesión');
    }
}