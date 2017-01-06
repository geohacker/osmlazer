var osmium = require('osmium');
var argv = require('minimist')(process.argv.slice(2));
var ff = require('feature-filter');
var fs = require('fs');
var team = require('mapbox-data-team').getUsernames();

var file = new osmium.File(argv.file);
var reader = new osmium.Reader(file);
var stream = new osmium.Stream(new osmium.Reader(file));

var mapboxCount = 0;
var otherCount = 0;
var countJson = {};

stream.on('data', function (data) {
    var f;
    var tags = data.tags();
    if (tags.hasOwnProperty('type') && tags.type === 'restriction') {
        if countJson.hasOwnProperty('restriction'){
          countJson['restriction'] = countJson['restriction']+1;
        } else {
          countJson['restriction'] = 1;
        }

        if (!(team.indexOf(data.user) < 0 )) {
           mapboxCount = mapboxCount + 1;
       } else {
        otherCount = otherCount + 1
       }
   }
});

stream.on('end', function() {
    process.stderr.write(countJson + '\n');
    
});
