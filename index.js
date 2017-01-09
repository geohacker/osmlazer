var osmium = require('osmium');
var argv = require('minimist')(process.argv.slice(2));
var ff = require('feature-filter');
var fs = require('fs');

var file = new osmium.File(argv.file);
var reader = new osmium.Reader(file);
var location_handler = new osmium.LocationHandler("dense_mmap_array");
var stream = new osmium.Stream(new osmium.Reader(file, location_handler));
var count =0, wikidata_count=0, both_count=0, just_wikidata_count=0, just_wikipedia_count=0, notag_count = 0;


stream.on('data', function (data) {
  var f;
  var tags = data.tags();
  if (tags.hasOwnProperty('place') && tags.place === 'neighbourhood'  && data.type === 'node') {
    count++;
    if (tags.hasOwnProperty('wikidata')){
      try {
        f = getFeature(data);
        console.log(JSON.stringify(f));
        wikidata_count++;
        
      } catch (e) {
        return;
      }
    } 
    if(tags.hasOwnProperty('wikidata') && tags.hasOwnProperty('wikipedia')){
      both_count++;

    }
    if(tags.hasOwnProperty('wikidata') && !tags.hasOwnProperty('wikipedia')){
      just_wikidata_count++;

    }
    if(!tags.hasOwnProperty('wikidata') && tags.hasOwnProperty('wikipedia')){
      just_wikipedia_count++;

    }
    if(!tags.hasOwnProperty('wikidata') && !tags.hasOwnProperty('wikipedia')){
      notag_count++;

    }
  }
});

stream.on('end', function() {
  process.stderr.write('Total number of countries: '+JSON.stringify(count) + '\n');
  process.stderr.write('Wikidata: '+ JSON.stringify(wikidata_count) + '\n');
  process.stderr.write('Only wikidata: '+JSON.stringify(just_wikidata_count)+'\n');
  process.stderr.write('Only wikipedia: '+JSON.stringify(just_wikipedia_count)+'\n');
  process.stderr.write('Both: '+JSON.stringify(both_count)+'\n');
  process.stderr.write('None: '+JSON.stringify(notag_count)+'\n');
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
