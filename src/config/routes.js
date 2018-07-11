import React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";

import store from "./configStore";
import App from "../containers/App";

const history = createBrowserHistory();

const routes = (
    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>
);

export default routes;