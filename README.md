# elektriker-api [![Build Status](https://travis-ci.org/ludens-reklamebyra/elektriker-api.svg?branch=dev)](https://travis-ci.org/ludens-reklamebyra/elektriker-api)
ELKO Boligpartner database.

## Install
```
$ git clone https://github.com/ludens-reklamebyra/elektriker-api.git && cd elektriker-api
$ npm install
$ cp .env.example .env
```
Edit `.env` to appropriate values.

## Run
```
$ npm start
```

## Endpoints
### /services
```
get /services
post /services
```
#### Example response
```javascript
[
  {
    "_id": "568f913417a52e38604b4e37",
    "name": "Billing",
    "__v": 0
  }
]
```

### /franchises
```
get /franchises
post /franchises
```
#### Example response
```javascript
[
  {
    "_id": "568f84f345deae0f00fe106c",
    "name": "Man Bear Company",
    "website": "http://ballefrans.no",
    "logo": "http://www.eurasianet.org/sites/default/files/imagecache/galleria_fullscreen/Trilling-0845.jpg",
    "__v": 0,
    "address": {
      "line": "test",
      "zip": 5746,
      "place": "Horda",
      "country": "no"
    }
  }
]
```
