import React from 'react';
import { Switch, Route } from 'react-router-dom'
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
        [constants.actions.addItem]: function(item) {
            return { type: actionsType[operations.addItem], item};
        },

        // Get all items
        [constants.actions.getItems]: function() {
            return {type: actionsType[operations.getItems]};
        },

        // Get item by id
        [constants.actions.getItem]: function(id){
            return { type: actionsType[operations.getItem], id};
        },

        // Put item
        [constants.actions.putItem]: function(id, item){
            return { type: actionsType[operations.putItem], id, item};
        },

        // Delete item
        [constants.actions.delItem]: function(id){
            return { type: actionsType[operations.delItem], id };
        },

        getPrefix: function(){
            return actionsType[operations.prefix].toLowerCase();
        }
    }
}

// Создать роуты Crud для сущности
export function EntryRoute(thisProps, ItemsComponent, ViewItemComponent, EditItemComponent, prefix){
    var items = thisProps[prefix][constants.stateProperty.items];
    var item = thisProps[prefix][constants.stateProperty.item];
    var formStatus = thisProps[prefix][constants.stateProperty.formStatus];
    
    var getItems = thisProps[this.makeActionName(prefix, constants.actions.getItems)];
    var deleteAction = thisProps[this.makeActionName(prefix, constants.actions.delItem)];
    var putAction = thisProps[this.makeActionName(prefix, constants.actions.putItem)];
    var addAction = thisProps[this.makeActionName(prefix, constants.actions.addItem)];
    var getItem = thisProps[this.makeActionName(prefix, constants.actions.getItem)];

    return (
        <Switch>
                <Route exact path={`/${prefix}/`} render={(props) => 
                    <ItemsComponent 
                        routeProps={props} 
                        items={items} 
                        getItems={getItems}
                        deleteAction={deleteAction} />} 
                />
                <Route path={`/${prefix}/edit/:id`} render={(props) => 
                    <EditItemComponent 
                        mode={constants.formMode.edit}
                        routeProps={props} 
                        getItem={getItem} 
                        item={item}
                        saveAction={putAction}
                        backUrl={`/${prefix}`}
                        formStatus={formStatus} />} 
                />
                <Route path={`/${prefix}/create`} render={(props) => 
                    <EditItemComponent 
                        mode={constants.formMode.create} 
                        routeProps={props} 
                        saveAction={addAction}
                        backUrl={`/${prefix}`}
                        formStatus={formStatus} />} 
                />
                <Route path={`/${prefix}/:id`} render={(props) => 
                    <ViewItemComponent
                        mode={constants.formMode.read}
                        routeProps={props} 
                        getItem={getItem} 
                        item={item} />} 
                />
            </Switch>
    );
}

export function makeActionName(prefix, action){
    return `${prefix}_${action}`;
}

// Построить экшн креэйтор для сущности
export function makeActionCreator(itemActions){
    var prefix = itemActions.getPrefix();
        return {
            [makeActionName(prefix, constants.actions.addItem)]: (item) => itemActions[constants.actions.addItem](item),
            [makeActionName(prefix, constants.actions.getItems)]: () => itemActions[constants.actions.getItems](),
            [makeActionName(prefix, constants.actions.getItem)]: (id) => itemActions[constants.actions.getItem](id),
            [makeActionName(prefix, constants.actions.putItem)]: (id, item) => itemActions[constants.actions.putItem](id, item),
            [makeActionName(prefix, constants.actions.delItem)]: (id) => itemActions[constants.actions.delItem](id)
    }
}