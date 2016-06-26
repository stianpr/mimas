import React from 'react';

import setupFixedHeader from './fixed-header';
import WindSpeed from './live/windspeed';


export default React.createClass({
  componentDidMount () {
    setupFixedHeader();
  },

  render () {
    return (
      <div className="content">
        <WindSpeed speed="6.3" gust="12.4" />
      </div>
    );
  },
});
