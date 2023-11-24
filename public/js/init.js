const CATEGORIES_URL = "http://localhost:3000/api/cats/";
const PUBLISH_PRODUCT_URL = "http://localhost:3000/api/sell/";
const PRODUCTS_URL = "http://localhost:3000/api/cats_products/";
const PRODUCT_INFO_URL = "http://localhost:3000/api/products/";
const PRODUCT_INFO_COMMENTS_URL = "http://localhost:3000/api/products_comments/";
const CART_INFO_URL = "http://localhost:3000/api/user_cart/";
const CART_BUY_URL = "http://localhost:3000/api/cart/buy";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

//chequeo de login----------------------------------
document.addEventListener('DOMContentLoaded', function () {
  const userID = localStorage.getItem('user_id');
  if (userID == null) {
      userID = sessionStorage.getItem('user_id');
      if (userID == null) {
          window.location = "login.html";
      }
  }
  let recordado = false;
  let usuarioguardado = localStorage.getItem('usuario');
  let tokenguardado = localStorage.getItem('token');
  if (usuarioguardado != null && tokenguardado != null) {
      sessionStorage.setItem('usuario', usuarioguardado);
      sessionStorage.setItem('token', tokenguardado);
      recordado = true;
  }
  if (!recordado) {
      if (sessionStorage.getItem('usuario') == null && sessionStorage.getItem('token') == null) {
          window.location = "login.html";
      }
  }
  document.getElementById('user').innerHTML = sessionStorage.getItem('usuario');

  document.getElementById('close-session').addEventListener("click", function () {
      localStorage.removeItem('usuario');
      localStorage.removeItem('token');
      sessionStorage.removeItem('usuario');
      sessionStorage.removeItem('token');
  });
});
//--------------------------------------------------