import React from 'react';
import Header from './header';
import Navigation from './navigation';
import Content from './content';


export default React.createClass({
  render: function() {
    return (
      <div id="app">
        <Header />
        <Navigation />
        <Content />
      </div>
    );
  },
});
