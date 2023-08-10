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
        <div class="tarjeta-producto">
            <img src="${productos[i].image}">
            <h2>${productos[i].name} - ${productos[i].currency} ${productos[i].cost}</h2>
            <p class="descripcion">${productos[i].description}</p>
            <p class="ventas">${productos[i].soldCount}</p>
        </div>
        `
    }
}

showProducts();