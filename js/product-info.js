const ProdID = localStorage.getItem("ProdID");
let arrComments = [];
let article = 0;

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

async function getData() {
    const response = await fetch(PRODUCT_INFO_URL + ProdID + '.json');
    const data = await response.json();
    article = data.id;
    showInfo(data);
}

async function getComments() {
    const response = await fetch(PRODUCT_INFO_COMMENTS_URL + ProdID + '.json');
    const data = await response.json();
    arrComments = data;
    showComments(arrComments);
    if (m_noche) { darkmode(dm); }
}

function showInfo(articulo) {
    const contenedor = document.getElementById('contenedor');
    const relacionados = document.getElementById('prod-rel');
    contenedor.innerHTML = `
    <div class="row p-3">
        <div class="col-md-auto">
            <p class="text-left h2">${articulo.name}</p>
        </div>
        <div class="col-md-7">
        </div>
        <div class="col-md-auto">
            <button type="button" class="btn btn-success" onclick=''>Comprar</button>  
        </div>
    </div>
    <div class="row">
        <p class="h6"><strong>Precio</strong></p>
        <p>${articulo.currency} ${articulo.cost}</p>
    </div>
    <div class="row">
        <p class="h6"><strong>Descripción</strong></p>
        <p>${articulo.description}</p>
    </div>
    <div class="row">
        <p class="h6"><strong>Categoría</strong></p>
        <p>${articulo.category}</p>
    </div>
    <div class="row">
        <p class="h6"><strong>Cantidad de vendidos</strong></p>
        <p>${articulo.soldCount}</p>
    </div>
    <div class="row" id="imgs">
        <p class="h6"><strong>Imágenes ilustrativas</strong></p>
    </div>`;
    const images = document.getElementById('imgs');
    for (let i = 0; i < articulo.images.length; i++) {
        images.innerHTML += `
        <div class="col">
            <img class="img-thumbnail" src=${articulo.images[i]}>
        </div>`;
    }
    relacionados.innerHTML = '';
    const rp = articulo.relatedProducts;
    for (let i = 0; i < rp.length; i++) {
        relacionados.innerHTML += `
        <div class="carousel-item card-body">
            <img class="img-thumbnail card-img" src=${rp[i].image} onclick="setProdID(${rp[i].id})">
            <div class="carousel-caption d-none d-md-block">
              <h3>${rp[i].name}</h3>
            </div>
        </div>`};
    relacionados.firstElementChild.setAttribute('class', 'carousel-item card-body active');
}
function cart() {
    let cart = localStorage.getItem('cart');
    cart.append(article);
    localStorage.setItem('cart', cart);
}
function setProdID(id) {
    localStorage.setItem("ProdID", id);
    window.location = "product-info.html";
}

function showComments(commentsList) {
    const comentarios = document.getElementById("comentarios");
    comentarios.innerHTML = '';
    commentsList.forEach((comentario) => {
        let arr = [];
        for (let i = 0; i < 5; i++) {
            if (i < comentario.score) {
                arr.push(`<span class="fa fa-star checked"></span>`);
            } else {
                arr.push(`<span class="fa fa-star"></span>`);
            }
        };
        comentarios.innerHTML += `
        <div class="card mb-3">
            <div class="card-body">
                <p><strong>${comentario.user}</strong> - ${comentario.dateTime} - ${arr[0]}${arr[1]}${arr[2]}${arr[3]}${arr[4]}</p>
                <p>${comentario.description}</p>
            </div>
        </div>`;
    });
};

function pushComment() {
    const puntuacion = document.getElementById('puntos');
    const comentario = document.getElementById('comentario');
    if (comentario.value.trim() == '') {
        alert("Comentario vacío");
        return 0;
    }
    let puntos = puntuacion.selectedOptions[0].value;
    const usuario = sessionStorage.getItem('usuario');
    const date = new Date();
    let actual = date.getFullYear() + "-" + ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1) + "-" + (date.getDate() < 10 ? '0' : '') + date.getDate() + " " +
        (date.getHours() < 10 ? '0' : '') + date.getHours() + ":" + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() + ":" + (date.getSeconds() < 10 ? '0' : '') + date.getSeconds();

    let commentObj = {
        product: ProdID,
        score: puntos,
        description: comentario.value,
        user: usuario,
        dateTime: actual,
    };

    //Aca iria el fetch con el metodo POST

    comentario.value = '';
    arrComments.push(commentObj);
    showComments(arrComments);
}

//chequeo de login----------------------------------
document.addEventListener('DOMContentLoaded', function () {
    let recordado = false;
    let usuarioguardado = localStorage.getItem('usuario');
    let passwordguardada = localStorage.getItem('password');
    if (usuarioguardado != null && passwordguardada != null) {
        recordado = true;
    }
    if (!recordado) {
        if (sessionStorage.getItem('usuario') == null && sessionStorage.getItem('password') == null) {
            window.location = "login.html";
        }
    }
    document.getElementById('user').innerHTML = sessionStorage.getItem('usuario');

    document.getElementById('close-session').addEventListener("click", function () {
        localStorage.removeItem('usuario');
        localStorage.removeItem('password');
        sessionStorage.removeItem('usuario');
        sessionStorage.removeItem('password');
    });
});
//--------------------------------------------------

getData();
getComments();

//Dark Mode---------------
function darkmode(dm) {
    if (dm.innerHTML == "Modo Día") {
        dm.innerHTML = "Modo Noche"
    } else {
        dm.innerHTML = "Modo Día"
    }
    document.body.classList.toggle('dark');
    let lista = document.querySelectorAll('div.card-body');
    lista.forEach((element) => {
        element.classList.toggle('dark');
    });
    lista = document.querySelectorAll('.dropdown-menu');
    lista.forEach((element) => {
        element.classList.toggle('dark-item');
    });
    lista = document.querySelectorAll('textarea');
    lista.forEach((element) => {
        element.classList.toggle('dark-item');
    });
    lista = document.querySelectorAll('select');
    lista.forEach((element) => {
        element.classList.toggle('dark-item');
    });
}
//------------------------