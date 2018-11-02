import { NavLink } from 'react-router-dom'
const React = require('react');


class Items extends React.Component {
    render(){
      return (
        <div>
          Элементы
          <div>{ this.props.items.map(item => {
            return <Item item={item} key={item.id} />
          })}</div>
        </div>
      )
    }
  }
  
  class Item extends React.Component {
    render() {
      return (
        <div>
          <div><NavLink to={`/about/item/${this.props.item.id}`}>Title: { this.props.item.title } ({this.props.item.count })</NavLink></div>
        </div>
      );
    }
  }

export default Items;