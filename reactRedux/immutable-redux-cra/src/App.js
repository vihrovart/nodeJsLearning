import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionsType from './constants/actionTypes';
import * as actions from './actions/actions';

class Items extends Component {
  render(){
    return (
      <div>
        Элементы
        <div>{ this.props.items.map(item => {
          return <Item item={item} />
        })}</div>
      </div>
      
    )
  }
}

class Item extends Component {
  render() {
    return (
      <div>
        <div>Title: { this.props.item.title } ({this.props.item.count })</div>
      </div>
    );
  }
}

class AddItem extends Component {
  constructor(props){
    super(props);
    this.state = {title: "", count: 0};
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
  }
  handleChangeTitle(e){
    this.state.title = e.target.value;
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

class App extends Component {
  render() {
    return (
      <div>
        Empty
        <div>
          <p>Views: {this.props.views}</p>
          +{this.props.likes} -{this.props.dislikes}

        </div>
        <div>
          <AddItem addItem={this.props.addItem} />
          <Items items={this.props.items} />
        </div>
        <div>
          <button onClick={this.props.addLike}>Like</button>
          <button onClick={this.props.addView}>View</button>
          <button onClick={this.props.addDisLike}>Dislike</button>
        </div>
        <div> <button onClick={this.props.getItems}>Get items</button></div>
      </div>
    );
  }
}

// Входные точки для получения чего то из текущего состояния
const mapStateToProp = state => ({
  likes: state.get('likes'),
  dislikes: state.get('dislikes'),
  views: state.get('views'),
  items: state.get('items')
});

// 'Ярлыки' событий, действий пользователя с указанием типа
const mapDispatchToProp = dispatch => ({
  like: () => dispatch({ type: actionsType.ADD_LIKE }),
  dislike: () => dispatch({ type: actionsType.ADD_DISLIKE}),
  view: () => dispatch({ type: actionsType.ADD_VIEW }),
  getItems: () => dispatch({ type: actionsType.GET_ITEMS }),
  addItem: (item) => dispatch({ type: actionsType.ADD_ITEM, item }),
});

// Еще один подход в формировании пула действий (акшенов)
const mapDispatchToProp2 = (dispatch) => bindActionCreators(actions, dispatch);

// Коннект компонента с Redux с указанием методов доступа к состоянию текущему
export default connect(mapStateToProp, mapDispatchToProp2)(App);
