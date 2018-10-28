const redux = require("redux");

const initialState = {
    views: 0,
    likes: 0
};

const reduser = (state, action) => {
    switch (action.type){
        case "ADD_VIEW":
            return Object.assign({}, state, {views: state.views + 1});
        case "ADD_LIKE":
            return Object.assign({}, state, {likes: state.likes + 1})
        default:
            return state;
    }
};


const store = redux.createStore(reduser, initialState);

store.subscribe(() => console.log(store.getState()));

store.dispatch({type: "ADD_VIEW"});
store.dispatch({type: "ADD_LIKE"});
store.dispatch({type: "ADD_VIEW"});

