function handleSubmit() {
    // Prevent the page from refreshing
    d3.event.preventDefault();
  
    // Select the input value from the form
    var county = d3.select("#countyInput").node().value;
    console.log(county);
  
    // clear the input value
    d3.select("#countyInput").node().value = "";
  
    buildPlot(county);
  }

  
// Define SVG area dimensions
var svgWidth = 500;
var svgHeight = 400;

// Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 150
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3.select("body")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and to the bottom
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

d3.csv("../../static/data/groundwater_contaminants.csv").then(function(data) {

  var counties = [];
  for (i = 0; i < data.length; i++) {
      var county = data[i]["countyServed"];
      if (counties.includes(county) == false) {
          counties.push(county);
      };
  };
  console.log(counties);
  //console.log(data);

  var years = [];
  for (i = 0; i < data.length; i++) {
      var year = data[i]["year"];
      if (years.includes(year) == false) {
          years.push(year);
      };
  };
  console.log(years);
  var year_options = document.getElementById("yearSelected");
  for (var i = 0; i< year_options.length; i++) {
      var options = year_options[i];
      var element = document.createElement("option");
      element.textContent = options;
      element.value = options;
      year_options.appendChild(element);
  }

  var dropdownMenu = d3.select("#yearSelected");

  var selected_year = dropdownMenu.property("value");

  var county_input = d3.select("#countyInput").property("value");
  var selected_year = d3.select("#yearSelected").property("value");
  var percent_change = [];
  for (i = 0; i < data.length; i++) {
    if (county_input === data[i]["countyServed"]) {
      if (selected_year === data[i]["year"]) {
        percent_change.push(data[i]["Percentage_Change"]);    
      };
    };
  };




  // Cast the percent value to a number for each piece of data
  data.forEach(function(d) {
    d.Percentage_Change = +d.Percentage_Change;
  });

  // Configure a band scale for the horizontal axis with a padding of 0.5 (50%)
  var xBandScale = d3.scaleBand()
    .domain(data.map(d => d.analyteCode))
    .range([0, chartWidth])
    .padding(0.5);

  // Create a linear scale for the vertical axis.
  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => percent_change)])
    .range([chartHeight, 0]);

  // Create two new functions passing our scales in as arguments
  // These will be used to create the chart's axes
  var bottomAxis = d3.axisBottom(xBandScale);
  var leftAxis = d3.axisLeft(yLinearScale).ticks(10);

  // Append two SVG group elements to the chartGroup area,
  // and create the bottom and left axes inside of them
  chartGroup.append("g")
    .call(leftAxis);

  chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);

  // Use the linear and band scales to position each rectangle within the chart
  chartGroup.selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", d => xBandScale(d.analyteCode))
    .attr("y", d => yLinearScale(Math.max(0, percent_change)))
    .attr("width", xBandScale.bandwidth())
    .attr("height", d => Math.abs(chartHeight - yLinearScale(percent_change)));

}).catch(function(error) {
  console.log(error);

});

    