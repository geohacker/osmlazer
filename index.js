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
    if (tags.hasOwnProperty('highway') && tags.highway === 'primary') {
        if (countJson.hasOwnProperty('primary')){
          countJson['primary']++;
        } else {
          countJson['primary'] = 1;
        }

    }
    if (tags.hasOwnProperty('highway') && tags.highway === 'primary_link') {
        if (countJson.hasOwnProperty('primary_link')){
          countJson['primary_link']++;
        } else {
          countJson['primary_link'] = 1;
        }

    }
    if (tags.hasOwnProperty('highway') && tags.highway === 'secondary') {
        if (countJson.hasOwnProperty('secondary')){
          countJson['secondary']++;
        } else {
          countJson['secondary'] = 1;
        }

    }
    if (tags.hasOwnProperty('highway') && tags.highway === 'secondary_link') {
        if (countJson.hasOwnProperty('secondary_link')){
          countJson['secondary_link']++;
        } else {
          countJson['secondary_link'] = 1;
        }

    }
    if (tags.hasOwnProperty('highway') && tags.highway === 'tertiary') {
        if (countJson.hasOwnProperty('tertiary')){
          countJson['tertiary']++;
        } else {
          countJson['tertiary'] = 1;
        }

    }
    if (tags.hasOwnProperty('highway') && tags.highway === 'tertiary_link') {
        if (countJson.hasOwnProperty('tertiary_link')){
          countJson['tertiary_link']++;
        } else {
          countJson['tertiary_link'] = 1;
        }

    }
    if (tags.hasOwnProperty('highway') && tags.highway === 'motorway') {
        if (countJson.hasOwnProperty('motorway')){
          countJson['motorway']++;
        } else {
          countJson['motorway'] = 1;
        }

    }
    if (tags.hasOwnProperty('highway') && tags.highway === 'motorway_link') {
        if (countJson.hasOwnProperty('motorway_link')){
          countJson['motorway_link']++;
        } else {
          countJson['motorway_link'] = 1;
        }

    }
    if (tags.hasOwnProperty('highway') && tags.highway === 'trunk') {
        if (countJson.hasOwnProperty('trunk')){
          countJson['trunk']++;
        } else {
          countJson['trunk'] = 1;
        }

    }
    if (tags.hasOwnProperty('highway') && tags.highway === 'trunk_link') {
        if (countJson.hasOwnProperty('trunk_link')){
          countJson['trunk_link']++;
        } else {
          countJson['trunk_link'] = 1;
        }

    }
    if (tags.hasOwnProperty('highway') && tags.highway === 'residential') {
        if (countJson.hasOwnProperty('residential')){
          countJson['residential']++;
        } else {
          countJson['residential'] = 1;
        }

    }
    if (tags.hasOwnProperty('highway') && tags.highway === 'unclassified') {
        if (countJson.hasOwnProperty('unclassified')){
          countJson['unclassified']++;
        } else {
          countJson['unclassified'] = 1;
        }

    }
     if (tags.hasOwnProperty('highway') && tags.highway === 'service') {
        if (countJson.hasOwnProperty('service')){
          countJson['service']++;
        } else {
          countJson['service'] = 1;
        }

    }
    if (tags.hasOwnProperty('highway') && tags.highway === 'living_street') {
        if (countJson.hasOwnProperty('living_street')){
          countJson['living_street']++;
        } else {
          countJson['living_street'] = 1;
        }

    }
});

stream.on('end', function() {
    process.stderr.write(JSON.stringify(countJson) + '\n');
    
});
