//Create the chart area, dimensions
var svgWidth = 500;
var svgHeight = 400;

var chartMargin = {
  top: 30,
  right: 50,
  bottom: 30,
  left: 30
};

var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

var svg = d3.select("#viz-container")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.right}, ${chartMargin.bottom})`);

//Read in the data from the MongoDB server and populate lists with options
d3.json("/jsonified_two").then(function(data) {
    
  var counties = [];
  for (i = 0; i < data.length; i++) {
      var county = data[i]["countyServed"];
      if (counties.includes(county) == false) {
          counties.push(county);
      };
  };
  console.log(counties);

  var select = document.getElementById("countySelected");
  for (var i = 0; i< counties.length; i++) {
      var opt = counties[i];
      var el = document.createElement("option");
      el.textContent = opt;
      el.value = opt;
      select.appendChild(el);
  };
  //console.log(data);

  var years = [];
  for (i = 0; i < data.length; i++) {
      var year = data[i]["year"];
      if (years.includes(year) == false) {
          years.push(year);
      };
  };
  console.log(years);

  var select = document.getElementById("yearSelected");
  for (var i = 0; i< years.length; i++) {
      var opt = years[i];
      var el = document.createElement("option");
      el.textContent = opt;
      el.value = opt;
      select.appendChild(el);
  };

  //create criteria for populating list with desired data to plot  
  var county_input = d3.select("#countySelected").property("value");
  var selected_year = d3.select("#yearSelected").property("value");
  var percent_change = [];
  for (i = 0; i < data.length; i++) {
    if (county_input === data[i]["countyServed"]) {
      if (selected_year === data[i]["year"]) {
        percent_change.push(data[i]["Percentage_Change"]);    
      };
    };
  };
  console.log(percent_change);
  //cast percent change as a number
  data.forEach(function(d) {
    d.Percentage_Change = +d.Percentage_Change;
  });

  //draw the graph
  var xBandScale = d3.scaleBand()
    .domain(data.map(d => d.analyteCode))
    .range([0, chartWidth])
    .padding(0.1);

  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.Percentage_Change)])
    .range([chartHeight, 0]);

  var bottomAxis = d3.axisBottom(xBandScale);
  var leftAxis = d3.axisLeft(yLinearScale).ticks(10);

  chartGroup.append("g")
    .call(leftAxis);

  chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);

  chartGroup.selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", d => xBandScale(d.analyteCode))
    .attr("y", d => Math.max(0, yLinearScale(d.Percentage_Change)))
    .attr("width", xBandScale.bandwidth())
    .attr("height", d => Math.abs(chartHeight - yLinearScale(d.Percentage_Change)));

    //create an update function that creates a new bar chart when you use the dropdown
    d3.select("#countySelected").on("change", updateBars);
    d3.select("#yearSelected").on("change", updateBars);

    function updateBars() {
      var county_input = d3.select("#countySelected").property("value");
      var selected_year = d3.select("#yearSelected").property("value");
      var percent_change = [];
      for (i = 0; i < data.length; i++) {
        if (county_input === data[i]["countyServed"]) {
          if (selected_year === data[i]["year"]) {
            percent_change.push(data[i]["Percentage_Change"]);    
          };
        };
      };
    
    chartGroup.selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", d => xBandScale(d.analyteCode))
    .attr("y", d => yLinearScale(d.Percentage_Change))
    .attr("width", xBandScale.bandwidth())
    .attr("height", d => chartHeight - yLinearScale(d.Percentage_Change));

    };
updateBars(data);
});
