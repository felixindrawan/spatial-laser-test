# Spatial Laser Test Frontend

Frontend of the Spatial Laser Test

## Getting Started

### Environment Variables

Please create a `.env` file inside `/frontend`
```
REACT_APP_BACKEND_API_URL=
```

### Dependencies

* Node
* Backend service is running

### Installing

Run `npm install`

### Executing program

* Ensure the backend service is running (See [/backend](../backend))
* Run the app with the code below
```
npm start
```
* Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Deploy with Heroku
Currently already setup with automatic deployments.

Note to self: I had to use create-react-app buildpack, and subdir buildpack.
Also, create-react-app buildpack only works on heroku-20 or lower 

### Business Logic
1. `components/SideMenu/UserConfig` - Show option to display `centroids` on features
We only want to show the option to show `centroids` on features when the user chooses `Method.CENTROID_BASED_METHOD` as `centroids` are not used for `Method.AREAL_PROPORTION_METHOD`
2. `components/Map` - Displaying the user circle
Goal: Display circle similar to the examples shown in the `Take Home Test Instructions.pdf`.
* On `Method.AREAL_PROPORTION_METHOD`, the circle should only show the stroke, and we want to highlight the intersection of the circle with the intersection of the features
* On `Method.CENTROID_BASED_METHOD`, the circle should only show the stroke, and any features that has their centroids inside the circle will be highlighted

=====================================


## Available Scripts

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Deploy with Heroku
Auto-deployment is already setup on Heroku console
```
heroku git:remote -a spatiallaser-test-frontend
```