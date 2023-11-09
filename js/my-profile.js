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
    
    document.getElementById("email").value = sessionStorage.getItem('usuario');
    document.getElementById("firstName").value = sessionStorage.getItem('firstName');
    document.getElementById("secondName").value = sessionStorage.getItem('secondName');
    document.getElementById("firstLastName").value = sessionStorage.getItem('firstLastName');
    document.getElementById("secondLastName").value = sessionStorage.getItem('secondLastName');
    document.getElementById("number").value = sessionStorage.getItem('number');

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

//Guardar cambios--------
const submit = document.getElementById("button")

submit.addEventListener("click", () => {
    event.preventDefault();

    const firstName = document.getElementById("firstName");
    const secondName = document.getElementById("secondName");
    const firstLastName = document.getElementById("firstLastName");
    const secondLastName = document.getElementById("secondLastName");
    const email = document.getElementById("email");
    const number = document.getElementById("number");
    const nameRequired = document.getElementById("nameRequired");
    const lastNameRequired = document.getElementById("lastNameRequired");
    const emailRequired = document.getElementById("emailRequired");
    const numberRequired = document.getElementById("numberRequired");

    if (firstName.value == ""){
        firstName.classList.add("is-invalid");
        firstName.classList.remove("is-valid");
        firstName.classList.add("border-danger");
        nameRequired.classList.add("text-danger");
    } else {
        firstName.classList.remove("is-invalid");
        firstName.classList.add("is-valid");
        firstName.classList.remove("border-danger");
        nameRequired.classList.remove("text-danger");
        nameRequired.classList.add("text-success");
    }
    if (firstLastName.value == ""){
        firstLastName.classList.add("is-invalid");
        firstLastName.classList.remove("is-valid");
        firstLastName.classList.add("border-danger");
        lastNameRequired.classList.add("text-danger");
    } else {
        firstLastName.classList.remove("is-invalid");
        firstLastName.classList.add("is-valid");
        firstLastName.classList.remove("border-danger");
        lastNameRequired.classList.remove("text-danger");
        lastNameRequired.classList.add("text-success");
    }
    if (email.value == ""){
        email.classList.add("is-invalid");
        email.classList.remove("is-valid");
        email.classList.add("border-danger");
        emailRequired.classList.add("text-danger");
    } else {
        email.classList.remove("is-invalid");
        email.classList.add("is-valid");
        email.classList.remove("border-danger");
        emailRequired.classList.remove("text-danger");
        emailRequired.classList.add("text-success");
    }
    if (number.value == ""){
        number.classList.add("is-invalid");
        number.classList.remove("is-valid");
        number.classList.add("border-danger");
        numberRequired.classList.add("text-danger");
    } else {
        number.classList.remove("is-invalid");
        number.classList.add("is-valid");
        number.classList.remove("border-danger");
        numberRequired.classList.remove("text-danger");
        numberRequired.classList.add("text-success");
    }
    sessionStorage.setItem("firstName", firstName.value);
    sessionStorage.setItem("secondName", secondName.value);
    sessionStorage.setItem("firstLastName", firstLastName.value);
    sessionStorage.setItem("email", email.value);
    sessionStorage.setItem("number", number.value);
    sessionStorage.setItem("secondLastName", secondLastName.value);
});
//------------------------

