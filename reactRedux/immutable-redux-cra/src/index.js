// Lesson https://www.youtube.com/watch?v=PG0YuLY2Qic

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux"
import {createStore} from 'redux'
import { Map } from 'immutable'

import App from './App';

import * as serviceWorker from './serviceWorker';

const reducer = (state, action) => {
    switch(action.type){
        case "ADD_LIKE" :
            return state.update('likes', likes => likes + 1);
        case "ADD_DISLIKE" :
            return state.update('dislikes', dislikes => dislikes + 1);
        case "ADD_VIEW" :
            return state.update('views', views => views + 1);
        default:
            return state;
    }
};
const initialStore = Map({
    views: 0,
    likes: 0,
    dislikes: 0
});

const store = createStore(reducer, initialStore);

ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>
,
 document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
