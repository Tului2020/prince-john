/* implementation heavily influenced by http://bl.ocks.org/1166403 */

// define dimensions of graph
var m = [80, 80, 80, 80]; // margins
var w = 1000 - m[1] - m[3]; // width
var h = 400 - m[0] - m[2]; // height

// create a simple data array that we'll plot with a line (this array represents only the Y values, X will just be the index location)
var data = [3, 6, 2, 7, 5, 2, 0, 3, 8, 9, 2, 5, 9, 3, 6, 3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 9, 2, 7];

// X scale will fit all values from data[] within pixels 0-w
var xScale = d3.scale.linear().domain([0, data.length]).range([0, w]);
// Y scale will fit values from 0-10 within pixels h-0 (Note the inverted domain for the y-scale: bigger is up!)
var yScale = d3.scale.linear().domain([0, 10]).range([h, 0]);
// automatically determining max range can work something like this
// var y = d3.scale.linear().domain([0, d3.max(data)]).range([h, 0]);

// create a line function that can convert data[] into x and y points
var line = d3.svg.line()
// assign the X function to plot our line as we wish
.x(function (d, i) {
    // verbose logging to show what's actually being done
    //  console.log('Plotting X value for data point: ' + d + ' using index: ' + i + ' to be at: ' + x(i) + ' using our xScale.');
    // return the X coordinate where we want to plot this datapoint
    return xScale(i);
})
    .y(function (d) {
    // verbose logging to show what's actually being done
    //  console.log('Plotting Y value for data point: ' + d + ' to be at: ' + y(d) + " using our yScale.");
    // return the Y coordinate where we want to plot this datapoint
    return yScale(d);
});

// Add an SVG element with the desired dimensions and margin.
var graph = d3.select("#graph").append("svg:svg")
    .attr("width", w + m[1] + m[3])
    .attr("height", h + m[0] + m[2])
    .append("svg:g")
    .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

// create yAxis
var xAxis = d3.svg.axis().scale(xScale).tickSize(-h).tickSubdivide(true);
// Add the x-axis.

var rect = graph.append("rect").attr({
    w: 0,
    h: 0,
    width: w,
    height: h,
    fill: "#ffffff"
});

graph.append("svg:g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + h + ")")
    .call(xAxis);



var yAxisLeft = d3.svg.axis().scale(yScale).ticks(4).orient("left");

graph.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(-25,0)")
    .call(yAxisLeft);


var mainLine = graph.append("path").attr("d", line(data));

//console.log(line(data));        


var verticalLine = graph.append('line')
// .attr('transform', 'translate(100, 50)')
.attr({
    'x1': 0,
    'y1': 0,
    'x2': 0,
    'y2': h
})
    .attr("stroke", "steelblue")
    .attr('class', 'verticalLine');

circle = graph.append("circle")
    .attr("opacity", 0)
    .attr({
    r: 6,
    fill: 'darkred'

});

rect.on('mousemove', function () {

    var xPos = d3.mouse(this)[0];
    d3.select(".verticalLine").attr("transform", function () {
        return "translate(" + xPos + ",0)";
    });


    var pathLength = mainLine.node().getTotalLength();
    var x = xPos;
    var beginning = x,
        end = pathLength,
        target;
    while (true) {
        target = Math.floor((beginning + end) / 2);
        pos = mainLine.node().getPointAtLength(target);
        if ((target === end || target === beginning) && pos.x !== x) {
            break;
        }
        if (pos.x > x) end = target;
        else if (pos.x < x) beginning = target;
        else break; //position found
    }
    circle.attr("opacity", 1)
        .attr("cx", x)
        .attr("cy", pos.y);

    
    console.log("x and y coordinate where vertical line intersects graph: " + [pos.x, pos.y]);
    console.log("data where vertical line intersects graph: " + [xScale.invert(pos.x), yScale.invert(pos.y)]);


});