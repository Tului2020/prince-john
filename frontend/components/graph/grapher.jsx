import React from 'react';
import { connect } from 'react-redux';
import getIntraDay from '../../util/alphavantage_api';
import * as d3 from 'd3';



class Graph extends React.Component {
  render() {
    return null;
  }

  componentDidMount() {
    this.graphData();
  }

  graphData() {
    getIntraDay('TSLA')(myData => {
      var margin = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
        width = 700 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;
    
      var parseDate = d3.time.format("%Y-%m-%d %H:%M:%S").parse;
    
    
      // x and y are functions that give linear positions with respect to width and height, respectively
      var x = d3.time.scale()
        .range([0, width]);
    
      var y = d3.scale.linear()
        .range([height, 0]);
    
    
    
      var line = d3.svg.line()
        .interpolate("basis")
        .x(function (d) {
          return x(d.date);
        })
        .y(function (d) {
          return y(d.temperature);
        });
    
    
      // this is how you enter the body
      var svg = d3.select("#stock-show-graph").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        // .attr("transform", "translate(0, 0)");
    
    
      let data =  d3.csv.parse(myData).map(el => {
        let price = (parseFloat(el.open) + parseFloat(el.close)).toFixed(2) / 2;
        let date = parseDate(el.timestamp);
        return { date, price }
      })
    
    
      var cities = ['price'].map(name => ({
        name: name,
        values: data.map(d => ({
            date: d.date,
            temperature: +d[name]
        }))
      }));
    
      x.domain(d3.extent(data, d => d.date));
    
      y.domain([
        d3.min(cities, c => d3.min(c.values, v => v.temperature)),
        d3.max(cities, c => d3.max(c.values, v => v.temperature)) * 1.005
      ]);
    
    
      var city = svg.selectAll(".city")
        .data(cities)
        .enter().append("g")
        .attr("class", "city");
    
      city.append("path")
        .attr("class", "line")
        .attr("d", d => line(d.values))
        .style("stroke", "#00C805");
    
    
      var mouseG = svg.append("g")
        .attr("class", "mouse-over-effects");
    
      mouseG.append("path") // this is the black vertical line to follow mouse
        .attr("class", "mouse-line")
        .style("stroke", "black")
        .style("stroke-width", "1px")
        .style("opacity", "0");
    
      var lines = document.getElementsByClassName('line');
    
      //d3.select('.mouse-per-line')[0][0].__data__.values
      var mousePerLine = mouseG.selectAll('.mouse-per-line')
        .data(cities)
        .enter()
        .append("g")
        .attr("class", "mouse-per-line");
    
    
      mousePerLine.append("text")
        .attr('id', 'price-indicator')
        .attr("transform", "translate(10,3)");
    
      mouseG.append('svg:rect') // append a rect to catch mouse movements on canvas
        .attr('width', width) // can't catch mouse events on a g element
        .attr('height', height)
        .attr('fill', 'none')
        .attr('pointer-events', 'all')
        .on('mouseout', () => { // on mouse out hide line and text
          d3.select(".mouse-line")
            .style("opacity", "0");
          d3.selectAll(".mouse-per-line text")
            .style("opacity", "0");
        })
        .on('mouseover', function () { // on mouse in show line and text
          d3.select(".mouse-line")
            .style("opacity", "1");
          d3.selectAll(".mouse-per-line text")
            .style("opacity", "1");
        })
        .on('mousemove', function () { // mouse moving over canvas
          var mouse = d3.mouse(this);
          d3.select(".mouse-line")
            .attr("d", () => `M${mouse[0]},${height} ${mouse[0]},10`);
    
          d3.selectAll(".mouse-per-line")
            .attr("transform", function (d, i) {
              let { date, temperature } = d.values[(data.length - 1) - Math.round(mouse[0] / width * (data.length - 1))]
    
              var beginning = 0,
                end = lines[i].getTotalLength(),
                target = null;
    
              while (true) {
                target = Math.floor((beginning + end) / 2);
                pos = lines[i].getPointAtLength(target);
                // debugger
                if ((target === end || target === beginning) && pos.x !== mouse[0]) {
                  break;
                }
                if (pos.x > mouse[0]) end = target;
                else if (pos.x < mouse[0]) beginning = target;
                else break; //position found
              }
    
              // debugger
              d3.select(this).select('#price-indicator')
                .text(`${date.getHours()}:${date.getMinutes()} ${temperature}`)
              return "translate(" + (mouse[0] - 20) + "," + 0 + ")";
            });
        });
    })
  }



}

