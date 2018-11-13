import React, { Component } from 'react';
import ViewForm from './ViewForm';

class Section extends Component {
    render(){
        var fields = [
            { name: 'title', type: 'string', title: 'Название'}
        ];

        return (
            <div>
                <ViewForm {...this.props} fields={fields} />
            </div>
        );
    }
}

export default Section;