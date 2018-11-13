import React, { Component } from 'react'

class Item extends Component {
    constructor(props){
        super(props);

        this.itemDeleteHandler = this.itemDeleteHandler.bind(this);
    }

    itemDeleteHandler(){
        if(window.confirm(`Вы действительно хотите удалить элемент "${this.props.item.title}?"`)){
            this.props.deleteAction(this.props.item.id);
        }
    }

    render(){
        return (
            <div>
                <div className='listItem'><a href={this.props.url}>{this.props.item.title}</a></div>
                    <a className='listItemEdit' href={this.props.editUrl}>Редактировать</a>
                    <a className='listItemDelete' onClick={this.itemDeleteHandler}>Удалить</a>
            </div>
        )
    }
}

class ItemsList extends Component {
    componentWillMount(){
        this.props.getItems()
    }

    render(){
        console.log(this.props);
        var createUrl = `${this.props.routeProps.match.path}create`;

        return (
            <div>
                <h2>{this.props.listTitle} <a className='appButton' href={createUrl}>+</a></h2>
                
                <div>
                    {this.props.items.map(item => {
                        var editUrl = `${this.props.routeProps.match.path}edit/${item.id}`;
                        var url = `${this.props.routeProps.match.path}${item.id}`;
                        return <Item key={item.id} item={item} url={url} editUrl={editUrl} deleteAction={this.props.deleteAction} />
                    })}
                </div>
            </div>
        );
    }
}

export default ItemsList