
let fewo = JSON.parse(localStorage.getItem("fewo"));
if (fewo.id === null)
    open("Fehler.html")
let reviews = []
let amenitiesArray = JSON.parse(fewo.amenities); // Hier wird der String geparst
let CalendarArray = []
const monate =["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"]

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
    },
});

Papa.parse('calendar.csv', {
    download: true,
    header: true,
    skipEmptyLines: 'greedy',
    complete: (results) => {
        results.data.forEach(dates => {
            if (dates.listing_id === fewo.id) {
                CalendarArray.push(dates)       //Hier sind alle objekte drin, welche der geklickten ID entsprechen
            }
        });
        updateCalendar(currentMonth, now.getFullYear())
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
            innerText_besonderheiten += "<p>" + amenitiesArray[i] + "</p>";

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


/* Es wird jahr und monat übergeben. Dann wird ein date objekt erstellt.
Die Objektargumente sind Jahr, Monat und der Tag des neuen Objekts wird auf 1 gesetzt.
Solange der monate in date der selbe ist wie der argumentmonat wird der Tag in das Array "dates" gepusht.
Das datearray wird ausgegeben => Es beinhaltet das komplette Datum ([Sat Apr 01 2023 00:00:00 GMT+0200 (Mitteleuropäische Sommerzeit) Wäre ein Element)
*/

function get_days_for_month(year, month) {
    let date = new Date(year, month, 1);
    let dates = [];
    let i = 0;
    while(date.getMonth() === month) {
        dates.push(new Date(date));
        date.setDate(date.getDate() + 1);
        i++;
    }
    return dates;
}

/*
Insgesamt wird werden wird hier das aktuelle Datum gesucht um damit dann sowohl akt. Monat, als auch akt. Jahr heraus
zu bekommen. Diese werden dann an die get_days_for_month funktion übergeben. So finden wir den aktuellen Monat,
das aktuelle Jahr und die anzahl der Tage des monats heraus und schmeißen sie in ein array
*/

const now = new Date() // das aktuelle Datum und Uhrzeit
let currentMonth = now.getMonth() // der aktuelle Monat (0-11)
let currentYear = now.getFullYear() // der aktuelle Tag des Monats (1-31)
let days = get_days_for_month(currentYear, currentMonth)  // Objekt des jeweiligen Tages

function monatVor(){
    currentMonth+=1
    if (currentMonth === 12){
        currentMonth=0
        currentYear+=1
    }
    days = get_days_for_month(currentYear, currentMonth)
}

function monatZurueck(){
    currentMonth-=1
    if (currentMonth === -1){
        currentMonth=11
        currentYear-=1
    }
    days = get_days_for_month(currentYear, currentMonth)
}




function updateCalendar(month, year) {


    let availabilityArray = [];
    let price = [];

    for (const date of days) {
        let suche = CalendarArray.find(suche => {
            const d = new Date(suche.date);
            return d.getDate() == date.getDate() && d.getFullYear() == date.getFullYear();
        });



        if (suche.available !== undefined) {
            availabilityArray.push(suche.available)
            console.log(suche.available)
        }
        else {
            availabilityArray.push("f")
        }
        if (suche.price !== undefined) {
            price.push(suche.price)
        }
        else {
            availabilityArray.push("?")
        }
    }

    document.getElementById("monthYear").innerHTML= monate[currentMonth]+" "+ String(currentYear);


    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const cells = document.querySelectorAll('table tbody td');

    let day = 1;
    for (let i = 0; i < cells.length; i++) {
        cells[i].className = "";
        if (i < firstDayOfMonth) {
            cells[i].textContent = '';

        } else if (day <= daysInMonth) {

            cells[i].textContent = day;
            
            pricefürtag=price[day-1]
            if(availabilityArray[day-1] === "t") {
                cells[i].className = "verfuegbar"
                cells[i].addEventListener('click', function() {
                    alert(pricefürtag);
                });
            }else{
                cells[i].className = "nicht_verfuegbar"
            }
            day++;


        } else {
            cells[i].textContent = '';

        }
    }
}





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
