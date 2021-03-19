
const getIntraDay = (symbol) => (callBackFunc) => {
	return axios.get('https://www.alphavantage.co/query',
		{
			params: {
				function: 'TIME_SERIES_INTRADAY',
				symbol,
				interval: '5min',
				apikey: 'PMC6363GDICNKO59',
				datatype: 'csv'
			}
		})
		.then(({ data }) => {
			// let importantData = data['Time Series (5min)'];
			// Object.keys(importantData).map(date => {
			// 	return (parseFloat(importantData[date]['1. open']) + parseFloat(importantData[date]['4. close'])) / 2
			// })

			// debugger
			callBackFunc(data)
		})
}



getIntraDay('TSLA')((myData) => {
	// debugger
// 	var myData = "date	New York	San Francisco	Austin\n\
// 20111001	63.4	62.7	72.2\n\
// 20111002	58.0	59.9	67.7\n\
// 20111003	53.3	59.1	69.4\n\
// 20111004	55.7	58.8	68.0\n\
// 20111005	64.2	58.7	72.4\n\
// 20111006	58.8	57.0	77.0\n\
// 20111007	57.9	56.7	82.3\n\
// 20111008	61.8	56.8	78.9\n\
// 20111009	69.3	56.7	68.8\n\
// 20111010	71.2	60.1	68.7\n\
// 20111011	68.7	61.1	70.3\n\
// 20111012	61.8	61.5	75.3\n\
// 20111013	63.0	64.3	76.6\n\
// 20111014	66.9	67.1	66.6\n\
// 20111015	61.7	64.6	68.0\n\
// 20111016	61.8	61.6	70.6\n\
// 20111017	62.8	61.1	71.1\n\
// 20111018	60.8	59.2	70.0\n\
// 20111019	62.1	58.9	61.6\n\
// 20111020	65.1	57.2	57.4\n\
// 20111021	55.6	56.4	64.3\n\
// 20111022	54.4	60.7	72.4\n";



	var margin = {
		top: 20,
		right: 80,
		bottom: 30,
		left: 50
	},
		width = 900 - margin.left - margin.right,
		height = 500 - margin.top - margin.bottom;

	// var parseDate = d3.time.format("%Y%m%d").parse;
	var parseDate = d3.time.format("%Y-%m-%d %H:%M:%S").parse;

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
	var svg = d3.select("body").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


	// var data = d3.tsv.parse(myData);
	let data = d3.csv.parse(myData);

	// debugger


	// data.forEach(d => {
	// 	d.date = parseDate(d.date);
	// });


	data = data.map(el => {
		let price = (parseFloat(el.open) + parseFloat(el.close)).toFixed(2) / 2;
		return { date: parseDate(el.timestamp), price }
	})



	
	// var cities = ['San Francisco'].map(function (name) {
	// 	return {
	// 		name: name,
	// 		values: data.map(function (d) {
	// 			return {
	// 				date: d.date,
	// 				temperature: +d[name]
	// 			};
	// 		})
	// 	};
	// });


	var cities = ['price'].map(function (name) {
		return {
			name: name,
			values: data.map(function (d) {
				return {
					date: d.date,
					temperature: +d[name]
				};
			})
		};
	});

	// debugger




	x.domain(d3.extent(data, function (d) {
		return d.date;
	}));

	y.domain([
		d3.min(cities, function (c) {
			return d3.min(c.values, function (v) {
				return v.temperature;
			});
		}),
		d3.max(cities, function (c) {
			return d3.max(c.values, function (v) {
				return v.temperature;
			});
		})
	]);


	var city = svg.selectAll(".city")
		.data(cities)
		.enter().append("g")
		.attr("class", "city");

	city.append("path")
		.attr("class", "line")
		.attr("d", function (d) {
			return line(d.values);
		})
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
		.attr("transform", "translate(10,3)");

	mouseG.append('svg:rect') // append a rect to catch mouse movements on canvas
		.attr('width', width) // can't catch mouse events on a g element
		.attr('height', height)
		.attr('fill', 'none')
		.attr('pointer-events', 'all')
		.on('mouseout', function () { // on mouse out hide line, circles and text
			d3.select(".mouse-line")
				.style("opacity", "0");
			d3.selectAll(".mouse-per-line text")
				.style("opacity", "0");
		})
		.on('mouseover', function () { // on mouse in show line, circles and text
			d3.select(".mouse-line")
				.style("opacity", "1");
			d3.selectAll(".mouse-per-line text")
				.style("opacity", "1");
		})
		.on('mousemove', function () { // mouse moving over canvas
			var mouse = d3.mouse(this);
			d3.select(".mouse-line")
				.attr("d", function () {
					var d = "M" + mouse[0] + "," + height;
					d += " " + mouse[0] + "," + 0;
					return d;
				});

			d3.selectAll(".mouse-per-line")
				.attr("transform", function (d, i) {
					// console.log(width / mouse[0])
					var xDate = x.invert(mouse[0]),
						bisect = d3.bisector(function (d) { return d.date; }).right;
					idx = bisect(d.values, xDate);

					var beginning = 0,
						end = lines[i].getTotalLength(),
						target = null;

					while (true) {
						target = Math.floor((beginning + end) / 2);
						pos = lines[i].getPointAtLength(target);
						if ((target === end || target === beginning) && pos.x !== mouse[0]) {
							break;
						}
						if (pos.x > mouse[0]) end = target;
						else if (pos.x < mouse[0]) beginning = target;
						else break; //position found
					}

					d3.select(this).select('text')
						.text(y.invert(pos.y).toFixed(2));

					return "translate(" + mouse[0] + "," + pos.y + ")";
					// return "translate(0, 0)";
				});
		});
})