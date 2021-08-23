//---------------------------------------------------------------------------------------------//
// gestion du panier (local storage)
//---------------------------------------------------------------------------------------------//

/*-------- 
 traiement panier vide (liens bloqués)
--------*/
function emptyPanier() {
  let panier = localStorage.panier;
  if (panier) {
    window.location.href = "panier.html";
  } else {
    alert("Votre panier est vide !");
  }
}
//-------- fin --------//

/*---------- 
récupération de l'option sélectionnée 
----------*/
function elementSelected(target) {
  const list = document.querySelector(target);
  return list[options.selectedIndex].value;
}
//---------- fin ----------//

/*-------- 
gestion des quantités 
--------*/
function addArticle() {
  const storage = localStorage.panier;

  //---------- création de l'article ----------//
  let article = product[0];

  //-------- si localstorage est vide création du panier et envois de l'article --------//
  if (!storage) {
    panier = [];
    panier.push(article);
    localStorage.setItem("panier", JSON.stringify(panier));
  }
  //-------- sinon --------//
  else {
    //-------- check si le modèle courant est absent on l'envoi dans le panier --------//
    let parsePanier = JSON.parse(storage);
    const modelExist = parsePanier.find((article) => article.id == id && article.lenses == elementSelected("#options"));
    if (!modelExist) {
      parsePanier.push(article);
    }
    //-------- si il est dans le tableau, on l'incrémente --------//
    else {
      for (let index in parsePanier) {
        if (parsePanier[index].id == id && parsePanier[index].lenses == elementSelected("#options")) {
          parsePanier[index].quantity++;
        }
      }
    }

    //-------- envoi du panier dans localstorage --------//
    localStorage.setItem("panier", JSON.stringify(parsePanier));
  }
}
//-------- fin --------//

/*-------- 
ajouter au panier 
--------*/
function insertInShoppingCart() {
  if (elementSelected("#options") == "") {
    alert("Veuillez choisir une option !");
  } else {
    if (confirm(`Article ajouté au panier. Voir mon panier.`)) {
      window.location.href = "panier.html";
    } else {
      window.location.href = "index.html";
    }
    addArticle();
  }
}
//-------- fin --------//

//---------------------------------------------------------------------------------------------//
// formulaire envois de la commande
//---------------------------------------------------------------------------------------------//
document.getElementById("submit-panier").addEventListener("click", (e) => {
  let erreur;
  let regexEmail = /[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([_\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})/;
  let regexGeneral = /^[^0-9@&"()!_$*€£`+=\/;?#]+$/;

  //---------- traitement de la qualité des champs ----------//
  // email //
  if (regexEmail.test(email.value) == false) {
    erreur = "*email invalide !";
    email.style.border = "1px solid red";
  }

  // city //
  if (regexGeneral.test(city.value) == false) {
    erreur = "*ville invalide !";
    city.style.border = "1px solid red";
  }

  // cp //
  if (cp.value.length != 5) {
    erreur = "*code postal invalide !";
    cp.style.border = "1px solid red";
  }

  // lastname //
  if (regexGeneral.test(lastname.value) == false) {
    erreur = "*nom invalide !";
    lastname.style.border = "1px solid red";
  }

  // firstname //
  if (regexGeneral.test(firstname.value) == false) {
    erreur = "*prénom invalide !";
    firstname.style.border = "1px solid red";
  }

  //---------- traitement champs vides ----------//
  let inputs = document.getElementsByTagName("input");
  for (let i = 0; i < inputs.length; i++) {
    if (!inputs[i].value) {
      erreur = "*veuillez renseigner tous les champs !";
      inputs[i].style.border = "1px solid red";
    }
  }
  //---------- fin traitement de la qualité des champs ----------//

  //---------- affichage du message erreur ----------//
  if (erreur) {
    e.preventDefault();
    document.getElementById("error-message").innerHTML = erreur;
    return false;
  }

  // ---------- création du contact ----------//
  let contact = {
    firstName: firstname.value,
    lastName: lastname.value,
    address: address.value,
    cp: cp.value,
    city: city.value,
    email: email.value,
  };

  //---------- envois des éléments vers l'api et récupération de l'orderId ----------//
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
