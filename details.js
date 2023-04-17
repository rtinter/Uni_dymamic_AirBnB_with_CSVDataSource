
let fewo = JSON.parse(localStorage.getItem("fewo"));
let reviews =[]

Papa.parse('reviews.csv', {
    download: true,
    header: true,
    skipEmptyLines: 'greedy',
    complete: (results) => {
       results.data.forEach(review => {
        if(review.listing_id === fewo.id){
        reviews.push(review)
        }
       });
        console.log(reviews)
    },
});


function test() {
    document.getElementById("test").innerHTML = JSON.stringify(fewo)
}


function erzeugedieueberschrift() {
    let div = document.getElementById("ueberschrift")
    div.innerHTML = ""
    let innertext = ""
    innertext += "<h1>" + fewo.name + "</h1>"
    innertext += "<p>" + fewo.room_type + " - " + fewo.host_location + " - <span>" + fewo.price + "</span> - " + fewo.review_scores_rating + " &#9733 - " + fewo.number_of_reviews + " Bewertungen</p>"
    div.innerHTML = innertext;
}


function erzeugeBild() {
    let div = document.getElementById("bildDetails")
    div.innerHTML = ""
    let innertext = ""
    innertext += "<h1>" + fewo.name + "</h1>"
    innertext += "<p>" + fewo.room_type + " - " + fewo.host_location + " - <span>" + fewo.price + "</span> - " + fewo.review_scores_rating + " &#9733 - " + fewo.number_of_reviews + " Bewertungen</p>"
    div.innerHTML = innertext;
}