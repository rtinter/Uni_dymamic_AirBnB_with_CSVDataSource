
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








// Ueberschrift
    let div = document.getElementById("ueberschrift")
    div.innerHTML = ""
    let innertext = ""
    innertext += "<h1>" + fewo.name + "</h1>"
    innertext += "<p>" + fewo.room_type + " - " + fewo.host_location + " - <span>" + fewo.price + "</span> - " + fewo.review_scores_rating + " &#9733 - " + fewo.number_of_reviews + " Bewertungen</p>"
    div.innerHTML = innertext;


    // Bild und Gastgeberdetails








// Bewertungen



{/* <div class="item">
<div class="bewerterdetails">
  <img
    src="https://a0.muscache.com/im/pictures/user/9b6a1728-d217-4ad8-9a01-79681f9f1241.jpg?aki_policy=profile_large"
    alt="Bild einer jungen Frau">
  <span>Anette</span>
  <span>März 2023</span>
  <p>4.9 &#9733;</p>

</div>
<p>Wir hatten einen fantastischen Aufenthalt. Was für ein schönes, gepflegtes Haus mit einem unglaublichen
  Blick. Sara war sehr aufmerksam und hilfsbereit.</p>
</div> */}


