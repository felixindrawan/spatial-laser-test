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
PORT=
```

### Dependencies

* Built on Windows 11
* Node
* Docker Desktop (on Windows)  
* Docker compose

### Executing program Locally
* Launch Docker Desktop, ensuring Daemon is running
* In the terminal, build the image with the code below (Note that image name can be changed in the [docker-compose.yml](./docker-compose.yml))
```
docker build -t felixindrawan-spatiallaser-backend .
```
* Afterwards, in the terminal, launch the server in the container with the code below 
```
docker-compose up
```
* Backend server will be launched under the port `13000`. (Note that this port can be changed in the [docker-compose.yml](./docker-compose.yml))

### Deploy with Heroku
Need to use the container registry on Heroku, bc the deployment buildpack doesn't work for container stack
```
heroku git:remote -a spatiallaser-test-backend
docker ps
heroku container:push web
heroku container:release web
```

### Testing
I've created a basic test with Jest and Supertest to ensure the calculations I've done in the backend is correct.

To run tests, run
```
npm run test
```

To see testing coverage report, run
```
npm run test --coverage
```