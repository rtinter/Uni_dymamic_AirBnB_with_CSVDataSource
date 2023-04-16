

Papa.parse('listings.csv', {
    download: true,
    header: true,
    skipEmptyLines: 'greedy',
    complete: (results) => {
      createEntdecken(results.data);
    },
  });

function onFilter () {
  Papa.parse('listings.csv', {
      download: true,
      header: true,
      skipEmptyLines: 'greedy',
      complete: (results) => {
        filtern(results.data);
      },
    });
}



function filtern(data){
  let price = parseInt(document.getElementById("maxPreis").value);
  let stars = parseInt(document.getElementById("rating").value);
  let newlist = []
      for(let i=0 ;i<data.length;i++){
          pricestring=data[i]["price"]
          if(pricestring!==undefined)
          dataprice=parseFloat(pricestring.replace(/[^\d.]/g, ""));
          datastars=parseFloat(data[i]["review_scores_rating"])
          

          if(dataprice<=price && datastars>=stars){
              newlist.push(data[i])
          }
      }
  createEntdecken(newlist)
}



function createEntdecken (data) {
  let anzeige = document.getElementById("FewoListe")
  anzeige.innerHTML="";
  for (let i = 0; i<100;i++){
      let div = "<div class=\"colums1\">";
      div += "<img src=\""+data[i]["picture_url"]+"\">";
      div += "<h5>"+data[i]["name"]+"</h5>"
      div += "<p>"+data[i]["room_type"]+"</p>"
      div += "<p>"+data[i]["host_name"]+"</p>"
      div += "<p>"+data[i]["price"]+"</p>"
      div += "<span>"+data[i]["review_scores_rating"]+" &#9733;</span>"
      div += "<p>"+data[i]["number_of_reviews"]+"</p>"
      div += "</div> <br>"
      anzeige.innerHTML += div
  }

}