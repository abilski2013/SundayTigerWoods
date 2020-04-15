var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
});


var geoData = "../static/data/mn_water_data-coord.geojson";

d3.json(geoData).then(function(data) {
    console.log(data);



    Arsenic = L.choropleth(data, {
        valueProperty: "mean_value", 
        scale: ["#E0F7FA", "#0D47A1"],
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
        layer.bindPopup("Contaminant: "+ feature.properties.analyteCode+ " <br>County:  " + feature.properties.name + "<br>Contaminent level: <br>" +
          + feature.properties.mean_value+ " ug/l");
      }
    
    });
    HAA5 = L.choropleth(data, {
      valueProperty: "mean_value", 
      scale: ["#E0F7FA", "#0D47A1"],
      steps: 10,

      mode: "q",
      style: {
          color: "#fff",
          weight: 1,
          fillOpacity: 0.8
  },
  filter: function(feature, layer) {
      if (feature.properties.analyteCode === "HAA5") return true;
      else return false;
    },
  onEachFeature: function(feature, layer) {
      layer.bindPopup("Contaminant: "+ feature.properties.analyteCode+ "<br>County:  " + feature.properties.name + "<br>Contaminent level: <br>" +
        + feature.properties.mean_value+ " ug/l");
    }
  
  });

    Nitrate = L.choropleth(data, {
    valueProperty: "mean_value", 
    scale: ["#E0F7FA", "#0D47A1"],
    steps: 10,

    mode: "q",
    style: {
        color: "#fff",
        weight: 1,
        fillOpacity: 0.8
},
filter: function(feature, layer) {
    if (feature.properties.analyteCode === "Nitrate") return true;
    else return false;
  },
onEachFeature: function(feature, layer) {
    layer.bindPopup("Contaminant: "+ feature.properties.analyteCode+ "<br>County:  " + feature.properties.name + "<br>Contaminent level: <br>" +
      + feature.properties.mean_value+ " mg/l");
  }
});
  PCE = L.choropleth(data, {
    valueProperty: "mean_value", 
    scale: ["#E0F7FA", "#0D47A1"],
    steps: 10,

    mode: "q",
    style: {
        color: "#fff",
        weight: 1,
        fillOpacity: 0.8
},
filter: function(feature, layer) {
    if (feature.properties.analyteCode === "PCE") return true;
    else return false;
  },
onEachFeature: function(feature, layer) {
    layer.bindPopup("Contaminant: "+ feature.properties.analyteCode+ "<br>County:  " + feature.properties.name + "<br>Contaminent level: <br>" +
      + feature.properties.mean_value+ " ug/l");
  }
});
  Radium = L.choropleth(data, {
  valueProperty: "mean_value", 
  scale: ["#E0F7FA", "#0D47A1"],
  steps: 10,

  mode: "q",
  style: {
      color: "#fff",
      weight: 1,
      fillOpacity: 0.8
},
filter: function(feature, layer) {
  if (feature.properties.analyteCode === "Radium") return true;
  else return false;
},
onEachFeature: function(feature, layer) {
  layer.bindPopup("Contaminant: "+ feature.properties.analyteCode+ "<br>County:  " + feature.properties.name + "<br>Contaminent level: <br>" +
    + feature.properties.mean_value+ " pCi/l");
}
});
  TCE = L.choropleth(data, {
  valueProperty: "mean_value", 
  scale: ["#E0F7FA", "#0D47A1"],
  steps: 10,

  mode: "q",
  style: {
      color: "#fff",
      weight: 1,
      fillOpacity: 0.8
},
filter: function(feature, layer) {
  if (feature.properties.analyteCode === "TCE") return true;
  else return false;
},
onEachFeature: function(feature, layer) {
  layer.bindPopup("Contaminant: "+ feature.properties.analyteCode+ "<br>County:  " + feature.properties.name + "<br>Contaminent level: <br>" +
    + feature.properties.mean_value+ " ug/l");
}
});
  TTHM = L.choropleth(data, {
  valueProperty: "mean_value", 
  scale: ["#E0F7FA", "#0D47A1"],
  steps: 10,

  mode: "q",
  style: {
      color: "#fff",
      weight: 1,
      fillOpacity: 0.8
},
filter: function(feature, layer) {
  if (feature.properties.analyteCode === "TTHM") return true;
  else return false;
},
onEachFeature: function(feature, layer) {
  layer.bindPopup("Contaminant: "+ feature.properties.analyteCode+ "<br>County:  " + feature.properties.name + "<br>Contaminent level: <br>" +
    + feature.properties.mean_value+ " ug/l");
}
});

Uranium = L.choropleth(data, {
  valueProperty: "mean_value", 
  scale: ["#E0F7FA", "#0D47A1"],
  steps: 10,

  mode: "q",
  style: {
      color: "#fff",
      weight: 1,
      fillOpacity: 0.8
},
filter: function(feature, layer) {
  if (feature.properties.analyteCode === "Uranium") return true;
  else return false;
},
onEachFeature: function(feature, layer) {
  layer.bindPopup("Contaminant: "+ feature.properties.analyteCode+ "<br>County:  " + feature.properties.name + "<br>Contaminent level: <br>" +
    + feature.properties.mean_value+ " ug/l");
}
});
  var overlays= {
    Arsenic: Arsenic,
    HAA5: HAA5,
    Nitrate: Nitrate,
    PCE: PCE,
    Radium: Radium,
    TCE: TCE,
    TTHM: TTHM,
    Uranium: Uranium
  };

  
  var map = L.map("map", {
    center: [46.392410, -94.636230],
    zoom: 6,
    layers: [
        lightmap,
        Arsenic
        
      ]
});

  L.control.layers(overlays,null).addTo(map);   
});

