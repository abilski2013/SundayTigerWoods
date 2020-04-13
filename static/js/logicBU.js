function getPlot(id) {
    //extract the json data from the json file samples
    d3.json("../data/groundwater_contaminants.csv").then((data) => {
        console.log(data);
       
    
        //trace and layout for graphing bar
        var trace = {
            x: contaminant_names,
            y: contaminant_change,
            text: labels,
            marker: {
                color: "blue"},
                type: "bar",
                orientation: "h"
        };
    
        var data = [trace];
        var layout = {
            title: "Pecentage Change of Country Contaminants"
        };
    
        Plotly.newPlot("bar", data, layout);
    });
}