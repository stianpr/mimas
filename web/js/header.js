import React from 'react';

import '../sass/header.scss';


export default React.createClass({
  getInitialState () {
    return { title: 'Nilsbu' };
  },

  render () {
    return (
      <header>
        <span>{this.state.title}</span>
      </header>
    );
  },
});
