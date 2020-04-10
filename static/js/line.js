d3.csv("../../static/data/county_mean.csv").then(function(data) {
  console.log(data[0]["countyServed"]);
    var selector = [];
    for (i = 0; i < data.length; i++) {
        var county = data[i]["countyServed"];
        if (selector.includes(county) == false) {
            selector.push(county);
        }
    }
    console.log(selector);

    var select = document.getElementById("countySelect");
    for (var i = 0; i<selector.length; i++) {
        var opt = selector[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    } 
    var analyteSelector = [];
    for (i = 0; i < data.length; i++) {
        var analyte = data[i]["analyteCode"];
        if (analyteSelector.includes(analyte) == false) {
            analyteSelector.push(analyte);
        }
    }
    console.log(analyteSelector);

    var select = document.getElementById("analyteCodeSelect");
    for (var i = 0; i<analyteSelector.length; i++) {
        var opt = analyteSelector[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    }     
    var sourceselector = [];
    for (i = 0; i < data.length; i++) {
        var water = data[i]["waterSource"];
        if (sourceselector.includes(water) == false) {
            sourceselector.push(water);
        }
    }
    console.log(sourceselector);

    var select = document.getElementById("waterSource");
    for (var i = 0; i<sourceselector.length; i++) {
        var opt = sourceselector[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    }     
    
    var initial_county = d3.select("#countySelect").property("value");
    var initial_contam = d3.select("#analyteCodeSelect").property("value");
    var initial_source = d3.select("#waterSource").property("value");
    var years = [];
    var levels = [];
    for (i = 0; i < data.length; i++) {
        if (initial_county == data[i]["countyServed"]) {
            if (initial_contam == data[i]["analyteCode"]) {
                if (initial_source == data[i]["waterSource"]) {
                        years.push(data[i]["year"]);    
                }  
            }
        }
        if (initial_county == data[i]["countyServed"]) {
            if (initial_contam == data[i]["analyteCode"]) {
                if (initial_source == data[i]["waterSource"]) {
                    levels.push(data[i]["mean_value"]);
                }   
            }
        }
    }
    console.log(years);
    console.log(levels);
    
    var CHART = document.getElementById("myChart");
    var lineChart = new Chart(CHART, {
        type: 'line',
        data: {
         labels: years,
         datasets: [
             {
                 label: "Water Contaminent Levels (MN Counties)",
                 fill: false,
                 lineTension: 0.1,
                 backgroundColor: "rgba(75, 192, 192, 0.4)",
                 borderCapStyle: 'butt',
                 borderDash: [],
                 borderDashOffset: 0.0,
                 borderJoinStyle: 'mitter',
                 pointBorderColor: "rgba(75, 192, 192, 1)",
                 pointBackgroundColor: "#fff",
                 pointBorderWidth: 1,
                 pointHoverRadius: 5,
                 pointHoverBackgroundColor: "rgba(75, 192, 192, 1)",
                 pointHoverBorderColor: "rgba(220,220,220,1)",
                 pointHoverBorderWidth: 2,
                 pointRadius: 1,
                 pointHitRadius: 10,
                 data: levels,
             }
         ]    
        }
    });    
    
    
    d3.select("#countySelect").on("change", changefunc);
    d3.select("#waterSource").on("change", changefunc);
    d3.select("#analyteCodeSelect").on("change", changefunc);
    
     
    function changefunc() {
        var initial_county = d3.select("#countySelect").property("value");
        var initial_contam = d3.select("#analyteCodeSelect").property("value");
        var initial_source = d3.select("#waterSource").property("value");
        var years = [];
        var levels = [];
        for (i = 0; i < data.length; i++) {
            if (initial_county == data[i]["countyServed"]) {
                if (initial_contam == data[i]["analyteCode"]) {
                    if (initial_source == data[i]["waterSource"]) {
                            years.push(data[i]["year"]);  
                    }  
                }
            }
            if (initial_county == data[i]["countyServed"]) {
                if (initial_contam == data[i]["analyteCode"]) {
                    if (initial_source == data[i]["waterSource"]) {
                        levels.push(data[i]["mean_value"]);
                    }   
                }
            }
        }
        console.log(years);
        console.log(levels); 
        d3.select("#chart-container")
            .html("<canvas id='myChart'></canvas>");
        
        var CHART = document.getElementById("myChart");
        var lineChart = new Chart(CHART, {
            type: 'line',
            data: {
             labels: years,
             datasets: [
                 {
                     label: "Water Contaminent Levels (MN Counties)",
                     fill: false,
                     lineTension: 0.1,
                     backgroundColor: "rgba(75, 192, 192, 0.4)",
                     borderCapStyle: 'butt',
                     borderDash: [],
                     borderDashOffset: 0.0,
                     borderJoinStyle: 'mitter',
                     pointBorderColor: "rgba(75, 192, 192, 1)",
                     pointBackgroundColor: "#fff",
                     pointBorderWidth: 1,
                     pointHoverRadius: 5,
                     pointHoverBackgroundColor: "rgba(75, 192, 192, 1)",
                     pointHoverBorderColor: "rgba(220,220,220,1)",
                     pointHoverBorderWidth: 2,
                     pointRadius: 1,
                     pointHitRadius: 100,
                     data: levels,
                 }
             ]    
            }
        }); 
        }   
});


