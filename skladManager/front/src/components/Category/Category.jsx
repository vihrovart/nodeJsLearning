import React, { Component } from 'react';
import ViewForm from '../ViewForm';
import * as constants from "../../constants/constants"
import ItemLoad from "../hoc/itemLoad"

class Category extends Component {
    render(){
        var fields = [
            { name: 'title', type: constants.fieldType.string, title: 'Название'},
            { name: 'color', type: constants.fieldType.string, title: 'Цвет'}
        ];

        return (
            <ViewForm {...this.props} fields={fields} />
        );
    }
}

export default ItemLoad(Category); 