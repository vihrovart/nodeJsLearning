import React, {Component} from 'react'
import { NavLink } from 'react-router-dom'
import '../../css/navigation.css'

class Navigation extends Component {
    render () {
        return (
            <nav>
                <NavLink activeClassName='navActive' className="nav" exact to="/">Главная</NavLink>
                <NavLink activeClassName='navActive' className="nav" to="/about/company">О компании</NavLink>
                <NavLink activeClassName='navActive' className="nav" to="/about/project">О проекте</NavLink>
            </nav>
        );
    }
}

export default Navigation