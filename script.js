document.addEventListener("DOMContentLoaded", function () {

  //DECLARATION DES VARIABLES
  var
  carousel = document.querySelector('.carousel'),
  figure = carousel.querySelector('figure'),
  nav = carousel.querySelector('nav'),
  numImages = figure.childElementCount,
  theta = 2 * Math.PI / numImages,
  currImage = 0;


  //CONTROLE DE L'ANIMATION DU CARROUSEL
  //on fait tourner les cartes grâce aux boutons "précédent" et "suivant" de nav
  nav.addEventListener('click', onClick, true);

  function onClick(e) {
    e.stopPropagation();
    var t = e.target;
    //Si on a cliqué sur le bouton "suivant" on incrémente la valeur de la variable currImage
    if (t.classList.contains('next')) {
      currImage++;
    } else if (t.classList.contains('prev')) //Si on a cliqué sur le bouton "précédent" on décrémente la valeur de la variable currImage
    {
      currImage--;
    } else if(t.classList.contains('add')){  //Si on a cliqué sur le bouton "Créer une catégorie" on affiche le formulaire
      document.querySelector("section.formu").classList.remove("form-invisible");
      document.querySelector("section.formu").classList.add("form-visible");
    } else
    return;

    //Ferme le formulaire
    document.querySelector("#close-formu").addEventListener("click", function (e) {
        document.querySelector("section.formu").classList.remove("form-visible");
        document.querySelector("section.formu").classList.add("form-invisible");
    });

    //Cette fonction fait tourner les images en fonction de la nouvelle valeur de currImage
    figure.style.transform = `rotateY(${currImage * -theta}rad)`;
  }


  //AFFICHE LA CARTE RETOURNE SOUS FORME DE FENETRE MODALE
  var image;
  image = document.querySelectorAll(".image-cliquable")
  image.forEach(function (element) {
      element.addEventListener("click", function (e) {
        document.querySelector("div.popup").classList.remove("popup-invisible")
        document.querySelector("div.popup").classList.add("popup-visible")
            
        // On récupère l'id de l'image qui a été cliquée, on utilise cet id pour retrouver les éléments de l'analogie à insérerer dans la fenêtre modale
        var id;
        id = e.target.getAttribute("id");
        document.querySelector(".description").innerHTML = "<h2 class='titrecarte'>Si j’étais " + data[id].analogie + ", je serais " + data[id].valeurAnalogie + "</h2>"
                                                          + "<section class= 'explication'>"+ data[id].explication + "</section>"
                                                          + "<img class= 'imagecarteretourne' src=" +  data[id].image + " alt=''>"
                                                              
      })
  });
  
  //Fermeture de la fenêtre modale
  var elementHTML;
      elementHTML = document.querySelector(".cache-fenetre");
      elementHTML.addEventListener("click", function () {
          document.querySelector("div.popup").classList.remove("popup-visible")
          document.querySelector("div.popup").classList.add("popup-invisible")
      });


  //POPUP MENTION LEGALES
  //ouverture de la fenêtre modale contenant les mentions légales
  document.querySelector(".mentions-legales").addEventListener("click", function (e) {
    document.querySelector("div.popup2").classList.remove("popup2-invisible")  
    document.querySelector("div.popup2").classList.add("popup2-visible")
  });
  
  //fermeture des mentions légales
  document.querySelector("#close-ml").addEventListener("click", function (e) {
    document.querySelector("div.popup2").classList.remove("popup2-visible")
    document.querySelector("div.popup2").classList.add("popup2-invisible")
  });


  //RECUPERATION DES DONNEES SAISIES DANS LE FORMULAIRE POUR PREVISUALISATION
  //Les données qui sont saisies dans le formulaires sont reportés dans le tableau
  //de donnée du fichier data.js dans le 7ème élément du tableau qui correspond à la carte numéro 7
  document.querySelector("#analogie").addEventListener('keyup',function () {
    data[7].analogie = document.querySelector("#analogie").value;
  });

  document.querySelector("#valeurAnalogie").addEventListener('keyup',function () {
    data[7].valeurAnalogie = document.querySelector("#valeurAnalogie").value;
  });

  document.querySelector("#explication").addEventListener('keyup',function () {
    data[7].explication = document.querySelector("#explication").value;
  });

  document.querySelector("#imganalogie").addEventListener('keyup',function () {
    data[7].image = document.querySelector("#imganalogie").value;
  });


  //API
  document.querySelector('#sub').addEventListener('click', function (e) {
    e.preventDefault();

    var urlVisitee = "https://perso-etudiant.u-pem.fr/~gambette/portrait/api.php?format=json&login=vincent.gilbert"
                    + "&courriel=" + document.querySelector("#mail").value
                    + "&message=Si j'étais..." + document.querySelector("#analogie").value
                    + ", je serais ..." + document.querySelector("#valeurAnalogie").value
                    + "parce que ..." + document.querySelector("#explication").value
                    + "image : " + document.querySelector("#imganalogie").value;

    fetch(urlVisitee).then(function(response) {
      response.json().then(function(data){
        console.log("Réponse reçue : ")
        console.log(data);
    })});                    
  });

});