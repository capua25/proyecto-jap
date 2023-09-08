let categoria = localStorage.getItem('catID');
const URL=`https://japceibal.github.io/emercado-api/cats_products/${categoria}.json`;
let listaOrigen = [];

async function getData(){
    let result = [];
    try{
        const response = await fetch(URL);
        const data = await response.json();
        result = data.products;
    }catch(error){
        console.log(error);
    }
    return result;
}
async function dataList(){
    try{
        listaOrigen = await getData();
        showProducts(listaOrigen);
    }catch(error){
        console.log(error);
    }
}

function showProducts(array){
    const container = document.getElementById('contenedor-productos');
    container.innerHTML = '';
    array.forEach((elemento) => {
        container.innerHTML += `
        <div class="list-group-item" onclick="setProdID(${elemento.id})">
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

function setProdID(id){
    localStorage.setItem("ProdID", id);
    window.location = "product-info.html";
}


//chequeo de login----------------------------------
document.addEventListener('DOMContentLoaded',function(){
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
    document.getElementById('user').innerHTML=sessionStorage.getItem('usuario');
   
    document.getElementById('close-session').addEventListener("click", function(){
        localStorage.removeItem('usuario');
        localStorage.removeItem('password');
    });
});
//--------------------------------------------------

//ordenanza de articulos----------------------------
document.getElementById('sort$Asc').addEventListener('click', function(){
    let array = listaOrigen.slice();
    array.sort((a,b) => a.cost - b.cost);
    showProducts(array);
    console.log("anda");
});
document.getElementById('sort$Desc').addEventListener('click', function(){
    let array = listaOrigen.slice();
    array.sort((a,b) => b.cost - a.cost);
    showProducts(array);
    console.log("anda2");
});
document.getElementById('sortByRel').addEventListener('click', function(){
    let array = listaOrigen.slice();
    array.sort((a,b) => a.soldCount - b.soldCount);
    showProducts(array);
    console.log("anda3");
});

document.getElementById('rangeFilterCount').addEventListener('click', function(){
    let array = listaOrigen;
    let min = document.getElementById('rangeFilterCountMin');
    let max = document.getElementById('rangeFilterCountMax');
    if(min.value == 0 && max.value != 0){
        showProducts(array.filter((element) => element.cost<max.value));
    }
    else if(min.value != 0 && max.value == 0){
        showProducts(array.filter((element) => element.cost>min.value));
    }
    else if(min.value == 0 && max.value == 0){
        showProducts(listaOrigen);
    }
    else{
        showProducts(array.filter((element) => element.cost>min.value && element.cost<max.value));
    }
});
document.getElementById('clearRangeFilter').addEventListener('click', function(){
    document.getElementById('rangeFilterCountMin').value = null;
    document.getElementById('rangeFilterCountMax').value = null;
    showProducts(listaOrigen);
});
//--------------------------------------------------

//buscador------------------------------------------
const buscar = document.getElementById('search');
buscar.addEventListener('input', function(){
    let array = listaOrigen;
    showProducts(array.filter((element) => element.name.toLowerCase().includes(buscar.value.toLowerCase())));
});
//--------------------------------------------------

dataList();