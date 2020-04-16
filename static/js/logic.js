var map = L.map("map", {
    center: [46.7296, -94.6859],
    zoom: 7
  });
  
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  }).addTo(map);
 
   var link = "../static/data/MN-county-boundaries.geojson";
  
  d3.json(link, function(data) {
    L.geoJson(data, {
        onEachFeature: function(feature, layer) {
 
            layer.on({
              mouseover: function(event) {
                layer = event.target;
                layer.setStyle({
                  fillOpacity: .9
                });
              },
              mouseout: function(event) {
                layer = event.target;
                layer.setStyle({
                  fillOpacity: 0.2
                });
              },
            });
        
            layer.bindPopup("<h1>" + feature.properties.namelsad + "</h1>");
      
          }
    }
        ).addTo(map);
  });

