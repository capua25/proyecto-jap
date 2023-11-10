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
        if (newCart == "") {
            newCart += JSON.stringify(element);
        } else {
            newCart += ";" + JSON.stringify(element);
        }
    });
    console.log(newCart);
    localStorage.setItem("cart", newCart);
    showInfo(cart);
}
if (!(localStrg != null && localStrg != undefined)) {
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
                    <td class=""><input class="subtotal" type='number' value='${element.count}' min='1' max='99'></td>
                    <td class="fw-bold text-center" >USD${value}</td>
                    <td class="text-center" width="50px"><button type="button" class="btn" onclick="removeFromCart(${element.id})"><svg style="color: red" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"> <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" fill="red"></path> <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" fill="red"></path> </svg></button></td>
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
        } else {
            if (localCart == "") {
                localCart += JSON.stringify(element);
            } else {
                localCart += ";" + JSON.stringify(element);
            }
        }
    });
    if (toRemove >= 0) {
        cart.splice(toRemove, 1)
    }
    localStorage.removeItem("cart");
    localStorage.setItem("cart", localCart);

    showInfo(cart);
}
//--------------------

//Chequeo de campos
const buttonValidate = document.getElementById('buttonValidate')
buttonValidate.addEventListener('click', () => {
    let allChecks = true;
    const shippingData = document.getElementById('datosEnvio');
    const street = document.getElementById('controlStreet');
    const number = document.getElementById('number');
    const corner = document.getElementById('corner');
    if (street.value == "") {
        street.classList.add('is-invalid');
        street.classList.remove('is-valid');
        street.classList.add('border-danger');
        street.classList.remove('border-secondary');
        street.setCustomValidity('Ingrese una calle');
        allChecks = false;
    } else {
        street.classList.remove('is-invalid');
        street.classList.add('is-valid');
        street.classList.remove('border-danger');
        street.classList.add('border-secondary');
        street.setCustomValidity('');
    }
    if (number.value == "") {
        number.classList.add('is-invalid');
        number.classList.remove('is-valid');
        number.classList.add('border-danger');
        number.classList.remove('border-secondary');
        number.setCustomValidity('Ingrese un numero de puerta');
        allChecks = false;
    } else {
        number.classList.remove('is-invalid');
        number.classList.add('is-valid');
        number.classList.remove('border-danger');
        number.classList.add('border-secondary');
        number.setCustomValidity('');
    }
    if (corner.value == "") {
        corner.classList.add('is-invalid');
        corner.classList.remove('is-valid');
        corner.classList.add('border-danger');
        corner.classList.remove('border-secondary');
        corner.setCustomValidity('Ingrese una esquina');
        allChecks = false;
    } else {
        corner.classList.remove('is-invalid');
        corner.classList.add('is-valid');
        corner.classList.remove('border-danger');
        corner.classList.add('border-secondary');
        corner.setCustomValidity('');
    }

    const divModal = document.getElementById("divModal");
    const paymentSelector = document.getElementById("paymentSelect");
    const modalCard = document.getElementById("modalCard");
    const modalBank = document.getElementById("modalBank");
    const accountNumber = document.getElementById("accountNumber");
    const card = document.getElementById("card");
    const code = document.getElementById("code");
    const date = document.getElementById("date");
    if (!modalCard.checked && !modalBank.checked) {
        modalCard.setCustomValidity('Seleccione un metodo de pago');
        paymentSelector.classList.add('is-invalid');
        paymentSelector.classList.remove('is-valid');
        allChecks = false;
    } else {
        if (!modalCard.checked) {
            if (accountNumber.value == "" || accountNumber.value == undefined || accountNumber.value == null) {
                accountNumber.setCustomValidity('Ingrese un numero de tarjeta');
                accountNumber.classList.add('is-invalid');
                accountNumber.classList.remove('is-valid');
                paymentSelector.classList.add('is-invalid');
                paymentSelector.classList.remove('is-valid');
                allChecks = false;
            } else {
                accountNumber.setCustomValidity('');
                accountNumber.classList.remove('is-invalid');
                accountNumber.classList.add('is-valid');
                paymentSelector.classList.remove('is-invalid');
                paymentSelector.classList.add('is-valid');
            }
        } else {
            if (card.value == "" || card.value == undefined || card.value == null) {
                card.setCustomValidity('Ingrese un numero de tarjeta valido');
                card.classList.add('is-invalid');
                card.classList.remove('is-valid');
                paymentSelector.classList.add('is-invalid');
                paymentSelector.classList.remove('is-valid');
                allChecks = false;
            } else {
                card.setCustomValidity('');
                card.classList.remove('is-invalid');
                card.classList.add('is-valid');
                paymentSelector.classList.remove('is-invalid');
                paymentSelector.classList.add('is-valid');
            }
            if (code.value == "" || code.value == undefined || code.value == null) {
                code.setCustomValidity('Ingrese un codigo de seguridad valido');
                code.classList.add('is-invalid');
                code.classList.remove('is-valid');
                paymentSelector.classList.add('is-invalid');
                paymentSelector.classList.remove('is-valid');
                allChecks = false;
            } else {
                code.setCustomValidity('');
                code.classList.remove('is-invalid');
                code.classList.add('is-valid');
                paymentSelector.classList.remove('is-invalid');
                paymentSelector.classList.add('is-valid');
            }
            if (date.value == "" || date.value == undefined || date.value == null) {
                date.setCustomValidity('Ingrese una fecha de vencimiento valida');
                date.classList.add('is-invalid');
                date.classList.remove('is-valid');
                paymentSelector.classList.add('is-invalid');
                paymentSelector.classList.remove('is-valid');
                allChecks = false;
            } else {
                date.setCustomValidity('');
                date.classList.remove('is-invalid');
                date.classList.add('is-valid');
                paymentSelector.classList.remove('is-invalid');
                paymentSelector.classList.add('is-valid');
            }
        }
    }
    if (allChecks) {
        paymentSelector.classList.remove('is-invalid');
        paymentSelector.classList.add('is-valid');
        const alert = document.querySelector('.alert');
        alert.classList.remove('d-none');
    } else {
        paymentSelector.classList.add('is-invalid');
        paymentSelector.classList.remove('is-valid');
    }
    shippingData.classList.add('was-validated');
    divModal.classList.add('was-validated');
});
//-----------------

