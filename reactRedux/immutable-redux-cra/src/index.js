// Lesson https://www.youtube.com/watch?v=PG0YuLY2Qic

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import store from "./store";

import App from './App';
import About from "./app/components/About"

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
<Provider store={store}>
    <Router>
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/about" component={About} />
            <Route children={() =><h2>Not found!</h2> } />
        </Switch>
    </Router>
</Provider>
,
 document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();