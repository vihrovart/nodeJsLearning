
import {createStore, applyMiddleware} from 'redux'
import { Map } from 'immutable'
import { composeWithDevTools } from 'remote-redux-devtools'
import { createEpicMiddleware, combineEpics } from 'redux-observable'
import { ajax } from 'rxjs/observable/dom/ajax'
import { mergeMap, map } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import 'rxjs'

import * as actionTypes from './constants/actionTypes'
import * as actions from './actions/actions';

// Создаем эпик обрабатывающий поток событий на выходе (т.е. после окончания асинхронного запроса процесс приходит сюда, после чего перенаправляется в редьюсер)
const likeFulfilled = payload => ({ type: actionTypes.ADD_LIKE_FULFILLED, payload });

// Создаем эпик обрабатывающий поток событий на входе (для асинхронных экшенов)
const likeEpic = (action$, state$) => {
    return action$.pipe(
        ofType(actionTypes.ADD_LIKE),
        mergeMap(action => ajax.getJSON('/api/getjson ').pipe(
            map(res => likeFulfilled(res)))
        )
    );
}

// СОздали второй эпик для получения айтема из базы
const itemFulfilled = payload => ({ type: actionTypes.GET_ITEMS_FULFILLED, payload });
const itemEpic = (action$, state$) => {
    return action$.pipe(
        ofType(actionTypes.GET_ITEMS),
        mergeMap(action => ajax.getJSON('/api/getitems').pipe(
            map(res => itemFulfilled(res)))
        )
    );
}

// Эпик для добавления элемента в базу
const addItemFulfilled = payload => ({ type: actionTypes.ADD_ITEM_FULFILLED, payload });
const addItemEpic = (action$, state$) => {
    return action$.pipe(
        ofType(actionTypes.ADD_ITEM),
        mergeMap(action => ajax.post('/api/addItem', action.item).pipe(
            map(res => addItemFulfilled(res.response)))
        )
    );
}

// Комбинируем эпики в один
const rootEpic = combineEpics(
    likeEpic,
    itemEpic,
    addItemEpic
)

// Инициализируем объект для хранилища, формируем его первоначальный вид и выставляем дефолтные значения, так же оборачиваем его в Map
const initialStore = Map({
    views: 0,
    likes: 0,
    dislikes: 0,
    items: [],
    itemBufer: {title: "", count: 0, date: ""}
});

// Создаем редьюсер (для синхронный экшенов)
const reducer = (state, action) => {
    console.log(action);

    switch(action.type){
        case actionTypes.ADD_LIKE_FULFILLED :
            return state.set('likes', action.payload.views);
        case actionTypes.GET_ITEMS_FULFILLED :
            return state.set('items', action.payload.items);
        case actionTypes.ADD_DISLIKE :
            return state.update('dislikes', dislikes => dislikes + 1);
        case actionTypes.ADD_VIEW :
            return state.update('views', views => views + 1);
        case actionTypes.ADD_ITEM_FULFILLED :
            return state.update('items', items => items.concat(action.payload));
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
    await store.dispatch(actions.getItems());
})();

export default store