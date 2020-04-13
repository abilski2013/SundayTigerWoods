var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
});
var layers = {
    Arsenic: new L.LayerGroup(),
    HAA5: new L.LayerGroup(),
    Nitrate: new L.LayerGroup(),
    PCE: new L.LayerGroup(),
    Radium: new L.LayerGroup(),
    TCE: new L.LayerGroup(),
    TTHM: new L.LayerGroup()
  };

var map = L.map("map", {
    center: [46.392410, -94.636230],
    zoom: 7,
    layers: [
        layers.Arsenic,
        layers.HAA5,
        layers.Nitrate,
        layers.PCE,
        layers.Radium, 
        layers.TCE, 
        layers.TTHM
      ]
});
lightmap.addTo(map);

var overlays = {
    "Arsenic": layers.Arsenic,
    "HAA5": layers.HAA5,
    "Nitrate": layers.Nitrate,
    "PCE": layers.PCE,
    "Radium": layers.Radium, 
    "TCE": layers.TCE, 
    "TTHM": layers.TTHM
  };

L.control.layers(null, overlays).addTo(map);
var geoData = "../static/data/mn_water_data-coord.geojson";

d3.json(geoData).then(function(data) {
    console.log(data);
    var analytes = data.features.properties; 
    console.log(analytes);
    Arsenic = L.choropleth(data, {
        valueProperty: "mean_value", 
        scale: ["#ffffb2", "#b10026"],
        steps: 10,

        mode: "q",
        style: {
            color: "#fff",
            weight: 1,
            fillOpacity: 0.8
    },
    filter: function(feature, layer) {
        if (feature.properties.analyteCode === "Arsenic") return true;
        else return false;
      },
    onEachFeature: function(feature, layer) {
        layer.bindPopup("County:  " + feature.properties.name + "<br>Contaminent level: <br>" +
          + feature.properties.mean_value+ " ug/l");
      }
    
    }).addTo(map);
  
});

