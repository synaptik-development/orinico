//---------------------------------------------------------------------------------------------//
// gestion de l'affichage de la page d'accueil
//---------------------------------------------------------------------------------------------//
fetch("http://localhost:3000/api/cameras")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  //---------- affichage des articles sur la page d'accueil ----------//
  .then((cameraList) => {
    for (let camera of cameraList) {
      document.querySelector(".main_content").innerHTML += `<a href="./produit.html?id=${camera._id}">
          <article class="main_article" id="${camera._id}">
              <img src="${camera.imageUrl}">
              <div class="main_article_caption">
                  <div class="main_article_title">
                    <h2 class="main_article_h2">${camera.name}</h2>
                    <p class="main_article_price">${camera.price / 100} €</p>
                  </div>
                  <p class="main_article_description">${camera.description}</p>
              </div>
          </article>
        </a>
      `;
    }
  })
  .catch(function () {
    console.log("erreur api");
  });
