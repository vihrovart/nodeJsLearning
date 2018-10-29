import React, { Component } from 'react';
import {connect} from 'react-redux';

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
          <div><span>Title: </span>{this.props.item.title}</div>
          <div><span>Count: </span>{this.props.item.count}</div>
        </div>
        <div>
          <button onClick={this.props.like}>Like</button>
          <button onClick={this.props.view}>View</button>
          <button onClick={this.props.dislike}>Dislike</button>
        </div>
        <div> <button onClick={this.props.getItem}>Get item</button></div>
      </div>
    );
  }
}

// Входные точки для получения чего то из текущего состояния
const mapStateToProp = state => ({
  likes: state.get('likes'),
  dislikes: state.get('dislikes'),
  views: state.get('views'),
  item: state.get('item')
});

// 'Ярлыки' событий, действий пользователя с указанием типа
const mapDispatchToProp = dispatch => ({
  like: () => dispatch({type: "ADD_LIKE"}),
  dislike: () => dispatch({type: "ADD_DISLIKE"}),
  view: () => dispatch({type: "ADD_VIEW"}),
  getItem: () => dispatch({type: "GET_ITEM"}),
});

// Коннект компонента с Redux с указанием методов доступа к состоянию текущему
export default connect(mapStateToProp, mapDispatchToProp)(App);
