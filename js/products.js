let categoria = localStorage.getItem('catID');
const URL=`https://japceibal.github.io/emercado-api/cats_products/${categoria}.json`;

async function getData(){
    const response = await fetch(URL);
    const data = await response.json();
    let lista = await data.products;
    return lista;
}

async function showProducts(){
    const container = document.getElementById('contenedor-productos');
    container.innerHTML = '';
    let lista = await getData();
    lista.forEach((elemento) => {
        container.innerHTML += `
        <div class="list-group-item">
            <div class="row">
                <div class="col-3">
                    <img class="img-thumbnail" src="${elemento.image}">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">${elemento.name} - ${elemento.currency} ${elemento.cost}</h4>
                        <p class="ventas">${elemento.soldCount} ventas</p>
                    </div>
                    <p class="mb-1">${elemento.description}</p>
                </div>
            </div>
        </div>
        `
    });
}
showProducts();

document.addEventListener('DOMContentLoaded',function(){
    //chequear login
    let recordado=false;
    let usuarioguardado=localStorage.getItem('usuario');
    let passwordguardada=localStorage.getItem('password');
    if(usuarioguardado!=null && passwordguardada!=null){
        recordado=true;
    }
    if(!recordado){
        if(sessionStorage.getItem('usuario')==null && sessionStorage.getItem('password')==null){
            window.location = "login.html";
        }
    }
   
    document.getElementById('close-session').addEventListener("click", function(){
        localStorage.removeItem('usuario');
        localStorage.removeItem('password');
    });

    showProducts();
    
});