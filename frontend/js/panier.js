const tbody = document.querySelector("tbody");
const panier = JSON.parse(localStorage.panier);
const displayPanier = document.querySelector(".panier");
const emptyPanier = document.querySelector(".alert-empty-panier");
const totalDisplay = document.querySelector(".table_total_result");
const firstname = document.forms["form-contact"]["firstname"];
const lastname = document.forms["form-contact"]["lastname"];
const address = document.forms["form-contact"]["address"];
const cp = document.forms["form-contact"]["cp"];
const city = document.forms["form-contact"]["city"];
const email = document.forms["form-contact"]["email"];
let totalPrice = [];
let products = [];
//---------------------------------------------------------------------------------------------//
// gestion de l'affichage du panier
//---------------------------------------------------------------------------------------------//

// affichage message panier vide //
if (panier) {
  emptyPanier.style.display = "none";
} else {
  emptyPanier.style.display = "flex";
  displayPanier.style.display = "none";
}

// affichage panier //
for (let article of panier) {
  let total = article.price * article.quantity;
  totalPrice.push(total);
  products.push(article.id);
  tbody.innerHTML += `<tr>
    <td class="table_body_img"><img src="${article.img}" alt=""></td>
    <td class="table_body_name">${article.productName}</td>
    <td class="table_body_price">${article.price} €</td>
    <td class="table_body_quantity">${article.quantity}</td>
    <td class="table_body_total">${total} €</td>
    </tr>`;
}

//---------- calcul et affichage du total avec la méthode reduce() ----------//
const calculTotal = (accumulator, currentValue) => accumulator + currentValue;
totalDisplay.innerHTML = totalPrice.reduce(calculTotal) + " " + "€";

