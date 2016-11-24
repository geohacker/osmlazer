var osmium = require('osmium');
var argv = require('minimist')(process.argv.slice(2));
var ff = require('feature-filter');
var fs = require('fs');

var file = new osmium.File(argv.file);
var reader = new osmium.Reader(file);
var location_handler = new osmium.LocationHandler("dense_mmap_array");
var stream = new osmium.Stream(new osmium.Reader(file, location_handler));

stream.on('data', function (data) {
    var f;
    var tags = data.tags();
    if (tags.hasOwnProperty('wikidata')) {
      try {
        f = getFeature(data);
        console.log(JSON.stringify(f));
      } catch (e) {
        return;
      }
    }
});

stream.on('end', function() {
  process.exit(0);
});

function getFeature(d) {
    var feature = {
        'type': 'Feature',
        'osm_id':d.id,
        'geometry': d.geojson(),
        'properties': d.tags()
    };
    return feature;
}
