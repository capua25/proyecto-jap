let categoria = localStorage.getItem('catID');
const URL = PRODUCTS_URL+`${categoria}`;
let listaOrigen = [];

let m_noche = localStorage.getItem('dm');
const dm = document.getElementById('switch');
dm.addEventListener('click', () => {
    if (m_noche) {
        localStorage.removeItem('dm');
    } else {
        localStorage.setItem('dm', true);
    }
    darkmode(dm);
});

//Función asincrónica que obtiene los datos desde el servidor
async function getData() {
    let result = [];
    try {
        const response = await fetch(URL);
        const data = await response.json();
        result = data.products;
    } catch (error) {
        console.log(error);
    }
    return result;
}
//Función asincrónica que escribe el array de datos en una variable
//y ejecuta la función showProducts que no es asincrónica, esto es para
//evitar errores, ya que espera la respuesta de los datos para luego ejecutar la función no asíncrona.
async function dataList() {
    try {
        listaOrigen = await getData();
        showProducts(listaOrigen);
    } catch (error) {
        console.log(error);
    }
}

//Muestra los productos añadiendo elementos HTML
function showProducts(array) {
    const container = document.getElementById('contenedor-productos');
    container.innerHTML = '';
    array.forEach((elemento) => {
        container.innerHTML += `
        <div class="list-group-item list-group-item-action cursor-active" onclick="setProdID(${elemento.id})">
            <div class="row">
                <div class="col-3 ">
                    <img class="img-thumbnail" src="${elemento.image}">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <p class="mb-1 col-sm-5 col-md-5 col-lg-6 fs-4  fw-bold text-justify">${elemento.name} </p>
                        <p  class="mb-1 col-sm-1 col-md-1 col-lg-4 fs-5 fw-bolder"> -  </p>
                        <p  class="mb-1 col-sm-5 col-md-3 fs-5 fw-semibold"> ${elemento.currency} ${elemento.cost} </p>
                    </div>
                    <p class="mb-1 fs-5">${elemento.description}</p>
                    <div class="col "> 
                    <p class="ventas text-end fw-light fst-italic">${elemento.soldCount} ventas</p> 
                    </div>
                </div>
            </div>
        </div>
        `
    });
    m_noche = localStorage.getItem('dm');
    if (m_noche) {
        let lista = document.querySelectorAll('div.list-group-item');
        lista.forEach((element) => {
            element.classList.toggle('dark-item');
        });
    }
}

//Guarda el ID del producto seleccionado
function setProdID(id) {
    localStorage.setItem("ProdID", id);
    window.location = "product-info.html";
}

//ordenanza de articulos----------------------------
document.getElementById('sort$Asc').addEventListener('click', function () {
    let array = listaOrigen.slice();
    array.sort((a, b) => a.cost - b.cost);
    showProducts(array);
});
document.getElementById('sort$Desc').addEventListener('click', function () {
    let array = listaOrigen.slice();
    array.sort((a, b) => b.cost - a.cost);
    showProducts(array);
});
document.getElementById('sortByRel').addEventListener('click', function () {
    let array = listaOrigen.slice();
    array.sort((a, b) => b.soldCount - a.soldCount);
    showProducts(array);
});

document.getElementById('rangeFilterCount').addEventListener('click', function () {
    let array = listaOrigen;
    let min = document.getElementById('rangeFilterCountMin');
    let max = document.getElementById('rangeFilterCountMax');
    if (min.value == 0 && max.value != 0) {
        showProducts(array.filter((element) => element.cost < max.value));
    }
    else if (min.value != 0 && max.value == 0) {
        showProducts(array.filter((element) => element.cost > min.value));
    }
    else if (min.value == 0 && max.value == 0) {
        showProducts(listaOrigen);
    }
    else {
        showProducts(array.filter((element) => element.cost > min.value && element.cost < max.value));
    }
});
document.getElementById('clearRangeFilter').addEventListener('click', function () {
    document.getElementById('rangeFilterCountMin').value = null;
    document.getElementById('rangeFilterCountMax').value = null;
    showProducts(listaOrigen);
});
//--------------------------------------------------

//buscador------------------------------------------
const buscar = document.getElementById('search');
buscar.addEventListener('input', function () {
    let array = listaOrigen;
    showProducts(array.filter((element) => element.name.toLowerCase().includes(buscar.value.toLowerCase()) || element.description.toLowerCase().includes(buscar.value.toLowerCase())));
});
//--------------------------------------------------

dataList();

//Dark Mode---------------
function darkmode(dm) {
    if (dm.innerHTML == "Modo Día") {
        dm.innerHTML = "Modo Noche"
    } else {
        dm.innerHTML = "Modo Día"
    }
    document.body.classList.toggle('dark');
    let lista = document.querySelectorAll('div.list-group-item');
    lista.forEach((element) => {
        element.classList.toggle('dark-item');
    });
    lista = document.querySelectorAll('label.btn');
    lista.forEach((element) => {
        element.classList.toggle('btn-light');
        element.classList.toggle('btn-dark');
    });
    lista = document.querySelectorAll('input');
    lista.forEach((element) => {
        element.classList.toggle('dark-item');
    });
    lista = document.querySelectorAll('.dropdown-menu');
    lista.forEach((element) => {
        element.classList.toggle('dark-item');
    });
}
//------------------------