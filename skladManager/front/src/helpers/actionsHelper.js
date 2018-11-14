import { ofType } from 'redux-observable'
import { ajax } from 'rxjs/observable/dom/ajax'
import { Map } from 'immutable'
import { mergeMap, map } from 'rxjs/operators';
import * as constants from '../constants/constants';
const operations = require( "../constants/actionsOperations");

export function GetActionTypes (name){
    return {
        [operations.prefix]: name,
        [operations.getItems]: `${name}_${operations.getItems}`,
        [operations.addItem]: `${name}_${operations.addItem}`,
        [operations.getItem]: `${name}_${operations.getItem}`,
        [operations.putItem]: `${name}_${operations.putItem}`,
        [operations.delItem]: `${name}_${operations.delItem}`,
        [operations.getItems_fulfilled]: `${name}_${operations.getItems_fulfilled}`,
        [operations.addItem_fulfilled]: `${name}_${operations.addItem_fulfilled}`,
        [operations.getItem_fulfilled]: `${name}_${operations.getItem_fulfilled}`,
        [operations.putItem_fulfilled]: `${name}_${operations.putItem_fulfilled}`,
        [operations.delItem_fulfilled]: `${name}_${operations.delItem_fulfilled}`
    }
}

// Создать эпики crud для сущности
export class EntryEpics{
    constructor(actionType, actionsUrl){
        this.actionType = actionType;
        this.actionsUrl = actionsUrl;
        console.log(this.actionType[operations.delItem]);
    }

    // TODO : Добавить обработку ошибок

    // Add item epic
    addItemFulfilled = payload => ({ type: this.actionType[operations.addItem_fulfilled], payload });
    addItemEpic = (action$, state$) => {
        return action$.pipe(
            ofType(this.actionType[operations.addItem]),
            mergeMap(action => ajax.post(this.actionsUrl, action.item).pipe(
                map(res => this.addItemFulfilled(res)))
            )
        );
    }

    // Get all item epic
    getItemsFulfilled = payload => ({ type: this.actionType[operations.getItems_fulfilled], payload });
    getItemsEpic = (action$, state$) => {
        return action$.pipe(
            ofType(this.actionType[operations.getItems]),
            mergeMap(action => ajax.getJSON(this.actionsUrl).pipe(
                map(res => this.getItemsFulfilled(res)))
            )
        );
    }

    // Get item by id epic
    getItemFulfilled = payload => ({ type: this.actionType[operations.getItem_fulfilled], payload });
    getItemEpic = (action$, state$) => {
        return action$.pipe(
            ofType(this.actionType[operations.getItem]),
            mergeMap(action => ajax.getJSON(`${this.actionsUrl}\\${action.id}`).pipe(
                map(res => this.getItemFulfilled(res)))
            )
        );
    }

    // Put item epic
    putItemFulfilled = (payload) => ({ type: this.actionType[operations.putItem_fulfilled], payload });
    putItemEpic = (action$, state$) => {
        return action$.pipe(
            ofType(this.actionType[operations.putItem]),
            mergeMap(action => ajax.put(`${this.actionsUrl}/${action.id}`, action.item).pipe(
                map(res => this.putItemFulfilled(res.response)))
            )
        );
    }

    // Delete item by id epic
    delItemFulfilled = ( payload, itemId ) => ({ type: this.actionType[operations.delItem_fulfilled], payload, itemId });
    delItemEpic = (action$, state$) => {
        return action$.pipe(x => { console.log("delete debug"); return x }).pipe(
            ofType(this.actionType[operations.delItem]),
            mergeMap(action => ajax.delete(`${this.actionsUrl}/${action.id}`).pipe(
                map(res => this.delItemFulfilled(res, action.id)))
            )
        );
    }

    getAllMyEpics = () => {
        return [ this.addItemEpic, this.getItemsEpic, this.getItemEpic, this.putItemEpic, this.delItemEpic ];
    }
}

// Создать пропсы
export function MakeEntryProps(itemActions, state){
    var prefix = itemActions.getPrefix();

    return {
        [constants.stateProperty.items]: state[prefix].get(constants.stateProperty.items),
        [constants.stateProperty.formStatus]: state[prefix].get(constants.stateProperty.formStatus),
        [constants.stateProperty.item]: state[prefix].get(constants.stateProperty.item),
    }
}

// Создать стандартный Crud редьюсер для сущности
export function EntryReducer(actionType){
    const defaultState = Map({
        [constants.stateProperty.items]: [],
        [constants.stateProperty.formStatus]: constants.formStatus.static,
        [constants.stateProperty.item]: {}
    });

    return function(state = defaultState, action){
        var reducers = {};

        // get items reducer
        reducers[actionType[operations.getItems_fulfilled]] = () => state
            .set(constants.stateProperty.items, action.payload);

        // put item
        reducers[actionType[operations.putItem_fulfilled]] = () => state
            .set(constants.stateProperty.formStatus, constants.formStatus.sucess)
            .set(constants.stateProperty.item, action.payload);

        // add item
        reducers[actionType[operations.addItem_fulfilled]] = () => {
            var items = state.get(constants.stateProperty.items);
            items.push(action.payload);
            return state
            .set(constants.stateProperty.formStatus, constants.formStatus.sucess)
            .set(constants.stateProperty.items, items);
        }

        // get item
        reducers[actionType[operations.getItem_fulfilled]] = () => state
            .set(constants.stateProperty.formStatus, constants.formStatus.static)
            .set(constants.stateProperty.item, action.payload);

        // del item
        reducers[actionType[operations.delItem_fulfilled]] = () => {
            var items = state.get(constants.stateProperty.items);
            return state.set(constants.stateProperty.items, items.filter(x => x.id !== action.itemId));}

        var reducerAction = reducers[action.type];

        if(reducerAction){
            return reducerAction();
        }

        return state;
    };
}

// Создать экшены crud для сущности
export function ItemActions(actionsType){
    return {
        // Add item
        addItem: function(item) {
            return { type: actionsType[operations.addItem], item};
        },

        // Get all items
        getItems: function() {
            return {type: actionsType[operations.getItems]};
        },

        // Get item by id
        getItem: function(id){
            return { type: actionsType[operations.getItem], id};
        },

        // Put item
        putItem: function(id, item){
            return { type: actionsType[operations.putItem], id, item};
        },

        // Delete item
        delItem: function(id){
            return { type: actionsType[operations.delItem], id };
        },

        getPrefix: function(){
            return actionsType[operations.prefix].toLowerCase();
        }
    }
}

// Построить экшн креэйтор для сущности
export function makeActionCreator(itemActions){
    var prefix = itemActions.getPrefix();
        return {
            [`${prefix}_addItem`]: (item) => itemActions.addItem(item),
            [`${prefix}_getItems`]: () => itemActions.getItems(),
            [`${prefix}_getItem`]: (id) => itemActions.getItem(id),
            [`${prefix}_putItem`]: (id, item) => itemActions.putItem(id, item),
            [`${prefix}_delItem`]: (id) => itemActions.delItem(id)
    }
}