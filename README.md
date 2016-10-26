# osmlazer
osmium based OpenStreetMap data filter. Input is an OSM PBF, output is a stream of GeoJSON features.

## Setup

1. git https://github.com/geohacker/osmlazer.git
2. [Install osmium dependencies](https://github.com/osmcode/node-osmium#depends)
3. `npm install`

## Usage

`node index.js --file /path/to/pbf --filter /path/to/filter` 

## Filters

Filters are Mapbox GL filters. See `filters/` for examples.