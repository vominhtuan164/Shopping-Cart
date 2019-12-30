import {createStore} from "redux";
import appReducer from "./reducers/index";

const store = createStore(
    appReducer, /* preloadedState, */
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
//
store.subscribe( () => {
    // console.log(store.getState());
});

export default store; 