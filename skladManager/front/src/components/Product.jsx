import React, { Component } from 'react';

class Product extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>{this.props.item.title} ({this.props.item.Category.title}/{this.props.item.Section.title})</div>
        );
    }
}

export default Product