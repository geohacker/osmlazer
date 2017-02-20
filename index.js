var osmium = require('osmium');
var argv = require('minimist')(process.argv.slice(2));
var turf = require('turf');
var lineDistance = require('turf-line-distance');

var fs = require('fs');

var file = new osmium.File(argv.file);
var reader = new osmium.Reader(file);
var location_handler = new osmium.LocationHandler();
var handler = new osmium.Handler();
osmium.apply(reader, location_handler, handler);
var stream = new osmium.Stream(new osmium.Reader(file, location_handler));

var countJson = {};
var addrID_n = [];
var addrID_w = [];
var addrID_r = [];

if (argv.mode === 'basemap'){


  stream.on('data', function (data) {
    var tags = data.tags();

    if (tags.hasOwnProperty('place') && tags.place === 'village' && data.type === 'node') {

      if (countJson.hasOwnProperty('village')){
        countJson['village']++;
      } else {
        countJson['village'] = 1;
      }

    }
    if (tags.hasOwnProperty('place') && tags.place === 'suburb' && data.type === 'node') {
      if (countJson.hasOwnProperty('suburb')){
        countJson['suburb']++;
      } else {
        countJson['suburb'] = 1;
      }

    }
    if (tags.hasOwnProperty('place') && tags.place === 'neighbourhood' && data.type === 'node') {       
      if (countJson.hasOwnProperty('neighbourhood')){
        countJson['neighbourhood']++;
      } else {
        countJson['neighbourhood'] = 1;
      }

    }
    if (tags.hasOwnProperty('place') && tags.place === 'city' && data.type === 'node') {       
      if (countJson.hasOwnProperty('city')){
        countJson['city']++;
      } else {
        countJson['city'] = 1;
      }

    }
    if (tags.hasOwnProperty('place') && tags.place === 'hamlet' && data.type === 'node') {       
      if (countJson.hasOwnProperty('hamlet')){
        countJson['hamlet']++;
      } else {
        countJson['hamlet'] = 1;
      }

    }
    if (tags.hasOwnProperty('place') && tags.place === 'town' && data.type === 'node') {       
      if (countJson.hasOwnProperty('town')){
        countJson['town']++;
      } else {
        countJson['town'] = 1;
      }

    }
    if (tags.hasOwnProperty('waterway') && data.type === 'way' && (tags.waterway === 'river' || tags.waterway === 'stream' || tags.waterway === 'canal')) {

      if (countJson.hasOwnProperty('waterway')){
        countJson['waterway']++;
      } else {
        countJson['waterway'] = 1;
      }
      if (tags.hasOwnProperty('name')){
        if (countJson.hasOwnProperty('named_waterway')){
          countJson['named_waterway']++;
        } else {
          countJson['named_waterway'] = 1;
        }

      }

    }
  
 
    if (tags.hasOwnProperty('type') && tags.type === 'restriction') {       
      if (countJson.hasOwnProperty('restriction')){
        countJson['restriction']++;
      } else {
        countJson['restriction'] = 1;
      }

    }

    if (tags.hasOwnProperty('leisure') && tags.leisure === 'park' && data.type === 'way') {       
      if (countJson.hasOwnProperty('park')){
        countJson['park']++;
      } else {
        countJson['park'] = 1;
      }
      if (tags.hasOwnProperty('name')){
        if (countJson.hasOwnProperty('named_park')){
          countJson['named_park']++;
        } else {
          countJson['named_park'] = 1;
        }

      }
      

    }
    if (tags.hasOwnProperty('highway') && (tags.hasOwnProperty('turn:lanes') || tags.hasOwnProperty('turn:lanes:backward') || tags.hasOwnProperty('turn:lanes:forward'))){

      if (countJson.hasOwnProperty('turn_lanes')){
        countJson['turn_lanes']++;
      } else {
        countJson['turn_lanes'] = 1;
      }

    }

    if (tags.hasOwnProperty('highway') && (tags.hasOwnProperty('destination')) || tags.hasOwnProperty('destination:street') ) {
       
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
      try{    
        var length = turf.lineDistance(data.geojson(), 'kilometers');
        if (countJson.hasOwnProperty('l_oneway')){
          countJson['l_oneway'] = length + countJson['l_oneway'];
        } else {
          countJson['l_oneway']=length;
        }} catch (e){}
      if (countJson.hasOwnProperty('oneway')){
        countJson['oneway']++;
      } else {
        countJson['oneway'] = 1;
      }
    }
    if (tags.hasOwnProperty('highway') && tags.hasOwnProperty('name')) {

      try{    
        var length = turf.lineDistance(data.geojson(), 'kilometers');
        if (countJson.hasOwnProperty('l_named_highway')){
          countJson['l_named_highway'] = length + countJson['l_named_highway'];
        } else {
          countJson['l_named_highway']=length;
        }} catch (e){}
      if (countJson.hasOwnProperty('named_highway')){
        countJson['named_highway']++;
      } else {
        countJson['named_highway'] = 1;
      }

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
      try{   
        var length = turf.lineDistance(data.geojson(), 'kilometers');
        if (countJson.hasOwnProperty('l_primary')){
          countJson['l_primary'] = length + countJson['l_primary'];
        } else {
          countJson['l_primary']=length;
        } 
        if (tags.hasOwnProperty('name') || tags.hasOwnProperty('ref') ){
          if (countJson.hasOwnProperty('named_primary')){
            countJson['named_primary'] = length + countJson['named_primary'];
          } else {
            countJson['named_primary']=length;
          }
        }
        if (tags.hasOwnProperty('oneway') || tags.oneway ==='yes' ){
          if (countJson.hasOwnProperty('oneway_primary')){
            countJson['oneway_primary'] = length + countJson['oneway_primary'];
          } else {
            countJson['oneway_primary']=length;
          }
        }
      }
       catch(e){}

       
      if (countJson.hasOwnProperty('primary')){
        countJson['primary']++;
      } else {
        countJson['primary'] = 1;
      }
      

    }
    if (tags.hasOwnProperty('highway') && tags.highway === 'primary_link') {
      try{    
        var length = turf.lineDistance(data.geojson(), 'kilometers');
        if (countJson.hasOwnProperty('l_primary_link')){
          countJson['l_primary_link'] = length + countJson['l_primary_link'];
        } else {
          countJson['l_primary_link']=length;
        } 
        if (tags.hasOwnProperty('name') || tags.hasOwnProperty('ref')){
          if (countJson.hasOwnProperty('named_primary_link')){
            countJson['named_primary_link'] = length + countJson['named_primary_link'];
          } else {
            countJson['named_primary_link']=length;
          }
        }
        if (tags.hasOwnProperty('oneway') || tags.oneway ==='yes' ){
          if (countJson.hasOwnProperty('oneway_primary_link')){
            countJson['oneway_primary_link'] = length + countJson['oneway_primary_link'];
          } else {
            countJson['oneway_primary_link']=length;
          }
        }
      }
      catch(e){}
      if (countJson.hasOwnProperty('primary_link')){
        countJson['primary_link']++;
      } else {
        countJson['primary_link'] = 1;
      }

    }
    if (tags.hasOwnProperty('highway') && tags.highway === 'secondary') {
      try{     
        var length = turf.lineDistance(data.geojson(), 'kilometers');
        if (countJson.hasOwnProperty('l_secondary')){
          countJson['l_secondary'] = length + countJson['l_secondary'];
        } else {
          countJson['l_secondary']=length;
        } 
        if (tags.hasOwnProperty('name')|| tags.hasOwnProperty('ref')){
          if (countJson.hasOwnProperty('named_secondary')){
            countJson['named_secondary'] = length + countJson['named_secondary'];
          } else {
            countJson['named_secondary']=length;
          }
        }
        if (tags.hasOwnProperty('oneway') || tags.oneway ==='yes' ){
          if (countJson.hasOwnProperty('oneway_secondary')){
            countJson['oneway_secondary'] = length + countJson['oneway_secondary'];
          } else {
            countJson['oneway_secondary']=length;
          }
        }
      }
      catch(e){}
      if (countJson.hasOwnProperty('secondary')){
        countJson['secondary']++;
      } else {
        countJson['secondary'] = 1;
      }

    }
    if (tags.hasOwnProperty('highway') && tags.highway === 'secondary_link') {
      try{    
        var length = turf.lineDistance(data.geojson(), 'kilometers');
        if (countJson.hasOwnProperty('l_secondary_link')){
          countJson['l_secondary_link'] = length + countJson['l_secondary_link'];
        } else {
          countJson['l_secondary_link']=length;
        }
        if (tags.hasOwnProperty('name') || tags.hasOwnProperty('ref')){
          if (countJson.hasOwnProperty('named_secondary_link')){
            countJson['named_secondary_link'] = length + countJson['named_secondary_link'];
          } else {
            countJson['named_secondary_link']=length;
          }
        } 
        if (tags.hasOwnProperty('oneway') || tags.oneway ==='yes' ){
          if (countJson.hasOwnProperty('oneway_secondary_link')){
            countJson['oneway_secondary_link'] = length + countJson['oneway_secondary_link'];
          } else {
            countJson['oneway_secondary_link']=length;
          }
        }
      }
   catch(e){}
      if (countJson.hasOwnProperty('secondary_link')){
        countJson['secondary_link']++;
      } else {
        countJson['secondary_link'] = 1;
      }

    }
    if (tags.hasOwnProperty('highway') && tags.highway === 'tertiary') {
      try{     
        var length = turf.lineDistance(data.geojson(), 'kilometers');
        if (countJson.hasOwnProperty('l_tertiary')){
          countJson['l_tertiary'] = length + countJson['l_tertiary'];
        } else {
          countJson['l_tertiary']=length;
        } 
        if (tags.hasOwnProperty('name') || tags.hasOwnProperty('ref')){
          if (countJson.hasOwnProperty('named_tertiary')){
            countJson['named_tertiary'] = length + countJson['named_tertiary'];
          } else {
            countJson['named_tertiary']=length;
          }
        }
        if (tags.hasOwnProperty('oneway') || tags.oneway ==='yes' ){
          if (countJson.hasOwnProperty('oneway_tertiary')){
            countJson['oneway_tertiary'] = length + countJson['oneway_tertiary'];
          } else {
            countJson['oneway_tertiary']=length;
          }
        }
      }
     catch(e){}
      if (countJson.hasOwnProperty('tertiary')){
        countJson['tertiary']++;
      } else {
        countJson['tertiary'] = 1;
      }

    }
    if (tags.hasOwnProperty('highway') && tags.highway === 'tertiary_link') {
      try{    
        var length = turf.lineDistance(data.geojson(), 'kilometers');
        if (countJson.hasOwnProperty('l_tertiary_link')){
          countJson['l_tertiary_link'] = length + countJson['l_tertiary_link'];
        } else {
          countJson['l_tertiary_link']=length;
        } 
        if (tags.hasOwnProperty('name') || tags.hasOwnProperty('ref')){
          if (countJson.hasOwnProperty('named_tertiary_link')){
            countJson['named_tertiary_link'] = length + countJson['named_tertiary_link'];
          } else {
            countJson['named_tertiary_link']=length;
          }
        }
        if (tags.hasOwnProperty('oneway') || tags.oneway ==='yes' ){
          if (countJson.hasOwnProperty('oneway_tertiary_link')){
            countJson['oneway_tertiary_link'] = length + countJson['oneway_tertiary_link'];
          } else {
            countJson['oneway_tertiary_link']=length;
          }
        }
      }
    catch(e){}    
      if (countJson.hasOwnProperty('tertiary_link')){
        countJson['tertiary_link']++;
      } else {
        countJson['tertiary_link'] = 1;
      }

    }
    if (tags.hasOwnProperty('highway') && tags.highway === 'motorway') {
      try{    
        var length = turf.lineDistance(data.geojson(), 'kilometers');
        if (countJson.hasOwnProperty('l_motorway')){
          countJson['l_motorway'] = length + countJson['l_motorway'];
        } else {
          countJson['l_motorway']=length;
        } 
        if (tags.hasOwnProperty('name') || tags.hasOwnProperty('ref')){
          if (countJson.hasOwnProperty('named_motorway')){
            countJson['named_motorway'] = length + countJson['named_motorway'];
          } else {
            countJson['named_motorway']=length;
          }
        }
        if (tags.hasOwnProperty('oneway') || tags.oneway ==='yes'){
          if (countJson.hasOwnProperty('oneway_motorway')){
            countJson['oneway_motorway'] = length + countJson['oneway_motorway'];
          } else {
            countJson['oneway_motorway']=length;
          }
        }}
     catch(e){}
      if (countJson.hasOwnProperty('motorway')){
        countJson['motorway']++;
      } else {
        countJson['motorway'] = 1;
      }

    }
    if (tags.hasOwnProperty('highway') && tags.highway === 'motorway_link') {
      try{    
        var length = turf.lineDistance(data.geojson(), 'kilometers');
        if (countJson.hasOwnProperty('l_motorway_link')){
          countJson['l_motorway_link'] = length + countJson['l_motorway_link'];
        } else {
          countJson['l_motorway_link']=length;
        } 
        if (tags.hasOwnProperty('name') || tags.hasOwnProperty('ref')){
          if (countJson.hasOwnProperty('named_motorway_link')){
            countJson['named_motorway_link'] = length + countJson['named_motorway_link'];
          } else {
            countJson['named_motorway_link']=length;
          }
        }
        if (tags.hasOwnProperty('oneway') || tags.oneway ==='yes' ){
          if (countJson.hasOwnProperty('oneway_motorway_link')){
            countJson['oneway_motorway_link'] = length + countJson['oneway_motorway_link'];
          } else {
            countJson['oneway_motorway_link']=length;
          }
        }
      }
     catch(e){}
      if (countJson.hasOwnProperty('motorway_link')){
        countJson['motorway_link']++;
      } else {
        countJson['motorway_link'] = 1;
      }

    }
    if (tags.hasOwnProperty('highway') && tags.highway === 'trunk') {
      try{    
        var length = turf.lineDistance(data.geojson(), 'kilometers');
        if (countJson.hasOwnProperty('l_trunk')){
          countJson['l_trunk'] = length + countJson['l_trunk'];
        } else {
          countJson['l_trunk']=length;
        } 
        if (tags.hasOwnProperty('name') || tags.hasOwnProperty('ref')){
          if (countJson.hasOwnProperty('named_trunk')){
            countJson['named_trunk'] = length + countJson['named_trunk'];
          } else {
           countJson['named_trunk']=length;
          }
        }
        if (tags.hasOwnProperty('oneway') || tags.oneway ==='yes' ){
          if (countJson.hasOwnProperty('oneway_primary')){
            countJson['oneway_trunk'] = length + countJson['oneway_trunk'];
          } else {
            countJson['oneway_trunk']=length;
          }
        }
      } 
      catch(e) {}
      if (countJson.hasOwnProperty('trunk')){
        countJson['trunk']++;
      } else {
        countJson['trunk'] = 1;
      }

    }
    if (tags.hasOwnProperty('highway') && tags.highway === 'trunk_link') {
      try{     
        var length = turf.lineDistance(data.geojson(), 'kilometers');
        if (countJson.hasOwnProperty('l_trunk_link')){
          countJson['l_trunk_link'] = length + countJson['l_trunk_link'];
        } else {
          countJson['l_trunk_link']=length;
        }
        if (tags.hasOwnProperty('name')|| tags.hasOwnProperty('ref')){
          if (countJson.hasOwnProperty('named_trunk_link')){
            countJson['named_trunk_link'] = length + countJson['named_trunk_link'];
          } else {
            countJson['named_trunk_link']=length;
          }
        }
        if (tags.hasOwnProperty('oneway') || tags.oneway ==='yes'){
          if (countJson.hasOwnProperty('oneway_trunk_link')){
            countJson['oneway_trunk_link'] = length + countJson['oneway_trunk_link'];
          } else {
            countJson['oneway_trunk_link']=length;
          }
        }
      }
     catch(e){} 
      if (countJson.hasOwnProperty('trunk_link')){
        countJson['trunk_link']++;
      } else {
        countJson['trunk_link'] = 1;
      }

    }
    if (tags.hasOwnProperty('highway') && tags.highway === 'residential') {
    
      try{ 
        var length = turf.lineDistance(data.geojson(), 'kilometers');
        if (countJson.hasOwnProperty('l_residential')){
          countJson['l_residential'] = length + countJson['l_residential'];
        } else {
          countJson['l_residential']=length;
        } 
        if (tags.hasOwnProperty('name')){
          if (countJson.hasOwnProperty('named_residential')){
            countJson['named_residential'] = length + countJson['named_residential'];
          } else {
            countJson['named_residential']=length;
          }
        }
        if (tags.hasOwnProperty('oneway') || tags.oneway ==='yes' ){
          if (countJson.hasOwnProperty('oneway_residential')){
            countJson['oneway_residential'] = length + countJson['oneway_residential'];
          } else {
            countJson['oneway_residential']=length;
          }
        }
      }
    catch (e){}    
      if (countJson.hasOwnProperty('residential')){
        countJson['residential']++;
      } else {
        countJson['residential'] = 1;
      }

    }
    if (tags.hasOwnProperty('highway') && tags.highway === 'unclassified') {
      try{    
        var length = turf.lineDistance(data.geojson(), 'kilometers');
        if (countJson.hasOwnProperty('l_unclassified')){
          countJson['l_unclassified'] = length + countJson['l_unclassified'];
        } else {
          countJson['l_unclassified']=length;
        } 
        if (tags.hasOwnProperty('name')){
          if (countJson.hasOwnProperty('named_unclassified')){
            countJson['named_unclassified'] = length + countJson['named_unclassified'];
          } else {
            countJson['named_unclassified']=length;
          }
        }
        if (tags.hasOwnProperty('oneway') || tags.oneway ==='yes' ){
          if (countJson.hasOwnProperty('oneway_unclassified')){
            countJson['oneway_unclassified'] = length + countJson['oneway_unclassified'];
          } else {
            countJson['oneway_unclassified']=length;
          }
        }
      } catch(e){}
      if (countJson.hasOwnProperty('unclassified')){
        countJson['unclassified']++;
      } else {
        countJson['unclassified'] = 1;
      }

    }
    if (tags.hasOwnProperty('highway') && tags.highway === 'service') {

      try{    
        var length = turf.lineDistance(data.geojson(), 'kilometers');
        if (countJson.hasOwnProperty('l_service')){
          countJson['l_service'] = length + countJson['l_service'];
        } else {
          countJson['l_service']=length;
        }
        if (tags.hasOwnProperty('name')){
          if (countJson.hasOwnProperty('named_service')){
            countJson['named_service'] = length + countJson['named_service'];
          } else {
            countJson['named_service']=length;
          }
        }
        if (tags.hasOwnProperty('oneway') || tags.oneway ==='yes' ){
          if (countJson.hasOwnProperty('oneway_trunk_link')){
            countJson['oneway_service'] = length + countJson['oneway_service'];
          } else {
            countJson['oneway_service']=length;
          }
        }} catch (e){}
      if (countJson.hasOwnProperty('service')){
        countJson['service']++;
      } else {
        countJson['service'] = 1;
      }

    }
    if (tags.hasOwnProperty('highway') && tags.highway === 'living_street') {
      try{
     
        var length = turf.lineDistance(data.geojson(), 'kilometers');
        if (countJson.hasOwnProperty('l_living_street')){
          countJson['l_living_street'] = length + countJson['l_living_street'];
        } else {
          countJson['l_living_street']=length;
        }
        if (tags.hasOwnProperty('name')){
          if (countJson.hasOwnProperty('named_living_street')){
            countJson['named_living_street'] = length + countJson['named_living_street'];
          } else {
            countJson['named_living_street']=length;
          }
        } 
        if (tags.hasOwnProperty('oneway') || tags.oneway ==='yes' ){
          if (countJson.hasOwnProperty('oneway_living_street')){
            countJson['oneway_living_street'] = length + countJson['oneway_living_street'];
          } else {
            countJson['oneway_living_street']=length;
          }
        }} catch(e) {}
      if (countJson.hasOwnProperty('living_street')){
        countJson['living_street']++;
      } else {
        countJson['living_street'] = 1;
      }

    }
    if (tags.hasOwnProperty('highway') && tags.highway === 'footway') {
      try{
     
        var length = turf.lineDistance(data.geojson(), 'kilometers');
        if (countJson.hasOwnProperty('l_footway')){
          countJson['l_footway'] = length + countJson['l_footway'];
        } else {
          countJson['l_footway']=length;
        }
      
      } catch(e) {}
      if (countJson.hasOwnProperty('footway')){
        countJson['footway']++;
      } else {
        countJson['footway'] = 1;
      }

    }
    if (tags.hasOwnProperty('highway') && tags.highway === 'track') {
      try{
     
        var length = turf.lineDistance(data.geojson(), 'kilometers');
        if (countJson.hasOwnProperty('l_track')){
          countJson['l_track'] = length + countJson['l_track'];
        } else {
          countJson['l_track']=length;
        }
      
      } catch(e) {}
      if (countJson.hasOwnProperty('track')){
        countJson['track']++;
      } else {
        countJson['track'] = 1;
      }

    }
    if (tags.hasOwnProperty('highway') && tags.highway === 'path') {
      try{
     
        var length = turf.lineDistance(data.geojson(), 'kilometers');
        if (countJson.hasOwnProperty('l_path')){
          countJson['l_path'] = length + countJson['l_path'];
        } else {
          countJson['l_path']=length;
        }
      
      } catch(e) {}
      if (countJson.hasOwnProperty('path')){
        countJson['path']++;
      } else {
        countJson['path'] = 1;
      }

    }

  });
} else if(argv.mode === 'density'){
  console.log('density mode');
  stream.on('data', function (data) {
    var tags = data.tags();
    if (tags.hasOwnProperty('highway') && tags.highway === 'motorway' && tags.hasOwnProperty(argv.asset)) {
    
      if (countJson.hasOwnProperty('motorway')){
        countJson['motorway']++;
      } else {
        countJson['motorway'] = 1;
      }

    }
    if (tags.hasOwnProperty('highway') && tags.highway === 'motorway_link' && tags.hasOwnProperty(argv.asset)) {
    
      if (countJson.hasOwnProperty('motorway_link')){
        countJson['motorway_link']++;
      } else {
        countJson['motorway_link'] = 1;
      }

    }
    if (tags.hasOwnProperty('highway') && tags.highway === 'trunk' && tags.hasOwnProperty(argv.asset)) {
    
      if (countJson.hasOwnProperty('trunk')){
        countJson['trunk']++;
      } else {
        countJson['trunk'] = 1;
      }

    }
    if (tags.hasOwnProperty('highway') && tags.highway === 'trunk_link' && tags.hasOwnProperty(argv.asset)) {
    
      if (countJson.hasOwnProperty('trunk_link')){
        countJson['trunk_link']++;
      } else {
        countJson['trunk_link'] = 1;
      }

    }
    if (tags.hasOwnProperty('highway') && tags.highway === 'primary' && tags.hasOwnProperty(argv.asset)) {
    
      if (countJson.hasOwnProperty('primary')){
        countJson['primary']++;
      } else {
        countJson['primary'] = 1;
      }

    }
    if (tags.hasOwnProperty('highway') && tags.highway === 'primary_link' && tags.hasOwnProperty(argv.asset)) {
    
      if (countJson.hasOwnProperty('primary_link')){
        countJson['primary_link']++;
      } else {
        countJson['primary_link'] = 1;
      }

    }
    if (tags.hasOwnProperty('highway') && tags.highway === 'secondary' && tags.hasOwnProperty(argv.asset)) {
    
      if (countJson.hasOwnProperty('secondary')){
        countJson['secondary']++;
      } else {
        countJson['secondary'] = 1;
      }

    }
    if (tags.hasOwnProperty('highway') && tags.highway === 'secondary_link' && tags.hasOwnProperty(argv.asset)) {
    
      if (countJson.hasOwnProperty('secondary_link')){
        countJson['secondary_link']++;
      } else {
        countJson['secondary_link'] = 1;
      }

    }
    if (tags.hasOwnProperty('highway') && tags.highway === 'tertiary' && tags.hasOwnProperty(argv.asset)) {
    
      if (countJson.hasOwnProperty('tertiary')){
        countJson['tertiary']++;
      } else {
        countJson['tertiary'] = 1;
      }

    }
    if (tags.hasOwnProperty('highway') && tags.highway === 'tertiary_link' && tags.hasOwnProperty(argv.asset)) {
    
      if (countJson.hasOwnProperty('tertiary_link')){
        countJson['tertiary_link']++;
      } else {
        countJson['tertiary_link'] = 1;
      }

    }
    if (tags.hasOwnProperty('highway') && tags.highway === 'residential' && tags.hasOwnProperty(argv.asset)) {
    
      if (countJson.hasOwnProperty('residential')){
        countJson['residential']++;
      } else {
        countJson['residential'] = 1;
      }

    }
    if (tags.hasOwnProperty('highway') && tags.highway === 'unclassified' && tags.hasOwnProperty(argv.asset)) {
    
      if (countJson.hasOwnProperty('unclassified')){
        countJson['unclassified']++;
      } else {
        countJson['unclassified'] = 1;
      }

    }
    if (tags.hasOwnProperty('highway') && tags.highway === 'service' && tags.hasOwnProperty(argv.asset)) {
    
      if (countJson.hasOwnProperty('service')){
        countJson['service']++;
      } else {
        countJson['service'] = 1;
      }

    }

  });

} else if (argv.mode === 'address') {
  
  stream.on('data', function (data) {
    var tags = data.tags();
    Object.keys(tags).forEach(function( key ){
      if (key.indexOf('addr') > -1)
    { 
        if (data.type === 'node'){
        
          if (addrID_n.indexOf(data.id) < 0){
            addrID_n.push(data.id);
          }
        } else if(data.type === 'way'){
          if (addrID_w.indexOf(data.id) < 0){
            addrID_w.push(data.id);
          }
        } else if(data.type === 'relation'){
          if (addrID_r.indexOf(data.id) < 0){
            addrID_r.push(data.id);
          }
        } 
      
      // if (countJson.hasOwnProperty('addr')){
      //   countJson['addr']++;
      // } else {
      //   countJson['addr'] = 1;
      // }
      }
    });

  });
  
 
  
} else if (argv.mode === 'poi') {
  stream.on('data', function (data) {
    var tags = data.tags();
    if(tags.hasOwnProperty('amenity') && tags.hasOwnProperty('name') && (data.type==='way' || data.type === 'node')){
      if (countJson.hasOwnProperty('amenities')){
        countJson['amenities']++;
      } else {
        countJson['amenities'] = 1;
      }
    }
    if(tags.hasOwnProperty('shop') && tags.hasOwnProperty('name') && (data.type==='way' || data.type === 'node')){
      if (countJson.hasOwnProperty('shopping')){
        countJson['shopping']++;
      } else {
        countJson['shopping'] = 1;
      }

    }
    if(tags.hasOwnProperty('tourism') && tags.hasOwnProperty('name') && (data.type==='way' || data.type === 'node')){
      if (countJson.hasOwnProperty('tourism')){
        countJson['tourism']++;
      } else {
        countJson['tourism'] = 1;
      }

    }
    if(tags.hasOwnProperty('historic') && tags.hasOwnProperty('name') && (data.type==='way' || data.type === 'node')){
      if (countJson.hasOwnProperty('tourism')){
        countJson['tourism']++;
      } else {
        countJson['tourism'] = 1;
      }

    }
    if(tags.hasOwnProperty('landuse') && tags.hasOwnProperty('name') && data.type==='way'){
      if (countJson.hasOwnProperty('landuse')){
        countJson['landuse']++;
      } else {
        countJson['landuse'] = 1;
      }

    }
    if(tags.hasOwnProperty('building') && tags.hasOwnProperty('name') && (data.type==='way' || data.type === 'relation')){
      if (countJson.hasOwnProperty('namedBuildings')){
        countJson['namedBuildings']++;
      } else {
        countJson['namedBuildings'] = 1;
      }

    }
    if(tags.hasOwnProperty('office') && tags.hasOwnProperty('name') && (data.type==='way' || data.type === 'node')){
      if (countJson.hasOwnProperty('namedBuildings')){
        countJson['namedBuildings']++;
      } else {
        countJson['namedBuildings'] = 1;
      }

    }
    if(tags.hasOwnProperty('addr:housename') && (data.type==='way' || data.type === 'node')){
      if (countJson.hasOwnProperty('namedBuildings')){
        countJson['namedBuildings']++;
      } else {
        countJson['namedBuildings'] = 1;
      }

    }
     if(tags.hasOwnProperty('highway') && tags.hasOwnProperty('name') &&  data.type === 'node'){
      if (countJson.hasOwnProperty('transport')){
        countJson['transport']++;
      } else {
        countJson['transport'] = 1;
      }

    }
    if(tags.hasOwnProperty('railway') && tags.hasOwnProperty('name') &&  data.type === 'node'){
      if (countJson.hasOwnProperty('transport')){
        countJson['transport']++;
      } else {
        countJson['transport'] = 1;
      }

    }
    if(tags.hasOwnProperty('public_transport') && tags.hasOwnProperty('name') &&  data.type === 'node'){
      if (countJson.hasOwnProperty('transport')){
        countJson['transport']++;
      } else {
        countJson['transport'] = 1;
      }

    }
    if(tags.hasOwnProperty('waterway') && tags.waterway === 'dam' && tags.hasOwnProperty('name') &&  data.type === 'node'){
      if (countJson.hasOwnProperty('infrastructure')){
        countJson['infrastructure']++;
      } else {
        countJson['infrastructure'] = 1;
      }

    }
    if(tags.hasOwnProperty('man_made')  && tags.hasOwnProperty('name') &&  data.type === 'node'){
      if (countJson.hasOwnProperty('infrastructure')){
        countJson['infrastructure']++;
      } else {
        countJson['infrastructure'] = 1;
      }

    }
    if(tags.hasOwnProperty('man_made') && tags['man_made']!= 'pipeline' && tags.hasOwnProperty('name') &&  data.type === 'node'){
      if (countJson.hasOwnProperty('infrastructure')){
        countJson['infrastructure']++;
      } else {
        countJson['infrastructure'] = 1;
      }

    }
    if(tags.hasOwnProperty('power') && tags.hasOwnProperty('name') && data.type === 'node'){
      if (countJson.hasOwnProperty('infrastructure')){
        countJson['infrastructure']++;
      } else {
        countJson['infrastructure'] = 1;
      }

    }
    if(tags.hasOwnProperty('power') && tags.power!='line' && tags.hasOwnProperty('name') && data.type === 'way'){
      if (countJson.hasOwnProperty('infrastructure')){
        countJson['infrastructure']++;
      } else {
        countJson['infrastructure'] = 1;
      }

    }
    if(tags.hasOwnProperty('aeroway') && tags.hasOwnProperty('name') && ( data.type === 'way' || data.type === 'node')){
      if (countJson.hasOwnProperty('infrastructure')){
        countJson['infrastructure']++;
      } else {
        countJson['infrastructure'] = 1;
      }

    }
    if(tags.hasOwnProperty('leisure') && tags.hasOwnProperty('name') && ( data.type === 'way' || data.type === 'node')){
      if (countJson.hasOwnProperty('leisure')){
        countJson['leisure']++;
      } else {
        countJson['leisure'] = 1;
      }

    }
    if(tags.hasOwnProperty('natural') && tags.hasOwnProperty('name') &&  data.type === 'way'){
      if (countJson.hasOwnProperty('natural')){
        countJson['natural']++;
      } else {
        countJson['natural'] = 1;
      }

    }
    if(tags.hasOwnProperty('waterway') && tags.hasOwnProperty('name') &&  data.type === 'node'){
      if (countJson.hasOwnProperty('natural')){
        countJson['natural']++;
      } else {
        countJson['natural'] = 1;
      }

    }
  });

} else {
  console.log('Please enter a valid mode!');
}

stream.on('end', function() {

  if (argv.mode === 'basemap'){
    var motorable = ['motorway','motorway_link','trunk','trunk_link','primary',
                    'primary_link','secondary','secondary_link','tertiary',
                    'tertiary_link','residential','unclassified','service'];
    var nonmotorable = ['footway','path','track'];
    var nonmotorable_length=0;
    var motorable_length=0;
    var motorable_name=0;

    motorable.forEach(function(item){
      if(countJson.hasOwnProperty('l_'+item)){

        motorable_length = motorable_length + countJson['l_'+item];

      }
      if(countJson.hasOwnProperty('named_'+item)){
        motorable_name = motorable_name + countJson['named_'+item];

      }

    });
    nonmotorable.forEach(function(item){
      if(countJson.hasOwnProperty('l_'+item)){
        nonmotorable_length = nonmotorable_length + countJson['l_'+item];

      }

    }); 
    countJson['motorable_length'] = motorable_length;
    countJson['nonmotorable_length'] = nonmotorable_length;
    countJson['motorable_name'] = motorable_name;

  }
  if (argv.mode === 'address'){
    countJson['addr'] = addrID_n.length + addrID_w.length+ addrID_r.length;

  }
  
  console.log(JSON.stringify(countJson));
 
    
});
