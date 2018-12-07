// On encapsule l'interprétation de notre code JS dans une fonction déclenchée seulement quand la page est prête grâce à la fonction ready de JQuery.
$(document).ready(function() {
    var myTitle = document.getElementsByTagName("h1")[0];
    var changeTitleFunc = function() {
        myTitle.classList.add("main");
    }
    setTimeout(changeTitleFunc, 5000);

    setInterval(function() {
        var titleVisible = myTitle.style.visibility !== "hidden";
        if (titleVisible) {
            myTitle.style.visibility = "hidden";
        } else {
            myTitle.style.visibility = "visible";
        }
    }, 1000);

    // Code du chargement des données JSON
    function displayJSON(person) {
        // Remplir le div content avec les informations de la personne.
        var contentDiv = $("#content");
        // Création d'un élément HTML <h2>.
        var personH2 = $("<h2>" + person.firstname 
            + " " + person.lastname +"</h2>");
        // Ajout de l'élément dans la page, dans le div content.
        contentDiv.append(personH2);
    }

    function loadJSON() {
        // Envoi d'une requête XmlHTTPRequest vers le serveur.
        $.ajax({
            url: "person.json"
        }).done(function(content) {
            // Transformation de chaine de caractères à objet JavaScript.
            // Le JSON.parse est déjà effectué par JQuery : content est un objet.
            // var person = JSON.parse(content);
            console.log("Réponse du chargement reçue : ", content);
            displayJSON(content);
        });
        // La requête est partie, mais la réponse n'est pas encore reçue.
        console.log("Requête du chargement effectuée. En attente de la réponse...");
    }

    // Récupération du bouton load et enregistrement d'un "écouteur d'événements" (appelé "event handler" dans la documentation) sur l'événement click. 
    $("#load").click(function(event) {
        loadJSON();
    });
});