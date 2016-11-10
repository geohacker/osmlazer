var osmium = require('osmium');
var argv = require('minimist')(process.argv.slice(2));
var ff = require('feature-filter');
var fs = require('fs');


var file = new osmium.File(argv.file);
var reader = new osmium.Reader(file);
var location_handler = new osmium.LocationHandler();
var stream = new osmium.Stream(new osmium.Reader(file, location_handler));
var mappers = ['Rub21','ediyes','Luis36995','RichRico','dannykath','andygol','ruthmaben',
'calfarome','samely','srividya_c','PlaneMad','karitotp','Chetan_Gowda','ramyaragupathy',
'lxbarth','shvrm', 'Aaron Lidman','geohacker','pratikyadav','jinalfoflia','nikhilprabhakar',
'oini','Jothirnadh','manings','Arunasank','sanjayb','saikabhi','aarthy','bkowshik','nammala','poornibadrinath','ajithranka',
'manoharuss','Maanya','BharataHS','ridixcr','yurasi','piligab'];

var mapboxCount = 0;
var otherCount = 0;

stream.on('data', function (data) {
    var f;
    var tags = data.tags();
    if (tags.hasOwnProperty('type') && tags.type === 'restriction') {
        if (!(mappers.indexOf(data.user) < 0 )) {
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
