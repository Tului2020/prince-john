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
			callBackFunc(data)
		})
}



getIntraDay('TSLA')((myData) => {

	var margin = {
		top: 20,
		right: 80,
		bottom: 30,
		left: 50
	},
		width = 900 - margin.left - margin.right,
		height = 500 - margin.top - margin.bottom;

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
	var svg = d3.select("body").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


	let data = d3.csv.parse(myData);
	let mappedData = {};



	data = data.map(el => {
		let price = (parseFloat(el.open) + parseFloat(el.close)).toFixed(2) / 2;
		let date = parseDate(el.timestamp);
		mappedData[date] = price;
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