import React from 'react';


export default React.createClass({
  getInitialState () {
      return {
        currentChild: 0,
      };
  },

  handleClick () {
    if (this.state.currentChild == this.props.children.length -1) {
      this.setState({ currentChild: 0 });
    }
    else {
      this.setState({ currentChild: this.state.currentChild + 1 });
    }
  },

  render () {
    return (
      <div className='component' onClick={this.handleClick}>
        {this.props.children[this.state.currentChild]}
      </div>
    );
  },
});
