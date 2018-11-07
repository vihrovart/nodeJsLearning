import React, { Component } from 'react';
import Product from './Product';

class Products extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.items.map(item => {
                    return <Product key={item.id} item={item} />
                })}
            </div>
        );
    }
}

export default Products