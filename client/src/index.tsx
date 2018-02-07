import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
//import decode from "jwt-decode";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import * as thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import * as decode from "jwt-decode";

//import "./index.css";

//import setAuthHeader from "./utils/auth-header";
//import * as api from "./api";
//import Socket from "./socket";
//import reducer from "./reducer";
//import { userAdd } from "./actions/user";
import App from "./App";

//const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
//const store = createStore(reducer, applyMiddleware(thunk));

const token = localStorage.user_jwt;
//Socket(token, store);

//if (token) {
//  setAuthHeader(token);
//  api.user.user().then(({ name, email, status, rate }) => {
//    store.dispatch(userAdd(name, email, token, rate, status));
//    renderApp();
//  });
//} else {
//}

renderApp();

function renderApp() {
  ReactDOM.render(
    <Router>
      <App />
    </Router>,
    document.getElementById("root")
  );
}