const ProdID = localStorage.getItem("ProdID");

async function getData(){
    const response = await fetch(PRODUCT_INFO_URL+ProdID+'.json');
    const data = await response.json();
    console.log(data);
}

async function getComments(){
    const response = await fetch(PRODUCT_INFO_COMMENTS_URL+ProdID+'.json');
    const data = await response.json();
    console.log(data);
}

getComments();