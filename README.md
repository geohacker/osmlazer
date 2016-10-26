# osmlazer
osmium based OpenStreetMap data filter. Input is an OSM PBF, output is a stream of GeoJSON features.

## Setup

### Dependencies
#### Linux

```
apt-get install -y build-essential zlib1g-dev unzip python-dev \
  git libtool g++ autotools-dev automake cmake make xutils-dev realpath ragel
```

#### osx

```
brew install autoconf automake libtool makedepend
```

* [Install osmium dependencies](https://github.com/osmcode/node-osmium#depends)
* git clone https://github.com/geohacker/osmlazer.git
* `npm install`

## Usage

`node index.js --file /path/to/pbf --filter /path/to/filter` 

## Filters

Filters are Mapbox GL filters. See `filters/` for examples.