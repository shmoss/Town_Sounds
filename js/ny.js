// 

var width = 960,
    height = 500,
    centered;

var projection = d3.geo.mercator()
  .scale(1500)
  // Center the Map in Colombia
  .center([-122.4194, 37.7749])
  .translate([width / 2, height / 2]);

// Set svg width & height
var svg = d3.select('svg')
  .attr('width', width)
  .attr('height', height);


// Load map data
d3.json('CA_counties.json', function(error, mapData) {
  var features = mapData.features;  


mapLayer.selectAll('path')
      .data(features)
    .enter().append('path')
      .attr('d', path)
      .attr('vector-effect', 'non-scaling-stroke')
 });

