import React from 'react';
import itemLoad from "../hoc/itemLoad";
import EditFormBase from '../EditFormBase'
import { Redirect } from 'react-router-dom'
import * as constants from "../../constants/constants"

class CategoryEditForm extends EditFormBase {
    getState(){
        var title = this.getValueOrDefault("title");
        var color = this.getValueOrDefault("color");

        return {title: title, color: color};
    }

    render() {
        console.log(this.state, this.props);

        if(this.props.categoryFormStatus == constants.formStatus.sucess){
            return <Redirect to={this.props.backUrl}/>
        }

        return (
            <div>
                <div>Название : <input type='text' value={this.state.title} datafieldname="title" onChange={this.handleFieldChange}></input></div>
                <div>Цвет : <input type='text' value={this.state.color} datafieldname="color" onChange={this.handleFieldChange}></input></div>
                <div>Отменить</div>
                <button onClick={this.save}>Сохранить</button>
            </div>
        );
    }
}

export default  itemLoad(CategoryEditForm);
