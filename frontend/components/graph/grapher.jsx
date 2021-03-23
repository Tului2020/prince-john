import React from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';



class Graph extends React.Component {
  constructor(props) {
    // debugger
    super(props);
    this.userHistory = null;
    this.userHistoryCalculator = this.userHistoryCalculator.bind(this)
    window.addEventListener('resize', () => {
      this.clearGraph();
      this.graphData();
    })
  }

  render() {
    return <div id="stock-show-graph"></div>;
  }


  componentDidUpdate() {
    if (this.props.history[this.props.ticker] || this.props.ticker === 'homePage') this.graphData();
  }

  componentDidMount() {
    if (this.props.history[this.props.ticker] || this.props.ticker === 'homePage') {
      this.clearGraph();
      this.graphData();
    }
  }

  UNSAFE_componentWillUpdate() {
    this.clearGraph();
  }



  clearGraph() {
    let graphDiv = document.getElementById('stock-show-graph');
    while (graphDiv.firstChild) {
      graphDiv.removeChild(graphDiv.firstChild)
    }
  }

  userHistoryCalculator() {
    let { history, current_stocks, balance } = this.props
    if (current_stocks && Object.keys(current_stocks).length <= Object.keys(history).length) {
      let stockNames = Object.keys(current_stocks)
      let userHistory = history[stockNames[0]].map(({ date }) => ({ date }))

      stockNames.forEach(stockName => {
        userHistory.forEach((userHistoryObj, idx) => {
          let userStockPrice = current_stocks[stockName] * history[stockName][idx].price
          if (!userHistoryObj.price) {
            userHistoryObj.price = userStockPrice + balance;
          } else {
            userHistoryObj.price += userStockPrice;
          }

        })
      })
      return userHistory
    }
    return []
  }


  graphData() {
    let { ticker, history } = this.props;
    let data;
    let width;
    let height;


    if (ticker === 'homePage') {
      data = this.userHistoryCalculator();
    } else {
      data = history[ticker]
    }

    width = document.getElementById('stock-show-graph-div').clientWidth;
    height = document.getElementById('stock-show-graph-div').clientHeight;



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


    // this is how you enter the body
    var svg = d3.select("#stock-show-graph").append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")


    // debugger
    var cities = [{
      name: 'price',
      values: data.map(d => ({
        date: d.date,
        price: +d['price']
      }))
    }];




    x.domain(d3.extent(data, d => d.date));

    let minPoint = d3.min(cities, c => d3.min(c.values, v => v.price));
    let maxPoint = d3.max(cities, c => d3.max(c.values, v => v.price));
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
            // let { date, price } = d.values[(data.length - 1) - Math.round(mouse[0] / width * (data.length - 1))]
            let { date, price } = d.values[Math.round(mouse[0] / width * (data.length - 1))]

            var beginning = 0,
              end = lines[i].getTotalLength(),
              target = null;

            while (true) {
              target = Math.floor((beginning + end) / 2);
              let pos = lines[i].getPointAtLength(target);
              if ((target === end || target === beginning) && pos.x !== mouse[0]) {
                break;
              }
              if (pos.x > mouse[0]) end = target;
              else if (pos.x < mouse[0]) beginning = target;
              else break; //position found
            }

            d3.select(this).select('#price-indicator')
              .text(`${date.getHours()}:${date.getMinutes()} ${price}`)
            return "translate(" + (mouse[0] - 20) + "," + 10 + ")";
          });
      });


  }



}


const mSTP = ({entities, session}) => {
  return {
    history: entities.history,
    current_stocks: entities.stocks.current_stocks,
    balance: parseFloat(entities.users[session.currentUserId].balance)
  }
}

const mDTP = (dispatch) => ({})

const GraphContainer = connect(mSTP, mDTP)(Graph);
export default GraphContainer


