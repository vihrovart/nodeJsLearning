import React, { Component } from 'react';
import Sections from "../components/Section/Sections"
import Section from "../components/Section/Section"
import SectionEdit from '../components/Section/SectionEdit';
const actionsHelper = require("../helpers/actionsHelper");

class SectionRoute extends Component {
    render() {
        return actionsHelper.EntryRoute(this.props, Sections, Section, SectionEdit, "section");
    }
}

export default SectionRoute;
