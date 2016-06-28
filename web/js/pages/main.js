import React from 'react';

import Header from '../header';
import Navigation from '../navigation';


export default React.createClass({
  render () {
    return (
      <div>
        <Header />
        <Navigation />
        {this.props.children}
      </div>
    );
  },
});
