import {createStore, applyMiddleware} from 'redux'
import { Map } from 'immutable'
import { composeWithDevTools } from 'remote-redux-devtools'
import { createEpicMiddleware, combineEpics } from 'redux-observable'
import 'rxjs'

const actionTypes = require('./constants/actionsTypes');
const actions = require("./actions/actions");
const operations = require("./constants/actionsOperations")
const actionsHelper = require("./helpers/actionsHelper");

var itemEpics = new actionsHelper.ItemEpics(actionTypes.Product, "/api/crud/product");

// Комбинируем эпики в один
const rootEpic = combineEpics(
    ...itemEpics.getAllMyEpics()
)

// Инициализируем объект для хранилища, формируем его первоначальный вид и выставляем дефолтные значения, так же оборачиваем его в Map
const initialStore = Map({
    sections: [],
    categories: [],
    products: []
});

// Создаем редьюсер (для синхронный экшенов)
const reducer = (state, action) => {
    console.log(action);

    switch(action.type){
        case actionTypes.Product[operations.getItems_fulfilled] :
            return state.set('products', action.payload);
        default:
            return state;
    }
};

// Создаем миддлеваре
const epictMiddleware = createEpicMiddleware()

// Создаем хранилище (с учетом миддлеваре) 
const store = createStore(reducer, initialStore, applyMiddleware(epictMiddleware));

epictMiddleware.run(rootEpic);

(async function(){
    await store.dispatch(actions.Product.getItems());
})();

export default store;