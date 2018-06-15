## ShowResultsFromAPI Example

This is an example project based on the ShowResultsFromAPI example. The original file is included in the root directory, /ReactComponentExerciseExample.jsx. 

The application bootstraps from `app.js`, which in turns loads routes, reducers, and application state in its default form. However, rather than passing the entire application state to every piece of the application, only the necessary slice of the application state is passed into each component. This provides significant performance benefits, as the application state is loaded dynamically, and only data which is necessary for a given view is present when any given component is loaded.

In this case, important route is the root route, `/`, which loads the `Alpha` component. The `alpha` component, when matched in `routes.js`, is called as such:

```
{path: '/', name: 'alpha', getComponent: getComponent('alpha'), onEnter: requiresNoToken},
```

The important part is `getComponent('alpha')`. which in turn calls `routeImports.js`. This returns the component itself, the reducer, and the sagas associated with the component, which all are dynamically loaded in. Items from any other components are removed from memory or stop listening as generator functions.

In `containers/alpha`, the main part of the application, goes through a series of steps. First, the `constants` are defined as constants, which can be accessed either as part of the redux cycle, or they can trigger sagas, which are generators which do not proceed until a given constant is emitted through the redux cycle. 

A series of `actions` are defined. Each of these return a standard object which redux listens for, containing a `type` and any additional data. The `reducer` functions as normal. Each constants which is emitted through the reducer cycle is listened for, and when one matches, the defined action proceeds, typically setting the application state.

Finally, the UI itself only takes in the minimal amount of data from the application state, due to the usage of the `Reselect` library, which slices the applicationn state into the pieces of data necessary for the container to function. The sliced application state is passed to the container in `mapStateToProps`. Any necessary actions which must tie into the reducer cycle are defined and bound to the application using `mapDispatchToProps`. 

The container itself is relatively simple. It uses the available data, and when a button is clicked, it waits 1,000ms before making an API call to retrieve a string. Another button will modify the container state to toggle the 1,000ms delay on or off. 

Once the API call is completed, the result is added to the application state and displayed in the UI.
