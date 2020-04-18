d3.json("/jsonified_two").then(function(data){
  var selector = [];
  for (i = 0; i < data.length; i++) {
      var county = data[i]["countyServed"];
      if (selector.includes(county) == false) {
          selector.push(county);
      }
  }
  console.log(selector);
  var select = document.getElementById("countySelect");
  for (var i = 0; i < selector.length; i++) {
      var opt = selector[i];
      var el = document.createElement("option");
      el.textContent = opt;
      el.value = opt;
      select.appendChild(el);
  }
  var years = [];
  for (i = 0; i < data.length; i++) {
      var year = data[i]["year"];
      if (years.includes(year) == false) {
          years.push(year);
      }
  }
  years.sort();
  console.log(years);
  var select = document.getElementById("yearSelect");
  for (var i = 0; i < years.length; i++) {
      var opt = years[i];
      var el = document.createElement("option");
      el.textContent = opt;
      el.value = opt;
      select.appendChild(el);
  }
  var initialCounty = d3.select("#countySelect").property("value");
  var initialYear = d3.select("#yearSelect").property("value");
  var x = [];
  var y = [];
  for (i = 0; i < data.length; i++) {
      if (data[i]["countyServed"] == initialCounty) {
          if (data[i]["year"] == initialYear) {
              x.push(data[i]["analyteCode"]);
              y.push(data[i]["Percentage_Change"]);
          }
      }
  }
  console.log(x);
  console.log(y);
  var data = [
      {
          x: x,
          y: y,
          type: 'bar',
          marker: {
            color: "green"
          }
      }
  ];
  Plotly.newPlot('viz-container', data);
});
  d3.select("#countySelect").on("change", updateBars);
  d3.select("#yearSelect").on("change", updateBars);
  function updateBars() {
    d3.json("/jsonified_two").then(function(data){
    var initialCounty = d3.select("#countySelect").property("value");
    var initialYear = d3.select("#yearSelect").property("value");
    var x = [];
    var y = [];
    for (i = 0; i < data.length; i++) {
        if (data[i]["countyServed"] == initialCounty) {
            if (data[i]["year"] == initialYear) {
                x.push(data[i]["analyteCode"]);
                y.push(data[i]["Percentage_Change"]);
            }
        }
    }
    console.log(x);
    console.log(y);
    var data = [
        {
            x: x,
            y: y,
            type: 'bar',
            marker: {
              color: "green"
            }
        }
    ];
    Plotly.newPlot('viz-container', data);
  })
};