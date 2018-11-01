import React, { Component } from 'react';

class AddItem extends Component {
    constructor(props){
      super(props);
      this.state = {title: "", count: 0};
      this.handleChangeTitle = this.handleChangeTitle.bind(this);
      this.handleAddItem = this.handleAddItem.bind(this);
    }
    handleChangeTitle(e){
      this.setState({ title: e.target.value });
    }
    handleAddItem(){
      this.props.addItem(this.state);
    }
    render() {
      return (
        <div>
          Добавить элемент
          <input type='text' placeholder='Введите название элемента' onChange={this.handleChangeTitle}></input><button onClick={this.handleAddItem}>+</button>
        </div>
      );
    }
  }

export default AddItem;
  