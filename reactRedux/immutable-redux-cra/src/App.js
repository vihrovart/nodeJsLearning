import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionsType from './constants/actionTypes';
import * as actions from './actions/actions';
import Items from './app/components/Items';
import AddItem from './app/components/AddItem';

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
