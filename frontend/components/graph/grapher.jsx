import React from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';
import { updatePortfolioValue } from './../../actions/portfolio_actions'


const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})

class Graph extends React.Component {
  constructor(props) {
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
    let currentStocksLength = Object.keys(current_stocks).length

    if (currentStocksLength > 0 && currentStocksLength <= Object.keys(history).length) {
      let stockNames = Object.keys(current_stocks)
      // debugger
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

  getPortfilioValue() {
    let { history, current_stocks } = this.props
    let currentStocksLength = Object.keys(current_stocks).length
    let portfolioValue = 0;

    if (currentStocksLength > 0 && currentStocksLength <= Object.keys(history).length) {
      Object.keys(current_stocks).forEach(ticker => {
        // debugger
        portfolioValue += history[ticker][108].price * current_stocks[ticker]
      })
    }
    return portfolioValue;
  }




  graphData() {
    let { ticker, history } = this.props;
    let data;
    let width;
    let height;
    let graphDivId = 'stock-show-graph-div'

    this.props.updatePortfolioValue(this.getPortfilioValue())

    if (ticker === 'homePage') {
      data = this.userHistoryCalculator();
      graphDivId = 'home-' + graphDivId
    } else {
      data = history[ticker]
    }

    
    width = document.getElementById(graphDivId).clientWidth;
    height = 250;
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
    let adjustedMaxMinDelta = factor * (maxPoint - minPoint)


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
      .on('mouseout', function (d, i) { // on mouse out hide line and text
        d3.select(".mouse-line")
          .style("opacity", "0");
        d3.selectAll(".mouse-per-line text")
          .style("opacity", "0")
          .attr("transform", function (d, i) {
            // debugger
            let beginningPrice = d.values[0].price
            let displayPrice = d.values[108].price
            let displayReturn = ((displayPrice - beginningPrice) / beginningPrice * 100).toFixed(2)

            document.getElementById('stock-show-graph-price').innerHTML = currencyFormatter.format(displayPrice)
            document.getElementById('stock-show-graph-return-money').innerHTML = currencyFormatter.format(displayReturn * beginningPrice / 100)
            document.getElementById('stock-show-graph-return-percent').innerHTML = `(${displayReturn}%)`
          })
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
            // debugger
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

            let beginningPrice = d.values[0].price
            let displayPrice = price
            let displayReturn = ((displayPrice - beginningPrice) / beginningPrice * 100).toFixed(2)

            document.getElementById('stock-show-graph-price').innerHTML = currencyFormatter.format(displayPrice)
            document.getElementById('stock-show-graph-return-money').innerHTML = currencyFormatter.format(displayReturn * beginningPrice / 100)
            document.getElementById('stock-show-graph-return-percent').innerHTML = `(${displayReturn}%)`

            d3.select(this).select('#price-indicator')
              // .text(`${date.getHours()}:${date.getMinutes()} ${price}`)
              .text(date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }))
            return "translate(" + (mouse[0] - 20) + "," + 10 + ")";
          });
      });


  }



}


const mSTP = ({ entities, session }) => {
  return {
    history: entities.history,
    current_stocks: entities.stocks.current_stocks,
    balance: parseFloat(entities.users[session.currentUserId].balance)
  }
}

const mDTP = (dispatch) => ({
  updatePortfolioValue: (portfolioValue) => dispatch(updatePortfolioValue(portfolioValue)),
  // updateDisplayValue: (displayValue) => dispatch(updateDisplayValue(displayValue))
})

const GraphContainer = connect(mSTP, mDTP)(Graph);
export default GraphContainer


