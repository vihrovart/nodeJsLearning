import React, { Component } from 'react'
import ItemList from "./ItemsList";

export default class Sections extends Component {
    render (){
        return (
            <ItemList {...this.props} listTitle="Разделы" />
        );
    }
}