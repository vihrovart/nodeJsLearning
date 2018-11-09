import React, { Component } from 'react';
import ElementForm from './ElementForm';

class Section extends Component {
    render(){
        var fields = [
            { name: 'title', type: 'string', title: 'Название'}
        ];

        return (
            <div>
                <ElementForm {...this.props} fields={fields} />
            </div>
        );
    }
}

export default Section;