document.getElementById('buttonClose').addEventListener('click', () => {
    const alert = document.querySelector('.alert');
    alert.classList.add('d-none');
    window.location = "index.html";
});

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

// Modal
(() => {
    const modalCard = document.getElementById("modalCard");
    const accountNumber = document.getElementById("accountNumber");
    const modalBank = document.getElementById("modalBank");
    const card = document.getElementById("card");
    const code = document.getElementById("code");
    const date = document.getElementById("date");
    const payment = document.getElementById("payment");
    card.innerHTML = "";
    code.innerHTML = "";
    date.innerHTML = "";
    accountNumber.innerHTML = "";
    if (modalCard.checked) {
        payment.innerHTML = "Tarjeta de crédito";
    } else if (modalBank.checked) {
        payment.innerHTML = "Transferencia bancaria";
    }

    modalCard.addEventListener("click", () => {
        accountNumber.setAttribute("disabled", "")
        card.removeAttribute("disabled")
        code.removeAttribute("disabled")
        date.removeAttribute("disabled")
        accountNumber.value = "";
        payment.innerHTML = "Tarjeta de crédito";
        accountNumber.classList.remove('is-valid');
        accountNumber.classList.remove('is-invalid');
    });
    modalBank.addEventListener("click", () => {
        accountNumber.removeAttribute("disabled")
        card.setAttribute("disabled", "")
        code.setAttribute("disabled", "")
        date.setAttribute("disabled", "")
        card.value = "";
        code.value = "";
        date.value = "";
        payment.innerHTML = "Transferencia bancaria";
        card.classList.remove('is-valid');
        card.classList.remove('is-invalid');
        code.classList.remove('is-valid');
        code.classList.remove('is-invalid');
        date.classList.remove('is-valid');
        date.classList.remove('is-invalid');
    });
})();
