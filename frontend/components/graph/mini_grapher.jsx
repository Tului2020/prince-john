import React from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';




class MiniGraph extends React.Component {
  constructor(props) {
    super(props);

  }


  render() {
    return <div id={`mini-graph-${this.props.ticker}`} className='mini-graphs'></div>;
  }

  componentDidMount() {
    this.graphData();
  }

  componentDidUpdate() {
    this.graphData();
  }

  graphData() {
    // debugger
    let { data, ticker } = this.props
    
    if (data) {
      // debugger
      let graphDivId = `stock-graph-${ticker}`
      
      let width = document.getElementById(graphDivId).clientWidth;
      let height = document.getElementById(graphDivId).clientHeight;
      let factor = 0.2;
  
  
  
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
          return y(d.price);
        });
  
      // debugger
      // this is how you enter the body
      var svg = d3.select(`#mini-graph-${ticker}`).append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
  
  
      // debugger
      var info = [{
        name: 'price',
        values: data.map(d => ({
          date: d.date,
          price: +d['price']
        }))
      }];
  
  
      x.domain(d3.extent(data, d => d.date));
  
      let minPoint = d3.min(info, c => d3.min(c.values, v => v.price));
      let maxPoint = d3.max(info, c => d3.max(c.values, v => v.price));
      let adjustedMaxMinDelta = factor * (maxPoint - minPoint)
  
  
      y.domain([minPoint - adjustedMaxMinDelta, maxPoint + adjustedMaxMinDelta]);
  
  
      var city = svg.selectAll(".city")
        .data(info)
        .enter().append("g")
        .attr("class", "city");
  
      city.append("path")
        .attr("class", "line")
        .attr("d", d => line(d.values))
        .style("stroke", "#00C805");
    }
  }
}


const mSTP = ({ entities, session }) => ({})

const mDTP = (dispatch) => ({})

const MiniGraphContainer = connect(mSTP, mDTP)(MiniGraph);
export default MiniGraphContainer


