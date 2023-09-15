const ProdID = localStorage.getItem("ProdID");
let arrComments = [];

async function getData(){
    const response = await fetch(PRODUCT_INFO_URL+ProdID+'.json');
    const data = await response.json();
    showInfo(data);
}

async function getComments(){
    const response = await fetch(PRODUCT_INFO_COMMENTS_URL+ProdID+'.json');
    const data = await response.json();
    console.log(data);
    arrComments = data;
    showComments(arrComments);
}

function showInfo(articulo){
    const contenedor = document.getElementById('contenedor');
    contenedor.innerHTML=`
    <div class=""></div>
    <div class="row">
        <p class="h3">${articulo.name}</p>
    </div>
    <div class="row">
        <p class="h5">Precio</p>
        <p>${articulo.currency} ${articulo.cost}</p>
    </div>
    <div class="row">
        <p class="h5">Descripción</p>
        <p>${articulo.description}</p>
    </div>
    <div class="row">
        <p class="h5">Categoría</p>
        <p>${articulo.category}</p>
    </div>
    <div class="row">
        <p class="h5">Cantidad de vendidos</p>
        <p>${articulo.soldCount}</p>
    </div>
    <div class="row" id="imgs">
        <p class="h5">Imágenes ilustrativas</p>
    </div>
    `;
    const images = document.getElementById('imgs');
    for(let i=0; i<articulo.images.length; i++){
        images.innerHTML+=`<img class="img-thumbnail" src=${articulo.images[i]}>`
    }
}

 function showComments(commentsList){
     const comentarios = document.getElementById("comentarios");
    comentarios.innerHTML = '';
    console.log(commentsList)
    commentsList.forEach((comentario) => {
        let arr = [];
        for(let i=0;i<5;i++){
            if(i<comentario.score){
                arr.push(`<span class="fa fa-star checked"></span>`);
            }else{
                arr.push(`<span class="fa fa-star"></span>`);
            }
        };
        comentarios.innerHTML += `
        <div>
            <p><strong>${comentario.user}</strong> - ${comentario.dateTime} - ${arr[0]}${arr[1]}${arr[2]}${arr[3]}${arr[4]}
            </p>
            <p>${comentario.description}</p>
        </div>`;
    });
};

function pushComment(){
    const puntuacion = document.getElementById('puntos');
    const comentario = document.getElementById('comentario');
    if(comentario.value.trim()==''){
        alert("Comentario vacío");
        return 0;
    }
    let puntos = puntuacion.selectedOptions[0].value;
    const usuario = sessionStorage.getItem('usuario');
    const date = new Date();
    let actual = date.getFullYear()+"-"+date.getMonth()+"-"+date.getDay()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();

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

getData();
getComments();

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