//---------------------------------------------------------------------------------------------//
// gestion du panier (local storage)
//---------------------------------------------------------------------------------------------//

/*
 traiement panier vide (liens bloqués)
*/
function emptyPanier() {
  let panier = localStorage.panier;
  if (panier) {
    window.location.href = "panier.html";
  } else {
    alert("Votre panier est vide !");
  }
}

/* 
ajouter au panier 
*/
function insertInShoppingCart(lineProduct) {
  if (optionSelected() == "") {
    alert("Veuillez choisir une option !");
  } else {
    product.push(lineProduct);
    addArticle();
    if (confirm(`Article ajouté au panier. Voir mon panier.`)) {
      window.location.href = "panier.html";
    } else {
      window.location.href = "index.html";
    }
  }
}

/*
récupération de l'option sélectionnée 
*/
function optionSelected() {
  const list = document.querySelector("#options");
  return list[options.selectedIndex].value;
}

/* 
gestion des quantités 
*/
function addArticle() {
  const storage = localStorage.panier;
  // création de l'article //
  let article = product[0];

  // si localstorage est vide création du panier et envois de l'article //
  if (!storage) {
    panier = [];
    panier.push(article);
    localStorage.setItem("panier", JSON.stringify(panier));
  }
  // sinon //
  else {
    // check si le modèle courant est absent on l'envoi dans le panier //
    let parsePanier = JSON.parse(storage);
    const modelExist = parsePanier.find((article) => article._id == id && article._lenses == optionSelected());
    if (!modelExist) {
      parsePanier.push(article);
    }
    // si il est dans le tableau, on l'incrémente //
    else {
      for (let index in parsePanier) {
        if (parsePanier[index]._id == id && parsePanier[index]._lenses == optionSelected()) {
          parsePanier[index]._quantity++;
        }
      }
    }

    // envoi du panier dans localstorage //
    localStorage.setItem("panier", JSON.stringify(parsePanier));
  }
}

//---------------------------------------------------------------------------------------------//
// gestion du formulaire
//---------------------------------------------------------------------------------------------//

/* 
traitement qualité des champs
(email, firstname, lastname, city) 
*/
function testInputData(regexName, target, message) {
  if (regexName.test(target.value) == false) {
    erreur = message;
    target.style.border = "2px solid red";
    return 0;
  } else {
    return 1;
  }
}

/*
traitement qualité du champs (cp)
*/
function testInputCp(target) {
  if (target.length != 5) {
    erreur = "*code postal invalide !";
    cp.style.border = "2px solid red";
    return 0;
  } else {
    return 1;
  }
}

/*
traitement champs vides 
*/
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
