import {createStore, applyMiddleware, combineReducers} from 'redux'
//import { Map } from 'immutable'
import { composeWithDevTools } from 'remote-redux-devtools'
import { createEpicMiddleware, combineEpics } from 'redux-observable'
import 'rxjs'

const actionTypes = require('./constants/actionsTypes');
const actions = require("./actions/actions");
const actionsHelper = require("./helpers/actionsHelper");

var productEpics = new actionsHelper.EntryEpics(actionTypes.Product, "/api/crud/product");
var categoryEpics = new actionsHelper.EntryEpics(actionTypes.Category, "/api/crud/category");
var sectionEpics = new actionsHelper.EntryEpics(actionTypes.Section, "/api/crud/section");

// Комбинируем эпики в один
const rootEpic = combineEpics(
    ...productEpics.getAllMyEpics(),
    ...categoryEpics.getAllMyEpics(),
    ...sectionEpics.getAllMyEpics(),
)

/*
// Инициализируем объект для хранилища, формируем его первоначальный вид и выставляем дефолтные значения, так же оборачиваем его в Map
const initialStore = Map({
    product: {},
    category: {},
    section: {}
})
*/

var productReducer = actionsHelper.EntryReducer(actionTypes.Product);
var categoryReducer = actionsHelper.EntryReducer(actionTypes.Category);
var sectionReducer = actionsHelper.EntryReducer(actionTypes.Section);

var rootReducer = combineReducers ( { product: productReducer, category: categoryReducer, section: sectionReducer });

// Создаем миддлеваре
const epictMiddleware = createEpicMiddleware()

// Создаем хранилище (с учетом миддлеваре) 
const store = createStore(rootReducer, applyMiddleware(epictMiddleware));

epictMiddleware.run(rootEpic);

(async function(){
    await store.dispatch(actions.Product.getItems());
})();

export default store;