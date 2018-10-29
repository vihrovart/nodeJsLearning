
import {createStore, applyMiddleware} from 'redux'
import { Map } from 'immutable'
import { composeWithDevTools } from 'remote-redux-devtools'
import { createEpicMiddleware } from 'redux-observable'
import { ajax } from 'rxjs/observable/dom/ajax'
import { mergeMap, map } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import 'rxjs'

// Создаем эпик обрабатывающий поток событий на выходе
const likeFulfilled = payload => ({ type: "ADD_LIKE_FULFILLED", payload });

// Создаем эпик обрабатывающий поток событий на входе (для асинхронных экшенов)
const likeEpic = (action$, state$) => {
    console.log(action$);

    return action$.pipe(
        ofType("ADD_LIKE"),
        mergeMap(action => ajax.getJSON('/getjson ').pipe(
            map(res => likeFulfilled(res)))
        )
    );
}
    
// Инициализируем объект для хранилища, формируем его первоначальный вид и выставляем дефолтные значения, так же оборачиваем его в Map
const initialStore = Map({
    views: 0,
    likes: 0,
    dislikes: 0
});

// Создаем редьюсер (для синхронный экшенов)
const reducer = (state, action) => {
    console.log(action);

    switch(action.type){
        case "ADD_LIKE_FULFILLED" :
            return state.set('likes', action.payload.views);
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

epictMiddleware.run(likeEpic);

export default store