const React = require('react');

class Items extends React.Component {
    render(){
      return (
        <div>
          Элементы
          <div>{ this.props.items.map(item => {
            return <Item item={item} />
          })}</div>
        </div>
        
      )
    }
  }
  
  class Item extends React.Component {
    render() {
      return (
        <div>
          <div>Title: { this.props.item.title } ({this.props.item.count })</div>
        </div>
      );
    }
  }

export default Items;