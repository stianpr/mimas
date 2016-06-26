import React from 'react';


export default React.createClass({
  getInitialState () {
    return {};
  },

  render () {
    const itemClass = this.props.active ? 'active' : '';
    const iconClasses = 'icon ' + this.props.icon;
    return (
      <li className={itemClass}>
        <i className={iconClasses} title={this.props.title}></i>
      </li>
    );
  },
});
