import React, { Component } from 'react';
import ElementForm from '../ElementForm';
import * as constants from "../../constants/constants"

class Category extends Component {
    render(){
        var fields = [
            { name: 'title', type: constants.fieldType.string, title: 'Название'},
            { name: 'color', type: constants.fieldType.string, title: 'Цвет'}
        ];

        return (
            <ElementForm {...this.props} fields={fields} />
        );
    }
}


export default Category; 