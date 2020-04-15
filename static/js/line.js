d3.json("/jsonified").then(function(page_sanitized) {
    console.log(page_sanitized[0]["countyServed"]);
    var selector = [];
    for (i = 0; i < page_sanitized.length; i++) {
        var county = page_sanitized[i]["countyServed"];
        if (selector.includes(county) == false) {
            selector.push(county);
        }
    }
    console.log(selector);

    var select = document.getElementById("countySelect2");
    for (var i = 0; i<selector.length; i++) {
        var opt = selector[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    } 
    var analyteSelector = [];
    for (i = 0; i < page_sanitized.length; i++) {
        var analyte = page_sanitized[i]["analyteCode"];
        if (analyteSelector.includes(analyte) == false) {
            analyteSelector.push(analyte);
        }
    }
    console.log(analyteSelector);

    var select = document.getElementById("analyteCodeSelect2");
    for (var i = 0; i<analyteSelector.length; i++) {
        var opt = analyteSelector[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    }     
    var sourceselector = [];
    for (i = 0; i < page_sanitized.length; i++) {
        var water = page_sanitized[i]["waterSource"];
        if (sourceselector.includes(water) == false) {
            sourceselector.push(water);
        }
    }
    console.log(sourceselector);

    var select = document.getElementById("waterSource2");
    for (var i = 0; i<sourceselector.length; i++) {
        var opt = sourceselector[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    }     
    
    var initial_county = d3.select("#countySelect2").property("value");
    var initial_contam = d3.select("#analyteCodeSelect2").property("value");
    var initial_source = d3.select("#waterSource2").property("value");
    var years = [];
    var levels = [];
    for (i = 0; i < page_sanitized.length; i++) {
        if (initial_county == page_sanitized[i]["countyServed"]) {
            if (initial_contam == page_sanitized[i]["analyteCode"]) {
                if (initial_source == page_sanitized[i]["waterSource"]) {
                        years.push(page_sanitized[i]["year"]);    
                }  
            }
        }
        if (initial_county == page_sanitized[i]["countyServed"]) {
            if (initial_contam == page_sanitized[i]["analyteCode"]) {
                if (initial_source == page_sanitized[i]["waterSource"]) {
                    levels.push(page_sanitized[i]["mean_value"]);
                }   
            }
        }
    }
    console.log(years);
    console.log(levels);
    
    var CHART = document.getElementById("myChart2");
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
    
    if ((initial_contam == "Arsenic") || (initial_contam == "HAA5") || (initial_contam == "PCE") || (initial_contam == "TCE") || (initial_contam == "TTHM") || (initial_contam == "Uranium")) {
        d3.select("#units").text("Units are in ug/L");
    } else if ((initial_contam == "Nitrate")) {
        d3.select("#units").text("Units are in mg/L");
    } else {
        d3.select("#units").text("Units are in pCi/L");
    }       
    
    
    d3.select("#countySelect2").on("change", changefunc);
    d3.select("#waterSource2").on("change", changefunc);
    d3.select("#analyteCodeSelect2").on("change", changefunc);
    
     
    function changefunc() {
        var initial_county = d3.select("#countySelect2").property("value");
        var initial_contam = d3.select("#analyteCodeSelect2").property("value");
        var initial_source = d3.select("#waterSource2").property("value");
        var years = [];
        var levels = [];
        for (i = 0; i < page_sanitized.length; i++) {
            if (initial_county == page_sanitized[i]["countyServed"]) {
                if (initial_contam == page_sanitized[i]["analyteCode"]) {
                    if (initial_source == page_sanitized[i]["waterSource"]) {
                            years.push(page_sanitized[i]["year"]);  
                    }  
                }
            }
            if (initial_county == page_sanitized[i]["countyServed"]) {
                if (initial_contam == page_sanitized[i]["analyteCode"]) {
                    if (initial_source == page_sanitized[i]["waterSource"]) {
                        levels.push(page_sanitized[i]["mean_value"]);
                    }   
                }
            }
        }
        console.log(years);
        console.log(levels); 
        d3.select("#chart-container")
            .html("<canvas id='myChart2'></canvas>");
        
        var CHART = document.getElementById("myChart2");
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
        if ((initial_contam == "Arsenic") || (initial_contam == "HAA5") || (initial_contam == "PCE") || (initial_contam == "TCE") || (initial_contam == "TTHM") || (initial_contam == "Uranium")) {
        d3.select("#units").text("Units are in ug/L");
        } else if ((initial_contam == "Nitrate")) {
        d3.select("#units").text("Units are in mg/L");
        } else {
        d3.select("#units").text("Units are in pCi/L");
        }        
    
        }  


    
});