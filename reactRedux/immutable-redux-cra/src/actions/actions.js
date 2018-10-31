import * as types from '../constants/actionTypes'

export function addLike(){ return { type: types.ADD_LIKE }};
export function addDisLike(count){ return { type: types.ADD_DISLIKE, count }};
export function addView(){ return { type: types.ADD_VIEW }};
export function getItems(){ return { type: types.GET_ITEMS }};
export function addItem(item){ return { type: types.ADD_ITEM, item }};