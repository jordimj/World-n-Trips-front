import React from "react";
import ReactDOM from "react-dom";
import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducer from "./store/reducer";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import axios from "axios";
import thunk from "redux-thunk";

// axios.defaults.baseURL = 'http://127.0.0.1:8000';
axios.defaults.headers.common["Authorization"] = "AUTH TOKEN";
axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.request.use(
	request => {
		console.log(request);
		return request;
	},
	error => {
		console.log(error);
		return Promise.reject(error);
	}
);

axios.interceptors.response.use(
	response => {
		console.log(response);
		return response;
	},
	error => {
		console.log(error);
		return Promise.reject(error);
	}
);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);

registerServiceWorker();
