function makeResponsive() {
    var svgArea = d3.select("body").select("svg");

    if (!svgArea.empty()) {
        svgArea.remove();
    }

    var svgWidth = window.innerWidth;
    var svgHeight = window.innerHeight;

    var margin = {
        top: 50,
        bottom: 50,
        right: 50,
        left: 50
    };

    var height = svgHeight - margin.top - margin.bottom;
    var width = svgWidth - margin.left - margin.right;

    var svg = d3
        .select(".scatter")
        .append("svg")
        .attr("height", svgHeight)
        .attr("width", svgWidth);

    var chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    d3.csv("Homework016/Homework/Instructions/StarterCode/assets/data/data.csv").then(function(data) {

        console.log(data);

        data.forEach(function(d) {
            d.age = +d.age;
            d.smokes = +d.smokes;
            d.name = +d.name;
        })

        var x = d3.scale().range([0, width]);
        var y = d3.scale.linear().range([height, 0]);

        var xAxis = d3.svg.axis().scale(x)
            .orient("bottom").ticks(5);

        var yAxis = d3.svg.axis().scale(y)
            .orient("left").ticks(5);

        x.domain(d3.extent(data, function(d) { return d.age; }));
        y.domain([0, d3.max(data, function(d) { return d.smokes; })]);

        chartGroup.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(xAxis);

        chartGroup.append("g")
            .call(yAxis);

        chartGroup.selectAll("circle")
            .data(data)
            .enter().append("circle")
            .attr("r", 5)
            .attr("cx", function(d) { return x(d.age); })
            .attr("cy", function(d) { return y(d.smokes); })
            .attr("fill", "blue");

    }).catch(function(error) {
        console.log(error);
    });
}

makeResponsive();

d3.select(window).on("resize", makeResponsive);