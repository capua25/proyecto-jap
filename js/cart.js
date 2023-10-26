let m_noche = localStorage.getItem('dm');
const dm = document.getElementById('switch');
let localStrg = localStorage.getItem('cart');
let cart = [];

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
    data.articles.forEach((element) => {
        cart.push(element);
    });
    if (localStrg) {
        let localCart = localStrg.split(';');
        if (localCart.length > 0 && localCart[0] != "") {
            localCart.forEach((element) => {
                cart.push(JSON.parse(element));
            });
        }
    }
    let newCart = "";
    cart.forEach((element, index) => {
        if(newCart == ""){
            newCart += JSON.stringify(element);
        }else{
            newCart += ";" + JSON.stringify(element);
        }
    });
    console.log(newCart);
    localStorage.setItem("cart", newCart);
    showInfo(cart);
}
if (!(localStrg != "[]" && localStrg != "" && localStrg != null && localStrg != undefined)) {
    getData();
} else {
    let localCart = localStrg.split(';');
    if (localCart.length > 0 && localCart[0] != "") {
        localCart.forEach((element) => {
            cart.push(JSON.parse(element));
        });
    }
    showInfo(cart);
}
//-----

//Mostrar carrito
function showInfo(array) {
    if (array.length > 0) {
        const container = document.getElementById("carritoCompras");
        container.innerHTML = '';
        array.forEach((element) => {
            let value = 0;
            if (element.currency == 'USD') {
                value = element.unitCost;
            }
            else if (element.currency == 'UYU') {
                value = Math.round(element.unitCost / 40);
            }
            container.innerHTML += `
                <tr class="table-primary">
                    <th scope="row"><img src="${element.image}" height="100px" alt=""></th>
                    <td class="text-center">${element.name}</td>
                    <td class="text-center price">${element.currency}${element.unitCost}</td>
                    <td ><input class="subtotal" type='number' value='${element.count}' min='1' max='99'></td>
                    <td class="fw-bold text-center" >USD${value}</td>
                    <td class="text-center" width="50px"><button type="button" class="btn" onclick="removeFromCart(${element.id})"><svg style="color: red" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"> <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" fill="red"></path> <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" fill="red"></path> </svg></button></td></tr>`
        });
        const inputs = document.querySelectorAll('input.subtotal');
        const subt = document.querySelectorAll('td.fw-bold.text-center');
        const prices = document.querySelectorAll('td.text-center.price');
        inputs.forEach((element, i) => {
            element.addEventListener('input', () => {
                if (element.value < 0 || element.value > 99) {
                    element.value = 1;
                }
                if (prices[i].textContent.substring(0, 3) == 'UYU') {
                    subt[i].innerHTML = 'USD' + Math.round(element.value * (Number(prices[i].textContent.substring(3) / 40)));
                }
                else if (prices[i].textContent.substring(0, 3) == 'USD') {
                    subt[i].innerHTML = 'USD' + Math.round(element.value * Number(prices[i].textContent.substring(3)));
                }
                Subtotal();
            });
        });
    }
    Subtotal();
}
//---------------

//Actualiza subtotales
function Subtotal() {
    const subtotalProd = document.getElementById('subtotalProd');
    const shipping = document.getElementById('shipping');
    const total = document.getElementById('total');
    const prices = document.querySelectorAll('#carritoCompras .table-primary td.fw-bold.text-center');
    let totalValue = 0;
    let shippingValue = 0;

    prices.forEach((element) => {
        let value = element.innerHTML.substring(3);
        let currency = element.innerHTML.substring(0, 3);

        if (currency == 'USD') {
            totalValue += Number(value);
        } else if (currency == 'UYU') {
            value = value / 40;
            totalValue += Number(value);
        }
    });

    const shipping1 = document.getElementById('FlexRadioDefault1');
    const shipping2 = document.getElementById('FlexRadioDefault2');
    const shipping3 = document.getElementById('FlexRadioDefault3');
    if (shipping1.checked) {
        shippingValue = totalValue * 0.15;
    } else if (shipping2.checked) {
        shippingValue = totalValue * 0.07;
    } else if (shipping3.checked) {
        shippingValue = totalValue * 0.05;
    }

    subtotalProd.innerHTML = '';
    subtotalProd.innerHTML = `<p class="text-secondary">USD ${Math.round(totalValue)}</p>`;
    shipping.innerHTML = '';
    shipping.innerHTML = `<p class="text-secondary">USD ${Math.round(shippingValue)}</p>`;
    total.innerHTML = '';
    total.innerHTML = `<p class="text-secondary">USD ${Math.round(totalValue + shippingValue)}</p>`;
}
//--------------------

//eliminar del carrito
function removeFromCart(id) {
    let localCart = "";
    let toRemove = 0;
    cart.forEach((element, index) => {
        if (element.id == id) {
            toRemove = index;
            console.log("borra")
        } else {
            if (localCart == "") {
                localCart += JSON.stringify(element);
            } else {
                localCart += ";" + JSON.stringify(element);
            }
            console.log("no borra")
        }
    });
    if(toRemove>0){
        cart.splice(toRemove, 1)
    }
    localStorage.removeItem("cart");
    localStorage.setItem("cart", localCart);

    console.log(cart);
    showInfo(cart);
}
//--------------------

//Chequeo de campos

//-----------------


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