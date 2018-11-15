import React, { Component } from 'react';
import Categories from "../components/Category/Categories"
import Category from "../components/Category/Category"
import CategoryEdit from '../components/Category/CategoryEdit';
const actionsHelper = require("../helpers/actionsHelper");

class CategoryRoute extends Component {
    render() {
        return actionsHelper.EntryRoute(this.props, Categories, Category, CategoryEdit, "category");
    }
}

export default CategoryRoute;
