// loadConfig().then(data => {
//   config = data;
  fetch("http://localhost:3000/api/cameras").then(data => data.json())
      .then(jsonListArticle => {
          for (let jsonArticle of jsonListArticle) {
              let article = new Article(jsonArticle);
              document.querySelector(".produit_main_content").innerHTML += `<div class="col-12 mt-5">
                                                                      <div class="card article">
                                                                          <div class="card-header">
                                                                              <h5 class="card-title d-flex justify-content-between">${article.name}<span class="publication-date">${article.getFormatedDate()}</span></h5>
                                                                          </div>
                                                                          <img src="${config.host}/${article.image}" class="card-img-top">
                                                                          <span class="fa-stack fa-2x addFavorite" data-id=${article.id}>
                                                                              <i class="fas fa-star fa-stack-1x"></i>
                                                                              <i class="far fa-star fa-stack-1x"></i>
                                                                          </span>
                                                                          <div class="card-body">
                                                                              <p class="card-text">${article.description}</p>
                                                                          </div>
                                                                      </div>
                                                                  </div>
                                                                  `;
          }

          // document.querySelectorAll(".addFavorite").forEach(star => {
          //     star.addEventListener("click", function() {
          //         if (this.className.indexOf("activated") != -1) {
          //             this.setAttribute("class", "fa-stack fa-2x addFavorite");
          //             removeFavorites(this.dataset.id);
          //         } else {
          //             this.setAttribute("class", "fa-stack fa-2x addFavorite activated");
          //             addFavorites(this.dataset.id);
          //         }
          //     });
          // });
      });
// });

/*
fetch("http://localhost:3000/api/cameras")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(data) {
    console.log(data);
  })
  .catch(function(err) {
    console.log("erreur api")
  });
*/


//fin methode 4



/*
//methode 3
document.body.onload = addElement;

function addElement () {
  //création de l'élément
  var newH2 = document.createElement("h2");
  //contenu de l'élément
  var newName = cameras[0].name;
  console.log(newName);
  //ajout du noeud texte au nouvel élément
  newH2.textContent = newName;

  //ajout du tout dans le DOM
  var currentH2 = document.getElementsByClassName('camName');
  currentH2.appendChild(newH2);
};
console.log(newH2);
//fin methode 3
*/

//methode 2
/*
function camera () {
  for (let i = 0; i < cameras.length; i++) {
    let img = cameras[i].img;
    let name = cameras[i].name;
    let description = cameras[i].description;
    let id = cameras[i]._id;
    let price = cameras[i].price;
  }
}
function newArticle () {
  document.createElement("article").innerHTML = camera()
}
console.log(camera)
*/
//fin methode 2


//methode 1
/*
function camera(img, name, id, description, price){
  this.img = img;
  this.id = id;
  this.name = name;
  this.description = description;
  this.price = price;
};

let cameras = [];

const cam1 = new camera("/images/vcam_1.jpg", "Zurss 50S", "5be1ed3f1c9d44000030b061", "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", 49900)
const cam2 = new camera("/images/vcam_2.jpg", "Hirsch 400DTS", "5be1ef211c9d44000030b062", "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", 309900)
const cam3 = new camera("/images/vcam_3.jpg", "Franck JS 105", "5be9bc241c9d440000a730e7", "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", 209900)
const cam4 = new camera("/images/vcam_4.jpg", "Kuros TTS", "5be9c4471c9d440000a730e8", "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", 159900)
const cam5 = new camera("/images/vcam_5.jpg", "Katatone", "5be9c4c71c9d440000a730e9", "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", 59900)

cameras.push(cam1, cam2, cam3, cam4, cam5);
console.log(cameras);

function camerasList() {
  let listOfCameras = "";
  cameras.forEach(cam =>
    listOfCameras += `
      <tr>
        <td><img src=${cam.img}></td>
        <td>
          <ul>
            <li>${cam.id}</li>
            <li>${cam.name}€</li>
            <li>${cam.description}€</li>
          </ul>
        </td>
        <td>${cam.price}€</td>
      </tr>
      `   
  )
  document.getElementById("main_content").innerHTML = listOfCameras;
  camerasList();
};
//fin methode 1
*/


/*
const vcam1 = document.querySelector(".vcam1");
const vcam2 = document.querySelector(".vcam2");
const vcam3 = document.querySelector(".vcam3");
const vcam4 = document.querySelector(".vcam4");
const vcam5 = document.querySelector(".vcam5");

let cible = document.querySelector(".produit_main_content");

//créer un élémént image, h2, p description, p price
let h2 = document.createElement("h2");
let description = document.createElement("p");
let price = document.createElement("p");

//créer contenu
h2.innerHTML = cameras[0].name;
description.innerHTML = cameras[0].description;
price.innerHTML = cameras[0].price;

console.log(cameras[0].price);
//relier le contenu
h2.appendChild(textH2);
description.appendChild(textDescription);
price.appendChild(textPrice);
cible.appendChild(h2, description, price);

console.log(cameras[0].price);
*/
/*
let cible = document.querySelector(".produit_main_content");


let img = createElement("img").src = "/images/" + cameras[0].imageUrl;
let h2 = document.createElement("h2").innerHTML = "<h2>" + cameras[0].name + "</h2>";
let description = document.createElement("p").innerHTML = "<p>" + cameras[0].description + "</p>";
let price = document.createElement("p").innerHTML = "<p>" + cameras[0].price / 100 + "€" + "</p>";

cible.appendChild(img, h2, description, price);*/