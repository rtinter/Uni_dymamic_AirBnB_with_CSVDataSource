
let fewo = JSON.parse(localStorage.getItem("fewo"));
let reviews = []

Papa.parse('reviews.csv', {
    download: true,
    header: true,
    skipEmptyLines: 'greedy',
    complete: (results) => {
        results.data.forEach(review => {
            if (review.listing_id === fewo.id) {
                reviews.push(review)
            }
        });
        console.log(reviews)
    },
});








// Ueberschrift
let div = document.getElementById("ueberschrift")
div.innerHTML = ""
let innertext = ""
innertext += "<h1>" + fewo.name + "</h1>"
innertext += "<p>" + fewo.room_type + " - " + fewo.host_location + " - <span>" + fewo.price + "</span> - " + fewo.review_scores_rating + " &#9733 - " + fewo.number_of_reviews + " Bewertungen</p>"
div.innerHTML = innertext;






// Bewertungen





function bewertungen5() {
    let divAlle = document.getElementById("bewertung")
    divAlle.innerHTML = ""
    let weniger = document.getElementById("wenigerAnzeigen")
    if (weniger != null){
        weniger.remove()
    }
    for (let i = 0; i < 5; i++) {
        let divEinzel = "<div  class=\"item\"> <div class=\"bewerterdetails\">"
        divEinzel += "<span>" + reviews[i]["reviewer_name"] + "</span>"
        divEinzel += "<span>" + reviews[i]["date"] + "</span>"
        divEinzel += "</div><p>" + reviews[i]["comments"] + "</p></div> "
        divAlle.innerHTML += divEinzel
    }
    if (reviews.length >= 5) {
        divAlle.insertAdjacentHTML("afterend","<button id=\"alleAnzeigen\" class=\"button\" onclick=\"alleAnzeigen()\" >Alle Anzeigen</button>")
    }
}

function alleAnzeigen() {
    let divAlle = document.getElementById("bewertung")
    divAlle.innerHTML = ""
    document.getElementById("alleAnzeigen").remove()
    for (let i = 0; i < reviews.length; i++) {
        let divEinzel = "<div  class=\"item\"> <div class=\"bewerterdetails\">"
        divEinzel += "<span>" + reviews[i]["reviewer_name"] + "</span>"
        divEinzel += "<span>" + reviews[i]["date"] + "</span>"
        divEinzel += "</div><p>" + reviews[i]["comments"] + "</p></div> "
        divAlle.innerHTML += divEinzel
    }
    divAlle.insertAdjacentHTML("afterend","<button id=\"wenigerAnzeigen\" class=\"button\" onclick=\"bewertungen5()\" >weniger Anzeigen</button>")
}