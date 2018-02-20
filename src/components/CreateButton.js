import React, { Component } from 'react';

class CreateButton extends Component {

  render () {
    return <div>
      <button onClick={() => this.props.click()}>{this.props.text}</button>
      </div>

  }
}

export default CreateButton;
