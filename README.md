# elektriker-api
ELKO Boligpartner database.

## Install
```
$ git clone https://github.com/ludens-reklamebyra/elektriker-api.git && cd elektriker-api
$ npm install
$ cp .env.example .env
```
Edit `.env` to appropriate values.

## Endpoints
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
