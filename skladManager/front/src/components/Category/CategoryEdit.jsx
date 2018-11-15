import React from 'react';
import itemLoad from "../hoc/itemLoad";
import EditFormBase from '../EditFormBase'

class CategoryEditForm extends EditFormBase {
    getState(){
        var title = this.getValueOrDefault("title");
        var color = this.getValueOrDefault("color");

        return {title: title, color: color};
    }

    render() {
        console.log(this.state, this.props);

        return this.checkStatusAndReturn(
            <div>
                <div>Название : <input type='text' value={this.state.title} datafieldname="title" onChange={this.handleFieldChange}></input></div>
                <div>Цвет : <input type='text' value={this.state.color} datafieldname="color" onChange={this.handleFieldChange}></input></div>
            </div>
        );
    }
}

export default  itemLoad(CategoryEditForm);
