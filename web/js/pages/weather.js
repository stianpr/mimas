import React from 'react';

import DateSpan from '../datespan';
import Wind from '../stats/wind';

import '../../sass/weather.scss';


export default React.createClass({
  render () {
    return (
      <div className="content">
        <DateSpan />
        <Wind  avg="8.2" max="15.8" />
      </div>
    );
  },
});
