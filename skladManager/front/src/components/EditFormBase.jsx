import React, {Component} from 'react'
import * as constants from '../constants/constants'
import { Redirect } from 'react-router-dom'

class EditFormBase extends Component {
    constructor(props){
        super(props);

        this.state = this.getState();

        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.save = this.save.bind(this);
        this.isEdit = this.isEdit.bind(this);
        this.getValueOrDefault = this.getValueOrDefault.bind(this);
    }

    getState(){
        return {};
    }

    getValueOrDefault(memberName){
        if(!this.isEdit()){
            return "";
        }

        return this.props.item[memberName];
    }

    handleFieldChange(e){
        this.setState({[e.target.attributes.datafieldname.nodeValue]: e.target.value});
    }

    isEdit(){
        return this.props.mode === constants.formMode.edit
    }

    save(){
        if(this.isEdit()){
            return this.props.saveAction(this.props.item.id , this.state);
        }

        this.props.saveAction(this.state);
    }

    checkStatusAndReturn(value){
        if(this.props.categoryFormStatus === constants.formStatus.sucess){
            return <Redirect to={this.props.backUrl}/>
        }

        return value;
    }
}

export default EditFormBase