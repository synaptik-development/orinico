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
    document.querySelector("#produit").innerHTML += `
      <article class="container border-primary shadow p-3" id="${camera._id}">
        <div class="row px-3">
          <img src="${camera.imageUrl}" class="col img-thumbnail">

          <div class="col product-caption">
            <h2>${camera.name}</h2>
            <p>${camera.description}</p>

            <form id="form-produit">
              <label for="options">Options :</label>
              <select name="options" id="options">
                <option value="">--choisissez une lentille--</option>
              </select>
            </form>

            <strong>prix : ${camera.price / 100} €</strong>

            <div class="row">
              <button class="btn btn-primary" type="submit" id="add-camera">
                AJOUTER AU PANIER
              </button>
            </div>
          </div>
      </article>
    `;

    //---------- affichage des options ----------//
    for (let option of camera.lenses) {
      document.querySelector("#options").innerHTML += `<option value="${option}">${option}</option>`;
    }

    document.getElementById("add-camera").addEventListener("click", (e) => {
      e.preventDefault();
      
      // const optionSelected = elementSelected("#options");

      // const lineProduct = new Article(camera.name, camera._id,  optionSelected, camera.imageUrl, camera.price / 100, 1);
      let lineProduct = {
        productName: camera.name,
        id: camera._id,
        price: camera.price / 100,
        img: camera.imageUrl,
        lenses: elementSelected("#options"),
        quantity: 1,
      };
      product.push(lineProduct);

      insertInShoppingCart();
    });
  })
  .catch(function () {
    console.log("erreur api");
  });