const mSTP = (state, ownParams) => ({

})


const mDTP = (dispatch) => ({

})

const GraphContainer = connect(mSTP, mDTP)(Graph);
export default GraphContainer



// componentDidMount() {
  //   var margin = { top: 10, right: 30, bottom: 30, left: 60 },
  //   width = 460 - margin.left - margin.right,
  //   height = 400 - margin.top - margin.bottom;

  // // append the svg object to the body of the page
  // var svg = d3.select("#stock-show-graph")
  //   .append("svg")
  //   .attr("width", width + margin.left + margin.right)
  //   .attr("height", height + margin.top + margin.bottom)
  //   .append("g")
  //   .attr("transform",
  //     "translate(" + margin.left + "," + margin.top + ")");

  // //Read the data
  // // d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv",
  // d3.csv("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo&datatype=csv",
  //   // When reading the csv, I must format variables:
  //   function (d) {
  //     // debugger
  //     return { date: d3.timeParse("%Y-%m-%d %H:%M:%S")(d.timestamp), value: (parseFloat(d.open) + parseFloat(d.close)) / 2 }
  //   },

  //   // Now I can use this dataset:
  //   function (data) {
  //     https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv
  //     // Add X axis --> it is a date format
  //     // debugger
  //     var x = d3.scaleTime()
  //       .domain(d3.extent(data, function (d) { return d.date; }))
  //       .range([0, width]);
  //     // debugger
  //     // svg.append("g")
  //     //   .attr("transform", "translate(0," + height + ")")
  //     //   .call(d3.axisBottom(x));

  //     // Add Y axis
  //     var y = d3.scaleLinear()
  //       .domain([d3.min(data, function (d) { return d.value; }) * .99, d3.max(data, function (d) { return +d.value; })])
  //       .range([height, 0]);
  //     // svg.append("g")
  //     // .call(d3.axisLeft(y));

  //     // Add the line
  //     svg.append("path")
  //       .datum(data)
  //       .attr("fill", "none")
  //       .attr("stroke", "#00C805")
  //       .attr("stroke-width", 1.5)
  //       .attr("d", d3.line()
  //         .x(function (d) { return x(d.date) })
  //         .y(function (d) { return y(d.value) })
  //       )

  //   })

  // var vertical = d3.select("#my_dataviz")
  //   // svg
  //   .append("div")
  //   .attr("class", "remove")
  //   .style("position", "absolute")
  //   .style("z-index", "19")
  //   .style("width", "1px")
  //   .style("height", "380px")
  //   .style("top", "10px")
  //   .style("bottom", "30px")
  //   .style("left", "0px")
  //   .style("background", "black");

  // d3.select("#my_dataviz")
  //   .on("mousemove", function () {
  //     mousex = d3.mouse(this);
  //     mousex = mousex[0] + 5;
  //     vertical
  //       .style('display', 'flex')
  //       .style("left", mousex + "px")
  //   })
  //   .on("mouseover", function () {
  //     // debugger
  //     mousex = d3.mouse(this);
  //     mousex = mousex[0] + 5;
  //     vertical
  //       .style('display', 'flex')
  //       .style("left", mousex + "px")
  //   })
  //   .on("mouseleave", function () {
  //     // debugger
  //     mousex = d3.mouse(this);
  //     mousex = mousex[0] + 5;
  //     vertical
  //       .style('display', 'none')
  //       .style("left", mousex + "px")
  //   })
  //   ;

  // }