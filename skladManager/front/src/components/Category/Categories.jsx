import React, { Component } from 'react'
import ItemList from "../ItemsList";

export default class Categories extends Component {
    render (){
        return (
            <ItemList {...this.props} listTitle="Категории" />
        );
    }
}