document.addEventListener("DOMContentLoaded", function(){
    let recordado=false;
    let usuarioguardado=localStorage.getItem('usuario');
    let passwordguardada=localStorage.getItem('password');
    if(usuarioguardado!=null && passwordguardada!=null){
        sessionStorage.setItem('usuario',usuarioguardado);
        recordado=true;
    }
    if(!recordado){
        if(sessionStorage.getItem('usuario')==null && sessionStorage.getItem('password')==null){
            window.location = "login.html";
        }
    }

    document.getElementById('user').innerHTML=sessionStorage.getItem('usuario');

    //Cerrar sesion
    document.getElementById('close-session').addEventListener("click", function(){
        localStorage.removeItem('usuario');
        localStorage.removeItem('password');
        sessionStorage.removeItem('usuario');
        sessionStorage.removeItem('password');
    });

    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});

document.getElementById('switch').addEventListener('click', () => {
    document.body.classList.toggle('dark');
    switchButton.classList.toggle('active');
});