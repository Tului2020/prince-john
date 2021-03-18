// Chart.plugins.register ( {
//   afterDatasetsDraw: function(chart, e) {
//     chart_type = chart.config.type;
//     console.log(e)
    // debugger


    // if (chart.tooltip._active && chart.tooltip._active.length) {
    //   console.log('yes')
    //   // debugger
      // var activePoint = chart.tooltip._active[0];
      // ctx = chart.chart.ctx;
      // x_axis = chart.scales['x-axis-0'];
      // y_axis = chart.scales['y-axis-0'];
      // x = activePoint.tooltipPosition().x;
      // topY = y_axis.top;
      // bottomY = y_axis.bottom;
      // // debugger
      // // draw line
      // ctx.save();
      // ctx.beginPath();
      // ctx.moveTo(x, topY+7);
      // ctx.lineTo(x, bottomY+1);
      // ctx.setLineDash([]);
      // ctx.lineWidth = 1;
      // ctx.strokeStyle = 'black';
      // ctx.stroke();
      // ctx.restore();
    // }
  // }
// });


// var parentEventHandler = Chart.Controller.prototype.eventHandler;
Chart.Controller.prototype.eventHandler = function(event) {
    // var ret = parentEventHandler.apply(this, arguments);

    // Draw the vertical line here
    // var eventPosition = Chart.helpers.getRelativePosition(arguments[0], this.chart);
    // this.chart.ctx.beginPath();
    // this.chart.ctx.moveTo(eventPosition.x, 30);
    // this.chart.ctx.strokeStyle = "#ff0000";
    // this.chart.ctx.lineTo(eventPosition.x, 340);
    // this.chart.ctx.stroke();



      debugger
      // var activePoint = chart.tooltip._active[0];
      ctx = stockGraph.chart.ctx;
      x_axis = stockGraph.scales['x-axis-0'];
      y_axis = stockGraph.scales['y-axis-0'];
      // x = activePoint.tooltipPosition().x;
      topY = y_axis.top;
      bottomY = y_axis.bottom;
      // debugger
      // draw line
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x, topY+7);
      ctx.lineTo(x, bottomY+1);
      ctx.setLineDash([]);
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'black';
      ctx.stroke();
      ctx.restore();

    // return ret;
};







let myChart = document.getElementById('myChart')
let stockGraph = new Chart(myChart)
window.graph = stockGraph;







window.stockGraph = new Chart(myChart, {
  type: 'line',

  data: {
    labels: ['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],
    datasets: [{
      borderColor: "#00C805",
      backgroundColor: "transparent",
      lineTension: 0,
      data: [65, 59, 80, 81, 56, 55]
    }]
  },

  options: {
    legend: {
      display: false
    },
    tooltips: {
      enabled: false,
      // mode: 'nearest'
      // mode: 'index'
    },
    hover: {
      mode: null
    },

    // elements: {
    //   point:{
    //     radius: 0
    //   }
    // },


    
    scales: {
      yAxes: [{
        gridLines: {
          display: false
        },
        ticks: {
          display: false
        },
      }],
      xAxes: [{
        gridLines: {
          display: false
        },
        ticks: {
          display: false
        },
      }]
    }
  }
})



// data: [65, 59, 80, 81, 56, 55]
// labels: ['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],