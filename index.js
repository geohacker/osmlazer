var osmium = require('osmium');
var argv = require('minimist')(process.argv.slice(2));
var ff = require('feature-filter');
var fs = require('fs');


var file = new osmium.File(argv.file);
var reader = new osmium.Reader(file);
var stream = new osmium.Stream(new osmium.Reader(file));

var countJson = {};

stream.on('data', function (data) {
    var f;
    var tags = data.tags();
    if (tags.hasOwnProperty('type') && tags.type === 'restriction') {
        if (countJson.hasOwnProperty('restriction')){
          countJson['restriction']++;
        } else {
          countJson['restriction'] = 1;
        }

    }
    if (tags.hasOwnProperty('building')) {
        if (countJson.hasOwnProperty('buildings')){
          countJson['buildings']++;
        } else {
          countJson['buildings'] = 1;
        }

    }
    if (tags.hasOwnProperty('building') && tags.hasOwnProperty('height')) {
        if (countJson.hasOwnProperty('3D_buildings')){
          countJson['3D_buildings']++;
        } else {
          countJson['3D_buildings'] = 1;
        }

    }
});

stream.on('end', function() {
    process.stderr.write(JSON.stringify(countJson) + '\n');
    
});
