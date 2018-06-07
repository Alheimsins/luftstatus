[![Build Status](https://travis-ci.org/Alheimsins/luftstatus.svg?branch=master)](https://travis-ci.org/Alheimsins/luftstatus)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)


# luftstatus

Air quality in Norway

## Installation

Download and install [nodejs](https://nodejs.org) and [git](https://git-scm.com/downloads)

You will need to register a mapbox account and a [mapbox token](https://github.com/uber/react-map-gl/blob/master/docs/get-started/mapbox-tokens.md)

```sh
git clone https://github.com/Alheimsins/luftstatus
cd luftstatus
npm install
vim next.config.js # Edit config
npm run dev
```
Open web-browser at http://localhost:3000

## Deploy using [Now](https://zeit.co/now)

```sh
$ wget https://raw.githubusercontent.com/Alheimsins/luftstatus/master/production.env
$ vim production.env # Edit config
$ now secrets add mapbox_token YOUR-MAPBOX-TOKEN
$ now -E production.env https://github.com/Alheimsins/luftstatus
```

## Deploy using [Docker](https://www.docker.com/)

Install [Docker](https://www.docker.com/)

```sh
docker run -d --name luftstatus-web alheimsins/luftstatus
``

## License

[MIT](LICENSE)

## About

Created by [zrrzzt](https://github.com/zrrrzzt) and [maccyber](https://github.com/maccyber) with ❤ for [Alheimsins](https://alheimsins.net)

<img src="https://image.ibb.co/dPH08G/logo_black.png" height="150px" width="150px" />

```

