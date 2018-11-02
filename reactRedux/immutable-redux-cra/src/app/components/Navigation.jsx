import React, {Component} from 'react'
import { NavLink } from 'react-router-dom'
import '../../css/navigation.css'

class Navigation extends Component {
    render () {
        return (
            <nav>
                <NavLink activeClassName='navActive' className="nav" exact to="/">Главная</NavLink>
                <NavLink activeClassName='navActive' className="nav" to="/about/company">О компании</NavLink>
                <NavLink activeClassName='navActive' className="nav" exact to="/about/project">О проекте</NavLink>
                <NavLink activeClassName='navActive' className="nav" to="/about/project/Венера">О проекте Венера</NavLink>
                <NavLink activeClassName='navActive' className="nav" to="/about/item/1">О первом элементе</NavLink>
            </nav>
        );
    }
}

export default Navigation