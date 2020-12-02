var margin = {top: 40, right: 20, bottom: 30, left: 60},
    width = 1000 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

    var formatPercent = d3.format(".0%");

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var y2 = d3.scale.linear()
    .range([0, height]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(formatPercent);

var yAxis2 = d3.svg.axis()
    .scale(y2)
    .orient("left")
    .tickValues([.1,.2,.3,.4,.5,.6,.7,.8,.9,1])
    .tickFormat(formatPercent);

var svg = d3.select("#svg5")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.call(tip);

var svg2 = d3.select("#svg6")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," +0+ ")");

d3.csv("marriage_data.csv", type, function(error, data) {
  x.domain(data.map(function(d) { return d.BrideCountry; }));
  y.domain([0, d3.max(data, function(d) { return d.EU28; })]);
  y2.domain([0, d3.max(data, function(d) { return d.National; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y",-50)
      .attr("x",0)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Proportion of International Marriages (within EU28)");

 svg2.append("g")
      .attr("class", "y axis")
      .call(yAxis2)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y",-50)
      .attr("x",0)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Proportion of National Marriages");

  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.BrideCountry); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.EU28); })
      .attr("height", function(d) { return height - y(d.EU28); })

  svg2.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar2")
      .attr("x", function(d) { return x(d.BrideCountry); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return 0; })
      .attr("height", function(d) { return y2(d.National); })

});

function type(d) {
  d.EU28 = +d.EU28;
  return d;
}

function type(d) {
  d.National = +d.National;
  return d;
}
