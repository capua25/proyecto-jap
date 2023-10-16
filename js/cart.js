let m_noche = localStorage.getItem('dm');
const dm = document.getElementById('switch');
let cart = [];
let cartLength = 0;
let count = 0;

dm.addEventListener('click', () => {
    if (m_noche) {
        localStorage.removeItem('dm');
    } else {
        localStorage.setItem('dm', true);
    }
    darkmode(dm);
});

//fetch
async function getData() {
    const response = await fetch(CART_INFO_URL + "25801" + ".json");
    const data = await response.json();
    //provisional hasta que funcione el servidor
    cart.push(data.articles[0]);
    let localCart = localStorage.getItem('cart');
    if(localCart!=null&&localCart!=''){
        const articles = localCart.split(',');
        cartLength = articles.length;
        articles.forEach((article)=>{
            getArticle(PRODUCT_INFO_URL+article+'.json');
        });
    }else{
        showInfo(cart);
    }
    //------------------------------------------
    
}
getData();

async function getArticle(URL){
    const res = await fetch(URL);
    const data = await res.json();
    let article = {
        count:1,
        currency:data.currency,
        id:data.id,
        image:data.images[0],
        name:data.name,
        unitCost:data.cost
    }
    cart.push(article);
    count++;
    if(count==cartLength){
        showInfo(cart);
    }
}
//-----

//Mostrar carrito
function showInfo(array) {
    console.log(array);
    const container = document.getElementById("carritoCompras");
    container.innerHTML = '';
    array.forEach((element) => {
        
        container.innerHTML += `
        <tr class="table-primary">
            <th scope="row"><img src="${element.image}" height="100px" alt=""></th>
            <td class="text-center">${element.name}</td>
            <td class="text-center price">${element.currency}${element.unitCost}</td>
            <td><input class="subtotal" type='number' value='1' min='1' max='99'></td>
            <td class="fw-bold text-center">${element.currency}${element.unitCost}</td>
        </tr>`
    });

    const inputs = document.querySelectorAll('input.subtotal');
    const subt = document.querySelectorAll('td.fw-bold.text-center');
    const prices = document.querySelectorAll('td.text-center.price');
    inputs.forEach((element, i) => {
        element.addEventListener('input', () => {
            if (element.value < 0 || element.value > 99) {
                element.value = 1;
            }
            subt[i].innerHTML = 'USD' + (element.value * Number(prices[i].textContent.substring(3)));
        });
    });
}
//---------------

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

if (m_noche) { darkmode(dm); }
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
}
//------------------------