import React from 'react';

import '../sass/header.scss';


export default React.createClass({
  getInitialState () {
    return { title: 'Weather' };
  },

  render () {
    return (
      <header>
        <span>{this.state.title}</span>
      </header>
    );
  },
});
