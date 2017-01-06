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
        if countJson.hasOwnProperty('restriction'){
          countJson['restriction'] = countJson['restriction']+1;
        } else {
          countJson['restriction'] = 1;
        }

        
   }
});

stream.on('end', function() {
    process.stderr.write(JSON.stringify(countJson) + '\n');
    
});
