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

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("autos").addEventListener("click", function () {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function () {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function () {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
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
    let lista = document.querySelectorAll('div.card');
    lista.forEach((element) => {
        element.classList.toggle('dark');
    });
    lista = document.querySelectorAll('a.btn');
    lista.forEach((element) => {
        element.classList.toggle('btn-light');
        element.classList.toggle('btn-dark');
    });
    lista = document.querySelectorAll('.dropdown-menu');
    lista.forEach((element) => {
        element.classList.toggle('dark-item');
    });
    const album = document.querySelector('div.album');
    album.classList.toggle('bg-light');
    album.classList.toggle('bg-dark');
}
//------------------------