import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import App from "./App";
import reducers from "./reducers";
import "react-datepicker/dist/react-datepicker.css";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  .ReactTable {
	  direction:ltr;
  }

.ReactTable .rt-tr {
	cursor:pointer;
	font-size:16px;
	transition:background .2s;
	.rt-td {
		direction:rtl;
	}
} 
`;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk))
);

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyle />
    <App />
  </Provider>,
  document.querySelector("#root")
);
