var osmium = require('osmium');
var argv = require('minimist')(process.argv.slice(2));
var ff = require('feature-filter');
var fs = require('fs');
var team = require('mapbox-data-team').getUsernames();

var file = new osmium.File(argv.file);
var reader = new osmium.Reader(file);
var location_handler = new osmium.LocationHandler();
var stream = new osmium.Stream(new osmium.Reader(file, location_handler));

var mapboxCount = 0;
var otherCount = 0;

stream.on('data', function (data) {
    var f;
    var tags = data.tags();
    if (tags.hasOwnProperty('type') && tags.type === 'restriction') {
        if (!(team.indexOf(data.user) < 0 )) {
           mapboxCount = mapboxCount + 1;
       } else {
        otherCount = otherCount + 1
       }
   }
});

stream.on('end', function() {
    process.stderr.write('TR by Mapbox: ' + String(mapboxCount) + '\n');
    process.stderr.write('TR by Others: ' + String(otherCount) + '\n');
});
