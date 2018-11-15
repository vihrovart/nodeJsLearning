import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import './App.css';
import Products from './components/Products';
import Sections from "./components/Section/Sections"
import Section from "./components/Section/Section"
import Navigation from './components/Navigation';
import * as constants from "./constants/constants";
import CategoryRoute from "./routes/CategoryRoute"
import SectionRoute from "./routes/SectionRoute"

const actionsHelper = require("./helpers/actionsHelper");
const actions = require("./actions/actions");

class App extends Component {
  render() {
    console.log(this.props);
    return (
      <div className='mainContainer'>
          <div>
            <Navigation />
          </div>
          <h1>Система "Склад"</h1>
          <div>
            <CategoryRoute {...this.props} />
            <SectionRoute {...this.props} />
            <Switch>
              <Route exact path="/" render={(props) => <Products items={this.props.product.items} getItems={this.props.product_getItems} />} />
            </Switch>
          </div>
      </div>
    );
  }
}

const mapStateToProp = state => ({
  category: actionsHelper.MakeEntryProps(actions.Category, state),
  product: actionsHelper.MakeEntryProps(actions.Product, state),
  section: actionsHelper.MakeEntryProps(actions.Section, state),
});

/*
// Входные точки для получения чего то из текущего состояния
const mapStateToProp1 = state => ({
  products: state.get('products'),
  categories: state.get('category.categories'),
  sections: state.get('sections'),
  category: state.get('category'),
  section: state.get('section'),
  categoryFormStatus: state.get('categoryFormStatus')
});
*/

const mapDispatchToProp = (dispatch) => bindActionCreators(
   {
     ...actionsHelper.makeActionCreator(actions.Product),
     ...actionsHelper.makeActionCreator(actions.Category),
     ...actionsHelper.makeActionCreator(actions.Section),
   }, dispatch);

export default connect(mapStateToProp, mapDispatchToProp)(App);
