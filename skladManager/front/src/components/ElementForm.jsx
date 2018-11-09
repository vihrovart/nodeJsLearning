import React, { Component } from 'react';
import * as constants from '../constants/constants'

class ElementFormField extends Component {
    constructor(props){
        super(props);

        this.handleChanged = this.handleChanged.bind(this);

        this.state = { field: this.props.field }
    }

    componentDidUpdate(){
        console.log(3);
    }

    handleChanged(e){
        this.setState({ value: e.target.value });

        this.props.onChange(e, this.state);
    }

    renderEditMode() {
        console.log("test1")
        return (
            <div>{this.props.field.title} : <input type='text' value={this.props.field.value} onChange={this.handleChanged}  /></div>
        )
    }

    renderReadMode() {
        return (
            <div>{this.props.field.title} : {this.props.field.value}</div>
        )
    }

    render () {
        console.log("render");
        console.log(this.props);

        if(this.props.mode != constants.formMode.edit){
            return this.renderReadMode();
        }

        return this.renderEditMode();
    }
}

class ElementForm extends Component {
    constructor(props){
        super(props);

        this.state = { item: this.props.item, isLoading: true , fields: []}
    }

    componentWillMount(){
        this.setState({'fields': this.getFields() });
        this.props.getItem(this.props.routeProps.match.params.id);
    }

    getFields(){
        return this.props.fields.map(field => {
            return { name: field.name, title: field.title, value: this.props.item[field.name], type: field.type }
        });
    }

    fieldChanged(event, field){
        console.log(event, field);
    }

    render () {
        var fields = this.getFields();

        if(!this.props.item.title && this.props.mode != constants.formMode.edit){
            return (<div>Loading...</div>)
        }

        return (
            <div>
                
                {fields.map(field => {
                    return <ElementFormField key={field.name} field={field} mode={this.props.mode} onChange={this.fieldChanged} />
                })}
            </div>
        );
    }
}

export default ElementForm