const detailPanier = document.querySelector("tbody");
const panier = JSON.parse(localStorage.panier);
const displayPanier = document.querySelector("#panier");
const totalDisplay = document.querySelector(".total_result");
const firstname = document.forms["form-contact"]["firstname"];
const lastname = document.forms["form-contact"]["lastname"];
const address = document.forms["form-contact"]["address"];
const cp = document.forms["form-contact"]["cp"];
const city = document.forms["form-contact"]["city"];
const email = document.forms["form-contact"]["email"];
let totalPrice = [];
let products = [];
let regexEmail = /[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([_\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})/;
let regexGeneral = /^[^0-9@&"()!_$*€£`+=\/;?#]+$/;
let erreur;

//---------------------------------------------------------------------------------------------//
// gestion de l'affichage du panier
//---------------------------------------------------------------------------------------------//
for (let article of panier) {
  let total = article.price * article.quantity;
  totalPrice.push(total);
  products.push(article.id);
  detailPanier.innerHTML += `<tr class="tbody-line">
    <td><img class="img_product hidden-sm" src="${article.img}"></td>
    <td><strong>${article.productName} + lentille ${article.lenses}</strong></td>
    <td>${article.price} €</td>
    <td>${article.quantity}</td>
    <td>${total} €</td>
    </tr>`;
}

//---------- calcul et affichage du total avec la méthode reduce() ----------//
const calculTotal = (accumulator, currentValue) => accumulator + currentValue;
totalDisplay.innerHTML = totalPrice.reduce(calculTotal) + " " + "€";
