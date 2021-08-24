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

/*-------------- 
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

/*---------------------------------- 
récupération de l'option sélectionnée 
----------*/
function elementSelected(target) {
  const list = document.querySelector(target);
  return list[options.selectedIndex].value;
}

/*------------------- 
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

//---------------------------------------------------------------------------------------------//
// gestion du formulaire
//---------------------------------------------------------------------------------------------//

/*--------------------------- 
traitement qualité des champs
(email, firstname, lastname, city) 
--------*/
function testInputData(regexName, target, message) {
  if (regexName.test(target.value.trim()) == false) {
    erreur = message;
    target.style.border = "2px solid red";
    return 0;
  } else {
    return 1;
  }
}

/*----------------------------- 
traitement qualité du champs cp 
--------*/
function testInputCp() {
  if (cp.value.length != 5) {
    erreur = "*code postal invalide !";
    cp.style.border = "2px solid red";
    return 0;
  } else {
    return 1;
  }
}

/*--------------------- 
traitement champs vides 
--------*/
function checkEmptyInputs() {
  let inputs = document.getElementsByTagName("input");
  for (let i = 0; i < inputs.length; i++) {
    if (!inputs[i].value) {
      erreur = "*veuillez renseigner tous les champs !";
      inputs[i].style.border = "2px solid red";
      return 0;
    } else {
      return 1;
    }
  }
}

/*-------------------
envois de la commande
--------*/
document.getElementById("submit-panier").addEventListener("click", (e) => {
  //---------- affichage du message erreur ----------//
  if (checkEmptyInputs() == 0 || testInputData(regexGeneral, firstname, "*prénom invalide") == 0 || testInputData(regexEmail, email, "*email invalide") == 0 || testInputData(regexGeneral, lastname, "*nom invalide") == 0 || testInputCp() == 0 || testInputData(regexGeneral, city, "*ville invalide") == 0) {
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

// function sendOrder(e) {
//   // e.preventDefault();
//   testInputData(regexEmail, email, "*email invalide");
//   testInputData(regexGeneral, city);
//   testInputCp();
//   testInputData(regexGeneral, lastname, "*nom invalide");
//   testInputData(regexGeneral, firstname, "*prénom invalide");
//   checkEmptyInputs();
//   //---------- affichage du message erreur ----------//
//   if (erreur) {
//     e.preventDefault();
//     document.getElementById("error-message").innerHTML = erreur;
//     return false;
//   }

//   // ---------- création du contact ----------//
//   let contact = {
//     firstName: firstname.value,
//     lastName: lastname.value,
//     address: address.value,
//     cp: cp.value,
//     city: city.value,
//     email: email.value,
//   };

//   //---------- envois des éléments vers l'api et récupération de l'orderId ----------//
//   fetch("http://localhost:3000/api/cameras/order", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ contact, products }),
//   })
//     .then((res) => {
//       return res.json();
//     })
//     .then((data) => {
//       localStorage.setItem("orderId", data.orderId);
//       localStorage.setItem("price", totalDisplay.innerHTML);
//       window.location.href = "confirmation-commande.html";
//     });

//   e.preventDefault();
// }
