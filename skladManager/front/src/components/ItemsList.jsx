import React, { Component } from 'react'

class Item extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <a href={this.props.url}>{this.props.item.title}</a>
            </div>
        )
    }
}

class ItemsList extends Component {
    constructor(props){
        super(props);
    }

    componentWillMount(){
        this.props.getItems()
    }

    render(){
        console.log(this.props);
        return (
            <div>
                <h2>{this.props.listTitle}</h2>
                <div>
                    {this.props.items.map(item => {
                        var url = `${this.props.routeProps.match.path}${item.id}`;
                        return <Item key={item.id} item={item} url={url} />
                    })}
                </div>
            </div>
        );
    }
}

export default ItemsList