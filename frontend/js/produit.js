// recupération de ?id (?id=5be1ed3f1c9d44000030b061)
let searchParams = new URLSearchParams(window.location.search);
let id = searchParams.get("id");

let product = [];

//---------------------------------------------------------------------------------------------//
// gestion de l'affichage dans la page produit
//---------------------------------------------------------------------------------------------//
fetch("http://localhost:3000/api/cameras/" + id)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then((camera) => {
    let Product = {
      productName: camera.name,
      id: camera._id,
      price: camera.price / 100,
      img: camera.imageUrl,
      lenses: camera.lenses,
      quantity: 1,
    };
    product.push(Product);
    document.querySelector(".produit_main").innerHTML += `<article class="produit_article" id="${camera._id}">
      <img src="${camera.imageUrl}">
      <div class="produit_article_caption">
          <div class="produit_article_title">
              <h2 class="produit_article_h2">${camera.name}</h2>
              <p class="produit_article_price"><span>${camera.price / 100}</span> €</p>
          </div>
          <p class="produit_article_description">${camera.description}</p>

          <form id="form-produit">
            <label for="options">Options :</label>
            <select name="options" id="options">
                <option value="">--choisissez une lentille--</option>
            </select>
          </form>

          <button class="btn" type="submit" id="add-camera" onclick="insertInShoppingCart()">AJOUTER AU PANIER</button>
      </div>
    </article>`;

    //---------- affichage des options ----------//
    for (let option of camera.lenses) {
      document.querySelector("#options").innerHTML += `<option value="${option}">${option}</option>`;
    }
  })
  .catch(function () {
    console.log("erreur api");
  });
