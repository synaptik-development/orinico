//---------------------------------------------------------------------------------------------//
// gestion de l'affichage de la page d'accueil
//---------------------------------------------------------------------------------------------//
fetch("http://localhost:3000/api/cameras")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  // affichage des articles sur la page d'accueil //
  .then((cameraList) => {
    for (let camera of cameraList) {
      document.querySelector("#index-cards").innerHTML += `
      <div class="col">
        <article class="card border-primary shadow mx-auto h-100" id="${camera._id}">
          <img src="${camera.imageUrl}" class="card-img-top">
          <div class="card-body">
            <h2 class="card-title h4">${camera.name}</h2>
            <p class="card-text">${camera.description}</p>
            <strong class="price h4 px-4 shadow">${camera.price / 100} €</strong>
          </div>
          <a class="btn btn-primary" href="./produit.html?id=${camera._id}" role="button">voir le produit</a>
        </article>
      </div>
      `;
    }
  })
  .catch(function () {
    console.log("erreur api");
  });
