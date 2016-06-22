import React from 'react';


export default React.createClass({
  getInitialState () {
    return {};
  },

  render () {
    const classList = this.props.active ? 'active' : '';
    return (
      <li className={classList}>
        <span>{this.props.title}</span>
      </li>
    );
  },
});
