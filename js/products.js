const URL="https://japceibal.github.io/emercado-api/cats_products/101.json";
let productos = [];

async function getData(){
    let response = await fetch(URL);
    let data = await response.json();
    let array = await data.products;
    return array;
}

async function showProducts(){
    const container = document.getElementById('contenedor-productos');
    productos = await getData();
    for(let i=0; i<productos.length; i++){
        container.innerHTML+=`
        <div class="list-group-item">
            <div class="row">
                <div class="col-3">
                    <img class="img-thumbnail" src="${productos[i].image}">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">${productos[i].name} - ${productos[i].currency} ${productos[i].cost}</h4>
                        <p class="ventas">${productos[i].soldCount} ventas</p>
                    </div>
                    <p class="mb-1">${productos[i].description}</p>
                </div>
            </div>
        </div>
        `
    }
}

showProducts();