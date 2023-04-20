let entdeckenListe;
let filterliste;

Papa.parse('listings.csv', {
    download: true,
    header: true,
    skipEmptyLines: 'greedy',
    complete: (results) => {
        entdeckenListe = results.data
        filterliste = results.data
        createEntdecken(results.data); //Bau der Seite mit allen Wohnungen
    },
});



function filtern() {
    let price = parseFloat(document.getElementById("maxPreis").value)  //momentaner Wert in float.
    let stars = parseFloat(document.getElementById("rating").value)
    let name = document.getElementById("name").value.toUpperCase()
    let typ = document.getElementById("type").value.toUpperCase()
    let Stadtteil = document.getElementById("stadtteil").value.toUpperCase()
    let newlist = []
    let data = entdeckenListe // Enthalten sind alle Daten der csv Datei

    let maxPrice = price || 10000;
    let minStars = stars || 0;

    for (let i = 0; i < data.length; i++) { //iteriert über die komplette Datenliste.
        let priceString = data[i]["price"]    //Alle "price" aus der Liste
        let dataPrice, dataStars, dataName, dataTyp, dataStadtteil

        if (priceString !== undefined) {
            dataPrice = parseFloat(priceString.replace(/[^\d.]/g, ""))
        }

        if (data[i]["review_scores_rating"] !== undefined) {
            dataStars = parseFloat(data[i]["review_scores_rating"])
        }

        if (data[i]["name"] !== undefined) {
            dataName = data[i]["name"].toUpperCase()
        }

        if (data[i]["property_type"] !== undefined) {
            dataTyp = data[i]["property_type"].toUpperCase()
        }

        if (data[i]["neighbourhood_cleansed"] !== undefined) {
            dataStadtteil = data[i]["neighbourhood_cleansed"].toUpperCase()
        }

        // logische Verbindung der filteroption maxprice / minstars
        if (dataPrice <= maxPrice && dataStars >= minStars && dataName.includes(name.toUpperCase()) && dataTyp.includes(typ.toUpperCase()) && dataStadtteil.includes(Stadtteil.toUpperCase())) {
            newlist.push(data[i]); //Push der gewählten optionen ins newlist Array
        }
    }


    newlist.sort(function (a, b) {
        if (parseFloat(a.price.replace(/[^\d.]/g, "")) < parseFloat(b.price.replace(/[^\d.]/g, ""))) return -1;
        if (parseFloat(a.price.replace(/[^\d.]/g, "")) > parseFloat(b.price.replace(/[^\d.]/g, ""))) return 1;
        return 0;
    });

    filterliste = newlist  // Weisen der filterlist (vorher alle Daten) => gefilterte Daten zu
    createEntdecken(newlist) //baue der gefilterten Entdeckenseite
}

function aufsteigendPrice() {
    filterliste.sort(function (a, b) {
        if (a.price !== undefined && b.price !== undefined) {
            if (parseFloat(a.price.replace(/[^\d.]/g, "")) < parseFloat(b.price.replace(/[^\d.]/g, ""))) return -1;
            if (parseFloat(a.price.replace(/[^\d.]/g, "")) > parseFloat(b.price.replace(/[^\d.]/g, ""))) return 1;
            return 0;
        }
    });
    createEntdecken(filterliste)
}

function absteigendPrice() {
    filterliste.sort(function (a, b) {
        if (a.price !== undefined && b.price !== undefined) {
            if (parseFloat(a.price.replace(/[^\d.]/g, "")) > parseFloat(b.price.replace(/[^\d.]/g, ""))) return -1;
            if (parseFloat(a.price.replace(/[^\d.]/g, "")) < parseFloat(b.price.replace(/[^\d.]/g, ""))) return 1;
            return 0;
        }
    });
    createEntdecken(filterliste)
}


function aufsteigendStars() {
    filterliste.sort(function (a, b) {
        if (a.review_scores_rating < b.review_scores_rating) return -1;
        if (a.review_scores_rating > b.review_scores_rating) return 1;
        return 0;
    });
    createEntdecken(filterliste)
}

function absteigendStars() {
    filterliste.sort(function (a, b) {
        if (a.review_scores_rating > b.review_scores_rating) return -1;
        if (a.review_scores_rating < b.review_scores_rating) return 1;
        return 0;
    });
    createEntdecken(filterliste)
}

function weiter (){
    anzeigeAnfang+= 100
    anzeigeEnde+=100
    createEntdecken(filterliste)
}

function zurueck (){
    anzeigeAnfang-= 100
    anzeigeEnde-=100
    createEntdecken(filterliste)
}

let anzeigeAnfang=0
let anzeigeEnde =100 

function createEntdecken(data) {
    let anzeige = document.getElementById("FewoListe")
    anzeige.innerHTML = "";
    if (anzeigeAnfang <0){
        anzeigeAnfang=0
        anzeigeEnde=100
        anzeige.innerHTML = "<h2 class=\"\"> Sie sind schon auf der ersten Seite</h2>"
    }

    if (anzeigeEnde>=data.length){
        anzeigeAnfang=data.length-101
        anzeigeEnde=data.length-1
        anzeige.innerHTML = "<h2>Das is die Letzte Seite mehr haben wir nicht ¯\\_(ツ)_/¯</h2>"
    }

    if (anzeigeAnfang<0){
        anzeigeAnfang=0
        anzeige.innerHTML = "<h2> Mehr haben wir leider nicht ¯\\_(ツ)_/¯</h2>"
    }


    for (let i = anzeigeAnfang; i < anzeigeEnde; i++) {  // Iterieren über die Anzahl der Wohnungen die zur Auswahl passen
        let div = "<div class=\"colums1\">";
        div += "<a href=\"Details.html\" onclick=\"storeData(" + data[i]["id"] + ")\">" + "<img loading=\"lazy\" src=\"" + data[i]["picture_url"] + "\">" + "</a>";
        div += "<h5>" + data[i]["name"] + "</h5>"
        div += "<p>" + data[i]["room_type"] + "</p>"
        div += "<p>" + data[i]["neighbourhood_cleansed"] + "</p>"
        div += "<p>" + data[i]["price"] + "</p>"
        div += "<span>" + data[i]["review_scores_rating"] + " &#9733;</span>"
        div += "<p>" + data[i]["number_of_reviews"] + " Bewertungen" + "</p>"
        div += "</div> <br>"
        anzeige.innerHTML += div
    }
        //Seeeeehr langer String für colums1 inkl. der geparsten Werte zur jeweiligen Wohnung
}

    //Übergabe in den storage als String
function storeData(id) {
    filterliste.forEach(fewo => {
        if (fewo.id == id) {
            localStorage.setItem("fewo", JSON.stringify(fewo))
        }
    });
}
