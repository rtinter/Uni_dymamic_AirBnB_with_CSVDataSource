let entdeckenListe;
let filterliste;

Papa.parse('listings.csv', {
    download: true,
    header: true,
    skipEmptyLines: 'greedy',
    complete: (results) => {
        entdeckenListe = results.data
        filterliste = results.data
        createEntdecken(results.data);
    },
});





function filtern() {
    let price = parseFloat(document.getElementById("maxPreis").value);
    let stars = parseFloat(document.getElementById("rating").value);
    let name = document.getElementById("name").value.toUpperCase()
    let typ = document.getElementById("type").value.toUpperCase()
    let Stadtteil = document.getElementById("stadtteil").value.toUpperCase()
    let newlist = []
    let data = entdeckenListe;

    for (let i = 0; i < data.length; i++) {
        priceString = data[i]["price"]
        if (priceString !== undefined)
            dataPrice = parseFloat(priceString.replace(/[^\d.]/g, ""));
        dataStars = parseFloat(data[i]["review_scores_rating"])
        if (data[i]["name"] !== undefined)
            dataName = data[i]["name"].toUpperCase()
        if (data[i]["property_type"] !== undefined)
            dataTyp = data[i]["property_type"].toUpperCase()
        if (data[i]["neighbourhood_cleansed"] !== undefined)
            dataStadtteil = data[i]["neighbourhood_cleansed"].toUpperCase()


        if (dataPrice <= price && dataStars >= stars && dataName.includes(name) && dataTyp.includes(typ) && dataStadtteil.includes(Stadtteil)) {
            newlist.push(data[i])
        }
    }

    newlist.sort(function (a, b) {
        if (parseFloat(a.price.replace(/[^\d.]/g, "")) < parseFloat(b.price.replace(/[^\d.]/g, ""))) return -1;
        if (parseFloat(a.price.replace(/[^\d.]/g, "")) > parseFloat(b.price.replace(/[^\d.]/g, ""))) return 1;
        return 0;
    });

    filterliste = newlist
    createEntdecken(newlist)
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



function createEntdecken(data) {
    let anzeige = document.getElementById("FewoListe")
    anzeige.innerHTML = "";
    for (let i = 0; i < 100; i++) {
        let div = "<div class=\"colums1\">";
        div += "<img src=\"" + data[i]["picture_url"] + "\">";
        div += "<h5>" + data[i]["name"] + "</h5>"
        div += "<p>" + data[i]["room_type"] + "</p>"
        div += "<p>" + data[i]["host_name"] + "</p>"
        div += "<p>" + data[i]["price"] + "</p>"
        div += "<span>" + data[i]["review_scores_rating"] + " &#9733;</span>"
        div += "<p>" + data[i]["number_of_reviews"] + " Bewertungen"+ "</p>"
        div += "</div> <br>"
        anzeige.innerHTML += div
    }

}

function storeData(JSONObject) {
  localStorage.setItem("fewo", JSONObject)
}
