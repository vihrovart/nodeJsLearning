import React, { Component } from 'react'
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import Navigation from "./Navigation"

class AboutCompany extends Component {
    render() {
        return (
            <h2>О компании</h2>
        );
    }
}

class AboutProject extends Component {
    render() {
        return (
            <h2>О проекте</h2>
        );
    }
}

class Abount extends Component {
    render(){
        return (
            <div>
                <Navigation />
                <h2>Информация:</h2>
                    <Switch>
                        <Route path="/about/company" component={AboutCompany} />
                        <Route path="/about/project" component={AboutProject} />
                    </Switch>
             </div>
        );
    }
}

export default Abount;