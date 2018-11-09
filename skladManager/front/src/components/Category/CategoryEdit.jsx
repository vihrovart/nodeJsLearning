import React, { Component } from 'react';
import itemLoad from "../hoc/itemLoad";
import * as constants from '../../constants/constants'

class CategoryEditForm extends Component {
    constructor(props){
        super(props);

        var getValueOrDefault = (value) => this.isEdit ? value : ""

        var title = this.getValueOrDefault("title");
        var color = this.getValueOrDefault("color");

        this.state = {title: title, color: color};

        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.save = this.save.bind(this);
        this.isEdit = this.isEdit.bind(this);
        this.getValueOrDefault = this.getValueOrDefault.bind(this);
    }

    getValueOrDefault(memberName){
        if(!this.isEdit){
            return "";
        }

        return this.props.item[memberName];
    }

    handleFieldChange(e){
        this.setState({[e.target.attributes.datafieldname.nodeValue]: e.target.value});
    }

    isEdit(props){
        return props.mode == constants.formMode.edit
    }

    save(){
        if(this.isEdit){
            this.props.saveAction(this.props.item.id , this.state);
        }

        this.props.saveAction(this.state);
    }

    render() {
        console.log(this.state, this.props);

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
