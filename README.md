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

### franchise
#### GET /franchises
- **Required permissions:** read
- **Examples**:
```
https://dev-elektriker-api.herokuapp.com/franchises
```
```javascript
[
  {
    "_id": "5698f39c616c420f0048a039",
    "name": "Franchise",
    "logo": "logo.png",
    "website": "http://example.com",
    "__v": 0,
    "address": {
      "line": "Vitneskjukji 21",
      "zip": 6589,
      "place": "Helheim",
      "county": "Vestnes-Agder",
      "country": "no"
    }
  }
]
```

#### GET /franchises/[franchise id]
- **Required permissions:** read
- **Examples**:
```
https://dev-elektriker-api.herokuapp.com/franchises/5698f39c616c420f0048a039
```
```javascript
{
  "_id": "5698f39c616c420f0048a039",
  "name": "Franchise",
  "logo": "logo.png",
  "website": "http://example.com",
  "__v": 0,
  "address": {
    "line": "Vitneskjukji 21",
    "zip": 6589,
    "place": "Helheim",
    "county": "Vestnes-Agder",
    "country": "no"
  }
}
```

#### POST /franchises
- **Required permissions:** admin
- **Arguments**:
  - `name` (required)
  - `logo`
  - `website`
  - `address`
    - `line`
    - `zip`
    - `place`
    - `county` (ISO 3166-2)
    - `country` (ISO 3166-2)

#### PUT /franchises/[franchise id]
- **Required permissions:** admin
- **Arguments**:
  - `name` (required)
  - `logo`
  - `website`
  - `address`
    - `line`
    - `zip`
    - `place`
    - `county` (ISO 3166-2)
    - `country` (ISO 3166-2)

#### DELETE /franchises/[franchise id]
- **Required permissions:** admin
