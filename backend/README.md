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
* Docker compose

### Installing

* Run `docker build -t felix-indrawan-spatial-laser-backend .`
* Run `docker-compose up`
* This will create an endpoint on [http://localhost:13000](http://localhost:13000) to retrieve the data from.

### Executing program

* Launch Docker Desktop, ensuring Daemon is running
* In the terminal, build the image with the code below (Note that image name can be changed in the [docker-compose.yml](./docker-compose.yml))
```
docker build -t felix-indrawan-spatial-laser-backend
```
* Afterwards, in the terminal, launch the server in the container with the code below 
```
docker-compose up
```
* Backend server will be launched under the port `13000`. (Note that this port can be changed in the [docker-compose.yml](./docker-compose.yml))