/* affichage du numéro de commande */
document.querySelector(".command-id").innerHTML = " " + localStorage.orderId;

/* affichage du montant total de la commande */
document.querySelector(".command-total").innerHTML = " " + localStorage.price;

/* nettoyage du local storage */
localStorage.clear();
