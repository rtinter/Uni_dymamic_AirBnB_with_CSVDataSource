
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

    let detailbilder = document.getElementById("bildDetails")
    detailbilder.innerHTML = ""
    let innerText_detailbilder = "<div class=\"col_links\">"
    innerText_detailbilder += "<img src=\"" + fewo.picture_url + "\">"
    innerText_detailbilder += "</div>"
    innerText_detailbilder += "<div class=\"col_rechts\">"
    innerText_detailbilder += "<img src=\"" + fewo.host_thumbnail_url + "\">"
    innerText_detailbilder += "<br>" + "<h4>Gastgeber:in ist:" + fewo.host_name + "</h4>"
    innerText_detailbilder += "<br>" + "<p>Antwortrate: " + fewo.host_response_rate + "<p>Antwortzeit: "
    innerText_detailbilder += fewo.host_response_time +"</p>" + "<p>Akzeptanzrate: " + fewo.host_acceptance_rate + "</p>"
    innerText_detailbilder += "<p>" + fewo.accommodates + " Gäste - " + fewo.bedrooms + " Schlafzimmer - "
    innerText_detailbilder += fewo.beds + " Betten - " + fewo.bathrooms_text + "</p></div>"
    detailbilder.innerHTML = innerText_detailbilder


        /*    <div id="bildDetails" class="row_bilder">
        //       <div class="col_links">
        //           <img src="https://a0.muscache.com/im/pictures/8255bdb1-1d65-4325-a744-6487dc51453b.jpg?im_w=1200" alt="">
        //         </div>
        //
        //         <div class="col_rechts">
        //           <img src="https://a0.muscache.com/im/pictures/user/ca347614-0549-40bf-86a5-36150d1e2386.jpg?im_w=240">
        //           <br>
        //           <h4>Privatunterkunft · Gastgeber:in ist Sara</h4>
        //           <br>
        //           <p>Sprachen: Nederlands, English, Français, Norsk, Español</p>
        //           <p>Antwortrate: 100%</p>
        //           <p>Antwortzeit: innerhalb einer Stunde</p>
        //           <br>
        //           <p>8 Gäste - 4 Schlafzimmer - 5 Betten - 3,5 Bäder</p>
        //
        //
        //         </div>
        //
        //     </div>
        */







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


