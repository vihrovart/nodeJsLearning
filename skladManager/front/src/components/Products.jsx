import React, { Component } from 'react';
import Product from './Product';

class Products extends Component {
    componentWillMount(){
        this.props.getItems();
    }

    render() {
        return (
            <div>
                <h2>Товары</h2>
                {this.props.items.map(item => {
                    return <Product key={item.id} item={item} />
                })}
            </div>
        );
    }
}

export default Products