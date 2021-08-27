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
  let total = article._price * article._quantity;
  totalPrice.push(total);
  products.push(article._id);
  detailPanier.innerHTML += `<tr class="tbody-line">
    <td><img class="img_product hidden-sm" src="${article._image}"></td>
    <td><strong>${article._name} + lentille ${article._lenses}</strong></td>
    <td>${article._price} €</td>
    <td>${article._quantity}</td>
    <td>${total} €</td>
    </tr>`;
}

// affichage du total de la commande //
const calculTotal = (accumulator, currentValue) => accumulator + currentValue;
totalDisplay.innerHTML = totalPrice.reduce(calculTotal) + " " + "€";

//---------------------------------------------------------------------------------------------//
// intéractions (envois de la commande)
//---------------------------------------------------------------------------------------------//
document.getElementById("submit-panier").addEventListener("click", (e) => {
  // affichage du message erreur //
  if (checkEmptyInputs() == 0 || testInputData(regexGeneral, firstname, "*prénom invalide") == 0 || testInputData(regexEmail, email, "*email invalide") == 0 || testInputData(regexGeneral, lastname, "*nom invalide") == 0 || testInputCp(cp.value) == 0 || testInputData(regexGeneral, city, "*ville invalide") == 0) {
    e.preventDefault();
    document.getElementById("error-message").innerHTML = erreur;
    return false;
  }

  // création du contact //
  const contact = new Contact(firstname.value, lastname.value, address.value, cp.value, city.value, email.value);

  // envois de la commande et récupération de l'orderId //
  fetch("http://localhost:3000/api/cameras/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ contact, products }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      localStorage.setItem("orderId", data.orderId);
      localStorage.setItem("price", totalDisplay.innerHTML);
      window.location.href = "confirmation-commande.html";
    });

  e.preventDefault();
});
