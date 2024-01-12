# Spatial Laser Test Backend

Backend of the Spatial Laser Test

## Getting Started

### Environment Variables

A `.env` file was created to secure access to the postgres db provided in the instructions in this format below.

Please create a `.env` file inside `/backend`
```
DB_HOST=
DB_NAME=
DB_PORT_NUMBER=
DB_USERNAME=
DB_PASSWORD=
TABLE_NAME=
```

### Dependencies

* Built on Windows 11
* Node
* Docker Desktop (on Windows)  

### Installing

* Run `docker build -t felix-indrawan-spatial-laser-backend .`
* Run `docker-compose up`
* This will create an endpoint on `http://localhost:13000` to retrieve the data from.

### Executing program

* How to run the program
* Step-by-step bullets
```
code blocks for commands
```

## Help

### Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at http://localhost:1338/data. (Reason: CORS request did not succeed). Status code: (null).
- 