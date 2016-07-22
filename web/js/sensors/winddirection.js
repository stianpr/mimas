import React from 'react';

import sensorStore from '../stores/sensor';
import { getDirection } from '../utils/wind';
import '../../sass/winddirection.scss';


export default React.createClass({
  listener: null,

  componentWillMount () {
    sensorStore.on('direction', this.listener = data => {
      this.setState({ degrees: data });
    });
  },

  componentWillUnmount () {
    sensorStore.off('direction', this.listener);
  },

  shouldComponentUpdate (nextProps, nextState) {
    return nextState.degrees !== this.state.degrees;
  },

  getInitialState () {
    return { degrees: 0 };
  },

  render () {
    const directionStyle = {
      transform: `rotate(${this.state.degrees}deg)`,
    };
    const direction = getDirection(parseInt(this.state.degrees, 10));

    return (
      <div className="component windspeed">
        <div className="compass">
          <h3>{direction.abbr}</h3>
          <p>{direction.text}</p>
          <div className="arrow" style={directionStyle}></div>
        </div>
      </div>
    );
  },
});
