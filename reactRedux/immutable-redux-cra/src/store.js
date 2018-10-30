
import {createStore, applyMiddleware} from 'redux'
import { Map } from 'immutable'
import { composeWithDevTools } from 'remote-redux-devtools'
import { createEpicMiddleware, combineEpics } from 'redux-observable'
import { ajax } from 'rxjs/observable/dom/ajax'
import { mergeMap, map } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import 'rxjs'

// Создаем эпик обрабатывающий поток событий на выходе (т.е. после окончания асинхронного запроса процесс приходит сюда, после чего перенаправляется в редьюсер)
const likeFulfilled = payload => ({ type: "ADD_LIKE_FULFILLED", payload });

// Создаем эпик обрабатывающий поток событий на входе (для асинхронных экшенов)
const likeEpic = (action$, state$) => {
    return action$.pipe(
        ofType("ADD_LIKE"),
        mergeMap(action => ajax.getJSON('/getjson ').pipe(
            map(res => likeFulfilled(res)))
        )
    );
}

// СОздали второй эпик для получения айтема из базы
const itemFulfilled = payload => ({ type: "GET_ITEM_FULFILLED", payload });
const itemEpic = (action$, state$) => {
    return action$.pipe(
        ofType("GET_ITEM"),
        mergeMap(action => ajax.getJSON('/getitem ').pipe(
            map(res => itemFulfilled(res)))
        )
    );
}

// Комбинируем эпики в один
const rootEpic = combineEpics(
    likeEpic,
    itemEpic
)

    
// Инициализируем объект для хранилища, формируем его первоначальный вид и выставляем дефолтные значения, так же оборачиваем его в Map
const initialStore = Map({
    views: 0,
    likes: 0,
    dislikes: 0,
    item: { title: "...", count: 0 }
});

// Создаем редьюсер (для синхронный экшенов)
const reducer = (state, action) => {
    console.log(action);

    switch(action.type){
        case "ADD_LIKE_FULFILLED" :
            return state.set('likes', action.payload.views);
        case "GET_ITEM_FULFILLED" :
            return state.set('item', action.payload.item);
        case "ADD_DISLIKE" :
            return state.update('dislikes', dislikes => dislikes + 1);
        case "ADD_VIEW" :
            return state.update('views', views => views + 1);
        default:
            return state;
    }
};

// Создаем миддлеваре
const epictMiddleware = createEpicMiddleware()

// Создаем хранилище (с учетом миддлеваре) 
const store = createStore(reducer, initialStore, applyMiddleware(epictMiddleware));

epictMiddleware.run(rootEpic);

export default store