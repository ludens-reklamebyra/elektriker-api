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

## API Reference
### service
#### GET /services
- **Required permissions:** read
- **Examples**:
```
https://dev-elektriker-api.herokuapp.com/services
```
```javascript
[
  {
    "_id": "5697bd1b4c75ffb00cdf33db",
    "name": "Service 1"
  },
  {
    "_id": "5697bd1b4c75ffb00cdf33db",
    "name": "Service 2"
  }
]
```

#### GET /services/[service id]
- **Required permissions:** read
- **Examples**:
```
https://dev-elektriker-api.herokuapp.com/services/5697bd1b4c75ffb00cdf33db
```
```javascript
{
  "_id": "5697bd1b4c75ffb00cdf33db",
  "name": "Service 1"
}
```

#### POST /services
- **Required permissions:** admin
- **Arguments**:
  - `name` (required)

#### PUT /services/[service id]
- **Required permissions:** admin
- **Arguments**:
  - `name` (required)

#### DELETE /services/[service id]
- **Required permissions:** admin
