import React from 'react';
import { Link } from 'react-router'



export default React.createClass({
  getInitialState () {
    return {};
  },

  render () {
    const itemClass = this.props.active ? 'active' : '';
    const iconClasses = 'icon ' + this.props.icon;
    return (
      <li className={itemClass}>
        <Link to={this.props.path} activeClassName='active'
              onlyActiveOnIndex={true}>
          <i className={iconClasses} title={this.props.title}></i>
        </Link>
      </li>
    );
  },
});
