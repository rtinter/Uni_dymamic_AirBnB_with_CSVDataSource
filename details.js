
let fewo = JSON.parse(localStorage.getItem("fewo"));
let reviews = []
let amenitiesArray = JSON.parse(fewo.amenities); // Hier wird der String geparst

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


// Bild und Gastgeberdetails

let detailbilder = document.getElementById("bildDetails")
detailbilder.innerHTML = ""
let innerText_detailbilder = "<div class=\"col_links\">"
innerText_detailbilder += "<img src=\"" + fewo.picture_url + "\">"
innerText_detailbilder += "</div>"
innerText_detailbilder += "<div class=\"col_rechts\">"
innerText_detailbilder += "<img src=\"" + fewo.host_thumbnail_url + "\">"
innerText_detailbilder += "<br>" + "<h4>Gastgeber:in ist:" + fewo.host_name + "</h4>"
innerText_detailbilder += "<br>" + "<p>Antwortrate: " + fewo.host_response_rate + "<p>Antwortzeit: "
innerText_detailbilder += fewo.host_response_time + "</p>" + "<p>Akzeptanzrate: " + fewo.host_acceptance_rate + "</p>"
innerText_detailbilder += "<p>" + fewo.accommodates + " Gäste - " + fewo.bedrooms + " Schlafzimmer - "
innerText_detailbilder += fewo.beds + " Betten - " + fewo.bathrooms_text + "</p></div>"
detailbilder.innerHTML = innerText_detailbilder



//Details über die Unterkunft

let ueberUnterkunft = document.getElementById("ueber_Unterkunft")
ueberUnterkunft.innerHTML = ""
let innerText_ueberUnterkunft = "<p>" + fewo.description + "</p>"
ueberUnterkunft.innerHTML = innerText_ueberUnterkunft



//Besonderheiten + Array ==>>>>>> nochmal schauen, welches wir nehmen - ggf button für mehr einbauen


function besonderheiten1() {

    let besonderheiten = document.getElementById("besonderheiten")
    besonderheiten.innerHTML = ""
    let innerText_besonderheiten = "<h2>Besonderheiten:</h2>"
    /*Mit forEach Leider bei vielen Wohnungen zuviele Angezeigt

    amenitiesArray.forEach(element => {
        innerText_besonderheiten += "<p>" + element + "</p>"
    })
    */

    // Auf 10 Limitiert mit for - Schleife
    if (amenitiesArray != undefined) {
        for (let i = 0; i < 10; i++) {
            innerText_besonderheiten += "<p>" + amenitiesArray[i] + "</p>";  //  !!!!!!!!!!!!!!!!!!!! HIER WIRD ÜBER DAS ARRAY GEGANGEN UND AUSGEGEBEN
            // Ohne das, geht es nicht, da ich so nicht über einen STRING gehen kann.
            //Vielleicht wieder zurück mit Stringify
        }

        if (amenitiesArray.length > 10) {
            innerText_besonderheiten += "<p> -- und mehr! -- </p>"
        }
    } else {
        innerText_besonderheiten = " keine Besonderheiten Vorhanden!"
    }
    besonderheiten.innerHTML = innerText_besonderheiten
}





//Kalender sachen ma schaun

const now = new Date(); // das aktuelle Datum und Uhrzeit
const currentMonth = now.getMonth(); // der aktuelle Monat (0-11)
const currentDate = now.getDate(); // der aktuelle Tag des Monats (1-31)


function updateCalendar(month, year) {
    // hier können Sie eine Datenquelle abrufen, um die Belegungen und Preise für den angegebenen Monat und das Jahr zu erhalten
    
    // berechnen Sie die Anzahl der Tage im angegebenen Monat und Jahr
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // finden Sie den ersten Tag des Monats (0 = Sonntag, 1 = Montag, usw.)
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    // finden Sie die Tabellenzellen für jeden Tag des Monats
    const cells = document.querySelectorAll('table tbody td');
    
    // aktualisieren Sie die Tabellenzellen für jeden Tag des Monats
    let day = 1;
    for (let i = 0; i < cells.length; i++) {
      // wenn wir noch nicht am ersten Tag des Monats sind, lassen Sie die Zelle leer
      if (i < firstDayOfMonth) {
        cells[i].textContent = '';
      } else if (day <= daysInMonth) {
        // ansonsten fügen Sie den Tag in die Zelle ein
        cells[i].textContent = day;
        day++;
      } else {
        // wenn wir das Ende des Monats erreicht haben, lassen Sie die restlichen Zellen leer
        cells[i].textContent = '';
      }
    }
  }
  
  // rufen Sie die Funktion auf, um den Kalender für den aktuellen Monat zu aktualisieren
  updateCalendar(currentMonth, now.getFullYear());
  












// Map

let mapDiv = document.getElementById("map");

let innerText_newmap = "<iframe width=\"300\" height=\"450\" src=\"https://maps.google.com/maps?q=" + fewo.latitude + "," + fewo.longitude + "&hl=de&z=14&amp;output=embed\"></iframe>";

mapDiv.innerHTML = innerText_newmap





// Bewertungen



function bewertungen5() {
    let divAlle = document.getElementById("bewertung")
    divAlle.innerHTML = ""
    let weniger = document.getElementById("wenigerAnzeigen")
    if (weniger != null) {
        weniger.remove()
    }

    if (reviews.length != 0) {
        if (reviews.length >= 5) {
            for (let i = 0; i < 5; i++) {
                let divEinzel = "<div  class=\"item\"> <div class=\"bewerterdetails\">"
                divEinzel += "<span>" + reviews[i]["reviewer_name"] + "</span>"
                divEinzel += "<span>" + reviews[i]["date"] + "</span>"
                divEinzel += "</div><p>" + reviews[i]["comments"] + "</p></div> "
                divAlle.innerHTML += divEinzel
            }
            divAlle.insertAdjacentHTML("afterend", "<button id=\"alleAnzeigen\" class=\"button\" onclick=\"alleAnzeigen()\" >Alle Anzeigen</button>")
        } else {
            for (let i = 0; i < reviews.length; i++) {
                let divEinzel = "<div  class=\"item\"> <div class=\"bewerterdetails\">"
                divEinzel += "<span>" + reviews[i]["reviewer_name"] + "</span>"
                divEinzel += "<span>" + reviews[i]["date"] + "</span>"
                divEinzel += "</div><p>" + reviews[i]["comments"] + "</p></div> "
                divAlle.innerHTML += divEinzel
            }
        }
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
    divAlle.insertAdjacentHTML("afterend", "<button id=\"wenigerAnzeigen\" class=\"button\" onclick=\"bewertungen5()\" >weniger Anzeigen</button>")
}