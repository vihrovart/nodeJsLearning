import {createStore, applyMiddleware} from 'redux'
import { Map } from 'immutable'
import { composeWithDevTools } from 'remote-redux-devtools'
import { createEpicMiddleware, combineEpics } from 'redux-observable'
import 'rxjs'

const actionTypes = require('./constants/actionsTypes');
const actions = require("./actions/actions");
const operations = require("./constants/actionsOperations")
const actionsHelper = require("./helpers/actionsHelper");

var productEpics = new actionsHelper.ItemEpics(actionTypes.Product, "/api/crud/product");
var categoryEpics = new actionsHelper.ItemEpics(actionTypes.Category, "/api/crud/category");
var sectionEpics = new actionsHelper.ItemEpics(actionTypes.Section, "/api/crud/section");

// Комбинируем эпики в один
const rootEpic = combineEpics(
    ...productEpics.getAllMyEpics(),
    ...categoryEpics.getAllMyEpics(),
    ...sectionEpics.getAllMyEpics(),
)

// Инициализируем объект для хранилища, формируем его первоначальный вид и выставляем дефолтные значения, так же оборачиваем его в Map
const initialStore = Map({
    sections: [],
    categories: [],
    products: [],
    category: {},
    section: {}
});

// Создаем редьюсер (для синхронный экшенов)
const reducer = (state, action) => {
    console.log(action);

    switch(action.type){
        case actionTypes.Product[operations.getItems_fulfilled] :
            return state.set('products', action.payload);
        case actionTypes.Category[operations.getItems_fulfilled] :
            return state.set('categories', action.payload);
        case actionTypes.Category[operations.putItem_fulfilled] :
            return state.set('category', action.payload);
        case actionTypes.Section[operations.getItems_fulfilled] :
            return state.set('sections', action.payload);
        case actionTypes.Category[operations.getItem_fulfilled] :
            return state.set('category', action.payload);
        case actionTypes.Section[operations.getItem_fulfilled] :
            return state.set('section', action.payload);
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