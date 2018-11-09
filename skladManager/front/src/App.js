import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import './App.css';
import Products from './components/Products';
import ItemsList from "./components/ItemsList";
import Categories from "./components/Category/Categories"
import Category from "./components/Category/Category"
import Sections from "./components/Sections"
import Section from "./components/Section"
import Navigation from './components/Navigation';
import * as constants from "./constants/constants";
import CategoryEdit from './components/Category/CategoryEdit';

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
            <Switch>
              <Route exact path="/" render={(props) => <Products items={this.props.products} getItems={this.props.product_getItems} />} />
              <Route exact path="/category/" render={(props) => <Categories routeProps={props} items={this.props.categories} getItems={this.props.category_getItems} />} />
              <Route path="/category/edit/:id" render={(props) => 
                <CategoryEdit 
                  mode={constants.formMode.edit} 
                  routeProps={props} 
                  getItem={this.props.category_getItem} 
                  item={this.props.category}
                  saveAction={this.props.category_putItem} />} 
              />
              <Route path="/category/create" render={(props) => 
                <CategoryEdit 
                  mode={constants.formMode.create} 
                  routeProps={props} 
                  saveAction={this.props.category_addItem} />} 
              />
              <Route path="/category/:id" render={(props) => 
                <Category
                  mode={constants.formMode.read} 
                  routeProps={props} 
                  getItem={this.props.category_getItem} 
                  item={this.props.category} />} 
              />
              <Route exact path="/section/" render={(props) => <Sections routeProps={props} listTitle="Разделы" items={this.props.sections} getItems={this.props.section_getItems} />} />
              <Route path="/section/:id" render={(props) => <Section routeProps={props} getItem={this.props.section_getItem} item={this.props.section} />} />
            </Switch>
          </div>
      </div>
    );
  }
}

// Входные точки для получения чего то из текущего состояния
const mapStateToProp = state => ({
  products: state.get('products'),
  categories: state.get('categories'),
  sections: state.get('sections'),
  category: state.get('category'),
  section: state.get('section')
});

const mapDispatchToProp2 = (dispatch) => bindActionCreators(
   {
     ...actionsHelper.makeActionCreator(actions.Product),
     ...actionsHelper.makeActionCreator(actions.Category),
     ...actionsHelper.makeActionCreator(actions.Section),
   }, dispatch);

export default connect(mapStateToProp, mapDispatchToProp2)(App);
