Chart.plugins.register ( {
  afterDatasetsDraw: function(chart) {
    chart_type = chart.config.type;
    if (chart.tooltip._active && chart.tooltip._active.length && chart_type === 'line') {
         var activePoint = chart.tooltip._active[0],
         ctx = chart.chart.ctx,
         x_axis = chart.scales['x-axis-0'],
        y_axis = chart.scales['y-axis-0'],
        x = activePoint.tooltipPosition().x,
        topY = y_axis.top,
        bottomY = y_axis.bottom;
  

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
 }
}
});



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
      enabled: false
    },

    elements: {
      point:{
        radius: 1
      }
    },


    
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