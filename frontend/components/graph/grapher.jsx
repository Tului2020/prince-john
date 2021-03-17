import React from 'react';
import { connect } from 'react-redux';
import * as d3 from "d3";

class Graph extends React.Component {
  render() {
    return null;
  }

  componentDidMount() {
    var margin = { top: 10, right: 30, bottom: 30, left: 60 },
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3.select("#stock-show-graph")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

  //Read the data
  // d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv",
  d3.csv("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo&datatype=csv",
    // When reading the csv, I must format variables:
    function (d) {
      // debugger
      return { date: d3.timeParse("%Y-%m-%d %H:%M:%S")(d.timestamp), value: (parseFloat(d.open) + parseFloat(d.close)) / 2 }
    },

    // Now I can use this dataset:
    function (data) {
      https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv
      // Add X axis --> it is a date format
      // debugger
      var x = d3.scaleTime()
        .domain(d3.extent(data, function (d) { return d.date; }))
        .range([0, width]);
      // debugger
      // svg.append("g")
      //   .attr("transform", "translate(0," + height + ")")
      //   .call(d3.axisBottom(x));

      // Add Y axis
      var y = d3.scaleLinear()
        .domain([d3.min(data, function (d) { return d.value; }) * .99, d3.max(data, function (d) { return +d.value; })])
        .range([height, 0]);
      // svg.append("g")
      // .call(d3.axisLeft(y));

      // Add the line
      svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#00C805")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
          .x(function (d) { return x(d.date) })
          .y(function (d) { return y(d.value) })
        )

    })

  var vertical = d3.select("#my_dataviz")
    // svg
    .append("div")
    .attr("class", "remove")
    .style("position", "absolute")
    .style("z-index", "19")
    .style("width", "1px")
    .style("height", "380px")
    .style("top", "10px")
    .style("bottom", "30px")
    .style("left", "0px")
    .style("background", "black");

  d3.select("#my_dataviz")
    .on("mousemove", function () {
      mousex = d3.mouse(this);
      mousex = mousex[0] + 5;
      vertical
        .style('display', 'flex')
        .style("left", mousex + "px")
    })
    .on("mouseover", function () {
      // debugger
      mousex = d3.mouse(this);
      mousex = mousex[0] + 5;
      vertical
        .style('display', 'flex')
        .style("left", mousex + "px")
    })
    .on("mouseleave", function () {
      // debugger
      mousex = d3.mouse(this);
      mousex = mousex[0] + 5;
      vertical
        .style('display', 'none')
        .style("left", mousex + "px")
    })
    ;

  }


}

const mSTP = (state, ownParams) => ({

})


const mDTP = (dispatch) => ({
  
})

const GraphContainer = connect(mSTP, mDTP)(Graph);
export default GraphContainer