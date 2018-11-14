import React from 'react';
import itemLoad from "../hoc/itemLoad";
import EditFormBase from '../EditFormBase'

class SectionEditForm extends EditFormBase {
    getState(){
        var title = this.getValueOrDefault("title");

        return {title: title};
    }

    render() {
        console.log(this.state, this.props);

        return this.checkStatusAndReturn(
            <div>
                <div>Название : <input type='text' value={this.state.title} datafieldname="title" onChange={this.handleFieldChange}></input></div>
                <div>Отменить</div>
                <button onClick={this.save}>Сохранить</button>
            </div>
        );
    }
}

export default  itemLoad(SectionEditForm);
