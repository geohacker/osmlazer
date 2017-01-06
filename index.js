var osmium = require('osmium');
var argv = require('minimist')(process.argv.slice(2));
var ff = require('feature-filter');
var turf = require('turf');
var lineDistance = require('turf-line-distance');

var fs = require('fs');

var file = new osmium.File(argv.file);
var reader = new osmium.Reader(file);
var location_handler = new osmium.LocationHandler("dense_mmap_array");
var handler = new osmium.Handler();
osmium.apply(reader, location_handler, handler);
var stream = new osmium.Stream(new osmium.Reader(file, location_handler));

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
    if (tags.hasOwnProperty('highway') && tags.hasOwnProperty('turn:lanes')) {
        if (countJson.hasOwnProperty('turn_lanes')){
          countJson['turn_lanes']++;
        } else {
          countJson['turn_lanes'] = 1;
        }

    }

    if (tags.hasOwnProperty('highway') && tags.hasOwnProperty('destination')) {
        if (countJson.hasOwnProperty('destination')){
          countJson['destination']++;
        } else {
          countJson['destination'] = 1;
        }
   }
   if (tags.hasOwnProperty('highway') && tags.highway === 'motorway_junction' && tags.hasOwnProperty('ref')) {
        if (countJson.hasOwnProperty('exit')){
          countJson['exit']++;
        } else {
          countJson['exit'] = 1;
        }
   }
   if (tags.hasOwnProperty('highway') && tags.hasOwnProperty('oneway') && tags.oneway === 'yes') {
        
        if (countJson.hasOwnProperty('oneway')){
          countJson['oneway']++;
        } else {
          countJson['oneway'] = 1;
        }
        //if (countJson.hasOwnProperty('l_oneway')){
          //countJson['l_oneway'] = countJson['l_oneway'] + turf.lineDistance(geometry, 'kilometers');
        //} else {
          //countJson['oneway'] = turf.lineDistance(geometry, 'kilometers');
        ///}

  }
  if (tags.hasOwnProperty('building') && (data.type==='way' || data.type === 'relation')) {
        if (countJson.hasOwnProperty('buildings')){
          countJson['buildings']++;
        } else {
          countJson['buildings'] = 1;
        }

    }
    if (tags.hasOwnProperty('building') && tags.hasOwnProperty('height') && (data.type ==='way' || data.type === 'relation')) {
        if (countJson.hasOwnProperty('3D_buildings')){
          countJson['3D_buildings']++;
        } else {
          countJson['3D_buildings'] = 1;
        }

    }
    if (tags.hasOwnProperty('wikidata')) {
        if (countJson.hasOwnProperty('wikidata')){
          countJson['wikidata']++;
        } else {
          countJson['wikidata'] = 1;
        }

    }
    if (tags.hasOwnProperty('highway') && tags.highway === 'primary') {
     var length = turf.lineDistance(data.geojson(), 'kilometers');
     if (countJson.hasOwnProperty('l_primary')){
        countJson['l_primary'] = length + countJson['l_primary'];
     } else {
        countJson['l_primary']=length;
     } 
     if (countJson.hasOwnProperty('primary')){
        countJson['primary']++;
        } else {
          countJson['primary'] = 1;
      }

    }
    if (tags.hasOwnProperty('highway') && tags.highway === 'primary_link') {
      var length = turf.lineDistance(data.geojson(), 'kilometers');
     if (countJson.hasOwnProperty('l_primary_link')){
        countJson['l_primary_link'] = length + countJson['l_primary_link'];
     } else {
        countJson['l_primary_link']=length;
     } 
        if (countJson.hasOwnProperty('primary_link')){
          countJson['primary_link']++;
        } else {
          countJson['primary_link'] = 1;
        }

    }
    if (tags.hasOwnProperty('highway') && tags.highway === 'secondary') {
      var length = turf.lineDistance(data.geojson(), 'kilometers');
     if (countJson.hasOwnProperty('l_secondary')){
        countJson['l_secondary'] = length + countJson['l_secondary'];
     } else {
        countJson['l_secondary']=length;
     } 
        if (countJson.hasOwnProperty('secondary')){
          countJson['secondary']++;
        } else {
          countJson['secondary'] = 1;
        }

    }
    if (tags.hasOwnProperty('highway') && tags.highway === 'secondary_link') {
       var length = turf.lineDistance(data.geojson(), 'kilometers');
     if (countJson.hasOwnProperty('l_secondary_link')){
        countJson['l_secondary_link'] = length + countJson['l_secondary_link'];
     } else {
        countJson['l_secondary_link']=length;
     } 
        if (countJson.hasOwnProperty('secondary_link')){
          countJson['secondary_link']++;
        } else {
          countJson['secondary_link'] = 1;
        }

    }
    if (tags.hasOwnProperty('highway') && tags.highway === 'tertiary') {
       var length = turf.lineDistance(data.geojson(), 'kilometers');
     if (countJson.hasOwnProperty('l_tertiary')){
        countJson['l_tertiary'] = length + countJson['l_tertiary'];
     } else {
        countJson['l_tertiary']=length;
     } 
        if (countJson.hasOwnProperty('tertiary')){
          countJson['tertiary']++;
        } else {
          countJson['tertiary'] = 1;
        }

    }
    if (tags.hasOwnProperty('highway') && tags.highway === 'tertiary_link') {
      var length = turf.lineDistance(data.geojson(), 'kilometers');
     if (countJson.hasOwnProperty('l_tertiary_link')){
        countJson['l_tertiary_link'] = length + countJson['l_tertiary_link'];
     } else {
        countJson['l_tertiary_link']=length;
     } 
        if (countJson.hasOwnProperty('tertiary_link')){
          countJson['tertiary_link']++;
        } else {
          countJson['tertiary_link'] = 1;
        }

    }
    if (tags.hasOwnProperty('highway') && tags.highway === 'motorway') {
      var length = turf.lineDistance(data.geojson(), 'kilometers');
     if (countJson.hasOwnProperty('l_motorway')){
        countJson['l_motorway'] = length + countJson['l_motorway'];
     } else {
        countJson['l_motorway']=length;
     } 
        if (countJson.hasOwnProperty('motorway')){
          countJson['motorway']++;
        } else {
          countJson['motorway'] = 1;
        }

    }
    if (tags.hasOwnProperty('highway') && tags.highway === 'motorway_link') {
       var length = turf.lineDistance(data.geojson(), 'kilometers');
     if (countJson.hasOwnProperty('l_motorway_link')){
        countJson['l_motorway_link'] = length + countJson['l_motorway_link'];
     } else {
        countJson['l_motorway_link']=length;
     } 
        if (countJson.hasOwnProperty('motorway_link')){
          countJson['motorway_link']++;
        } else {
          countJson['motorway_link'] = 1;
        }

    }
    if (tags.hasOwnProperty('highway') && tags.highway === 'trunk') {
       var length = turf.lineDistance(data.geojson(), 'kilometers');
     if (countJson.hasOwnProperty('l_trunk')){
        countJson['l_trunk'] = length + countJson['l_trunk'];
     } else {
        countJson['l_trunk']=length;
     } 
        if (countJson.hasOwnProperty('trunk')){
          countJson['trunk']++;
        } else {
          countJson['trunk'] = 1;
        }

    }
    if (tags.hasOwnProperty('highway') && tags.highway === 'trunk_link') {
       var length = turf.lineDistance(data.geojson(), 'kilometers');
     if (countJson.hasOwnProperty('l_trunk_link')){
        countJson['l_trunk_link'] = length + countJson['l_trunk_link'];
     } else {
        countJson['l_trunk_link']=length;
     } 
        if (countJson.hasOwnProperty('trunk_link')){
          countJson['trunk_link']++;
        } else {
          countJson['trunk_link'] = 1;
        }

    }
    if (tags.hasOwnProperty('highway') && tags.highway === 'residential') {
       var length = turf.lineDistance(data.geojson(), 'kilometers');
     if (countJson.hasOwnProperty('l_residential')){
        countJson['l_residential'] = length + countJson['l_residential'];
     } else {
        countJson['l_residential']=length;
     } 
        if (countJson.hasOwnProperty('residential')){
          countJson['residential']++;
        } else {
          countJson['residential'] = 1;
        }

    }
    if (tags.hasOwnProperty('highway') && tags.highway === 'unclassified') {
       var length = turf.lineDistance(data.geojson(), 'kilometers');
     if (countJson.hasOwnProperty('l_unclassified')){
        countJson['l_unclassified'] = length + countJson['l_unclassified'];
     } else {
        countJson['l_unclassified']=length;
     } 
        if (countJson.hasOwnProperty('unclassified')){
          countJson['unclassified']++;
        } else {
          countJson['unclassified'] = 1;
        }

    }
     if (tags.hasOwnProperty('highway') && tags.highway === 'service') {
       var length = turf.lineDistance(data.geojson(), 'kilometers');
     if (countJson.hasOwnProperty('l_service')){
        countJson['l_service'] = length + countJson['l_service'];
     } else {
        countJson['l_service']=length;
     } 
        if (countJson.hasOwnProperty('service')){
          countJson['service']++;
        } else {
          countJson['service'] = 1;
        }

    }
    if (tags.hasOwnProperty('highway') && tags.highway === 'living_street') {
       var length = turf.lineDistance(data.geojson(), 'kilometers');
     if (countJson.hasOwnProperty('l_living_street')){
        countJson['l_living_street'] = length + countJson['l_living_street'];
     } else {
        countJson['l_living_street']=length;
     } 
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
