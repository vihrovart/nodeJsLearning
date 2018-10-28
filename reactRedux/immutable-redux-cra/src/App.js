import React, { Component } from 'react';
import {connect} from 'react-redux';

class App extends Component {
  render() {
    return (
      <div>
        Empty
        <div>
          <p>Views: {this.props.views}</p>
          +{this.props.likes} -{this.props.dislikes}
        </div>
        <div>
          <button onClick={this.props.like}>Like</button>
          <button onClick={this.props.view}>View</button>
          <button onClick={this.props.dislike}>Dislike</button>
        </div>
      </div>
    );
  }
}

const mapStateToProp = state => ({
  likes: state.get('likes'),
  dislikes: state.get('dislikes'),
  views: state.get('views')
});

const mapDispatchToProp = dispatch => ({
  like: () => dispatch({type: "ADD_LIKE"}),
  dislike: () => dispatch({type: "ADD_DISLIKE"}),
  view: () => dispatch({type: "ADD_VIEW"}),
});

export default connect(mapStateToProp, mapDispatchToProp)(App);
