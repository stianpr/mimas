import React from 'react';

import sensorStore from '../stores/sensor';
import { speeds } from '../constants/wind';


function getSpeedText (speed) {
  const foundObj = speeds.reverse().find(obj => {
    return speed >= obj.speed;
  });

  return foundObj ? foundObj.text : '';
}

export default React.createClass({
  listener: null,

  componentWillMount () {
    sensorStore.on('wind', this.listener = data => {
      const wind = data.split(',');
      this.setState({
        speed: wind[0],
        gust: wind[1],
      });
    });
  },

  componentWillUnmount () {
    sensorStore.off('wind', this.listener);
  },

  shouldComponentUpdate (nextProps, nextState) {
    return (nextState.speed !== this.state.speed ||
        nextState.gust !== this.state.gust);
  },

  getInitialState () {
    return {
      speed: 10.9,
      gust: 0,
    };
  },

  render () {
    const speed = parseFloat(this.state.speed).toFixed(1);
    const gust = parseFloat(this.state.gust).toFixed(1);
    const speedText = getSpeedText(this.state.speed);
    const gustText = getSpeedText(this.state.gust);

    return (
      <div className="component wind">
        <h2>Vind</h2>
        <ul>
          <li>
            <div className="data">
              <h3>{speed}</h3>
              <span>m/s</span>
            </div>
            <p>{speedText}</p>
          </li>
          <li>
            <div className="data">
              <h3>{gust}</h3>
              <span>m/s</span>
            </div>
            <p>{gustText}</p>
          </li>
        </ul>
      </div>
    );
  },
});
