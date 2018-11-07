import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import './App.css';
import Products from './components/Products';

const actionsHelper = require("./helpers/actionsHelper");
const actions = require("./actions/actions");

class App extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
          <h1>Система "Склад"</h1>
          <div>
            <Products items={this.props.products} />
          </div>
          <button onClick={this.props.product_getItems}>GetItems</button>
      </div>
    );
  }
}

// Входные точки для получения чего то из текущего состояния
const mapStateToProp = state => ({
  categories: state.get('categories'),
  products: state.get('products')
});

const mapDispatchToProp2 = (dispatch) => bindActionCreators(actionsHelper.makeActionCreator(actions.Product), dispatch);

export default connect(mapStateToProp, mapDispatchToProp2)(App);
