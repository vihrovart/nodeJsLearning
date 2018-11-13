import React, { Component } from 'react';
import * as constants from '../constants/constants'

class ElementFormField extends Component {
    constructor(props){
        super(props);

        this.state = { field: this.props.field }
    }

    render () {
        console.log("render");
        console.log(this.props);

        return <div>{this.props.field.title} : {this.props.field.value}</div>;
    }
}

class ViewForm extends Component {
    constructor(props){
        super(props);

        this.state = { item: this.props.item, isLoading: true , fields: this.getFields()}
    }

    getFields(){
        return this.props.fields.map(field => {
            return { name: field.name, title: field.title, value: this.props.item[field.name], type: field.type }
        });
    }

    render () {
        return (
            <div>
                {this.state.fields.map(field => {
                    return <ElementFormField key={field.name} field={field} mode={this.props.mode} />
                })}
            </div>
        );
    }
}

export default ViewForm