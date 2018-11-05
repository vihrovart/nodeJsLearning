import React, { Component } from 'react';
import '../../css/addItem.css';
import moment from 'moment';
import 'moment/min/moment-with-locales'
import DatePicker from "react-datepicker"
import 'moment/locale/ru'
import "react-datepicker/dist/react-datepicker.css";

class AddItem extends Component {
    constructor(props){
      super(props);
      this.state = {title: "", titleIsValid: false, count: 0, countIsValid: false, date: moment()};
      this.handleChangeTitle = this.handleChangeTitle.bind(this);
      this.handleChangeCount = this.handleChangeCount.bind(this);
      this.handleChangeDate = this.handleChangeDate.bind(this);
      this.handleAddItem = this.handleAddItem.bind(this);
    }
    handleChangeTitle(e){
      this.validateTitle(e.target.value);
      this.setState({ title: e.target.value });
    }
    handleChangeCount(e){
      this.validateCount(e.target.value);
      this.setState({ count: e.target.value});
    }
    handleChangeDate(e){
      this.setState({date: e});
    }
    handleAddItem(){
      if(!this.validate()){
        return;
      }

      this.props.addItem(this.state);
    }
    validateCount(value){
      console.log(this);
      
      var res = value > 0;
      this.setState({countIsValid: res});
      return res;
    }
    validateTitle(value){
      var res = value.length > 2;
      this.setState({titleIsValid: res});
      return res;
    }
    validate(){
      this.setState({message: ""});
      var res = true;
      var messagePool = [];

      var validationActions = [];
      validationActions.push({action: () => this.validateCount(this.state.count), message: "Количество должно быть больше 0" });
      validationActions.push({action: () => this.validateTitle(this.state.title), message: "В название должно быть не менее 3 букв" });
      
      validationActions.forEach(function(item){
        if(!item.action()){
          messagePool.push(item.message);
          res = false;
        }
      });

      this.setState({ message: messagePool.join("<br/>") });

      return res;
    }
    render() {
      var countValidClassName = this.state.countIsValid ? "" : "notValidValue";
      var titleValidClassName = this.state.titleIsValid ? "" : "notValidValue";
      return (
        <div className='addItemContainer'>
          <div className='addItemTitle'>Добавить элемент</div>
          <div className='addItemElementsContainer'>
            <input type='text' className={titleValidClassName} placeholder='Введите название элемента' onChange={this.handleChangeTitle} value={this.state.title}></input>
            <input className={'addItemCount ' + countValidClassName} type='text' placeholder='Количество' onChange={this.handleChangeCount} value={this.state.count}></input>
            <DatePicker className="addItemDate" dateFormat="DD.MM.YYYY" selected={this.state.date} onChange={this.handleChangeDate} />
            <div className='button addItemSave' onClick={this.handleAddItem}>+</div>
          </div>
          <div className="validateMessage" dangerouslySetInnerHTML={{__html: this.state.message}} />
        </div>
      );
    }
  }

export default AddItem;
  