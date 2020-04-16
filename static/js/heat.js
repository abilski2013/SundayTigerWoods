var myMap = L.map("heat_map", {
  center: [46.39, -94.64],
  zoom: 5
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

d3.json("/income").then(function(income_sanitized) {

    var numb = Math.round(income_sanitized[0]['2017_per_capita_personal_income']/1000)
  console.log(numb);
    
  var heatArray = [];
    
    for (var i=0; i < income_sanitized.length; i++) {
        var numb = Math.round(income_sanitized[i]['2017_per_capita_personal_income']/1000);
        for (var j=0; j < numb; j++) {
            heatArray.push([income_sanitized[i].lat, income_sanitized[i].long]);
        }
    }
    
  console.log(heatArray);

  var heat = L.heatLayer(heatArray, {
    radius: 50,
    blur: 3
  }).addTo(myMap);

});
