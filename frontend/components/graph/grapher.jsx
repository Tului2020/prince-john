import React from 'react';
import { connect } from 'react-redux';
import getIntraDay from '../../util/alphavantage_api';
import * as d3 from 'd3';



class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.stockData = null;
    // window.addEventListener('resize', this.graphData)
  }

  render() {
    return <div id="stock-show-graph"></div>;
  }

  componentWillUpdate() {
    this.clearGraph();
    this.graphData();
    console.log('done')
  }

  componentDidMount() {
    // console.log(this.props.ticker)
    this.graphData();
    window.addEventListener('resize', () => {
      debugger
    })
  }

  clearGraph() {
    let graphDiv = document.getElementById('stock-show-graph');
    while (graphDiv.firstChild) {
      graphDiv.removeChild(graphDiv.firstChild)
    }
  }



  graphData() {

    getIntraDay(this.props.ticker)(myData => {
      let width = document.getElementById('stock-show-graph-div').clientWidth;
      let height = document.getElementById('stock-show-graph-div').clientHeight;
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
    
      let minPoint = d3.min(cities, c => d3.min(c.values, v => v.temperature));
      let maxPoint = d3.max(cities, c => d3.max(c.values, v => v.temperature));
      let adjustedMaxMinDelta = 1 * (maxPoint - minPoint)


      y.domain([minPoint - adjustedMaxMinDelta, maxPoint + adjustedMaxMinDelta]);
    
    
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
            .attr("d", () => `M${mouse[0]},${height} ${mouse[0]},20`);
    
          d3.selectAll(".mouse-per-line")
            .attr("transform", function (d, i) {
              let { date, temperature } = d.values[(data.length - 1) - Math.round(mouse[0] / width * (data.length - 1))]
    
              var beginning = 0,
                end = lines[i].getTotalLength(),
                target = null;
    
              while (true) {
                target = Math.floor((beginning + end) / 2);
                let pos = lines[i].getPointAtLength(target);
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
              return "translate(" + (mouse[0] - 20) + "," + 10 + ")";
            });
        });
    })
  }



}



const mSTP = (state, ownParams) => ({})
const mDTP = (dispatch) => ({})

const GraphContainer = connect(mSTP, mDTP)(Graph);
export default GraphContainer


