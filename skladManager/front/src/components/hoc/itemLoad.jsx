import React from 'react';
import * as constants from '../../constants/constants';

// Компонент высшего порядка
function itemLoad(Component){
    class ItemLoad extends React.Component {
        componentDidMount(){
            if(this.props.mode ===  constants.formMode.edit || this.props.mode ===  constants.formMode.read){
                this.props.getItem(this.props.routeProps.match.params.id);
            }
        }

        render(){
            if(this.props.mode !== constants.formMode.create && !this.props.item.id){
                return "Загрузка...";
            }
    
            return <Component {...this.props} />
        }
    }

    ItemLoad.displayName = `ItemLoad(${Component.displayName || Component.name || "Component"})`

    return ItemLoad;
}


export default itemLoad;
