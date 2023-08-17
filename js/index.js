document.addEventListener("DOMContentLoaded", function(){
    let recordado=false;
    let usuarioguardado=localStorage.getItem('usuario');
    let passwordguardada=localStorage.getItem('password');
    if(usuarioguardado!=null && passwordguardada!=null){
        recordado=true;
    }
    
    let usuario=sessionStorage.getItem('usuario');
    let password=sessionStorage.getItem('password');
    console.log(usuario+" "+password);
    if(usuario==null || password==null){
        if(!recordado){
            window.location = "login.html"
        }
    }

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