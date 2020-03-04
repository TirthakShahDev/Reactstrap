import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { store } from "./Store";
import { ErrorHook } from "./utils/ErrorHook";
import { BrowserRouter as Router } from "react-router-dom";
import { AbilityContext } from './abilityConfig/ability-context'
import ability from './abilityConfig/ability'
import "./lang";

import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <AbilityContext.Provider value={ability}>
    <Provider store={store}>
      <Router>
        <ErrorHook>
          <App />
        </ErrorHook>
      </Router>
    </Provider>
  </AbilityContext.Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
