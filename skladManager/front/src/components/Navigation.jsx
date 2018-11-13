import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Navigation extends Component {
    render(){
        return (
            <div>
                <NavLink className='navigationLink' activeClassName='navigationLinkActive' exact to="/">Главная</NavLink>
                <NavLink className='navigationLink' activeClassName='navigationLinkActive' exact to="/category">Категории</NavLink>
                <NavLink className='navigationLink' activeClassName='navigationLinkActive' exact to="/section">Разделы</NavLink>
            </div>
        );
    }
}

export default Navigation