import React from 'react';

import '../../sass/windspeed.scss';

const speedTexts = [
  {speeds: [0.0, 0.3], text: 'Stille'},
  {speeds: [0.3, 1.5], text: 'Flau vind'},
  {speeds: [1.6, 3.3], text: 'Svak vind'},
  {speeds: [3.4, 5.4], text: 'Lett bris'},
  {speeds: [5.5, 7.9], text: 'Laber bris'},
  {speeds: [8.0, 10.7], text: 'Frisk bris'},
  {speeds: [10.8, 13.8], text: 'Liten kuling'},
  {speeds: [13.9, 17.1], text: 'Stiv kuling'},
  {speeds: [17.2, 20.7], text: 'Sterk kuling'},
  {speeds: [20.8, 24.4], text: 'Liten storm'},
  {speeds: [24.5, 28.4], text: 'Full storm'},
  {speeds: [28.5, 32.6], text: 'Sterk storm'},
  {speeds: [32.7, 99.0], text: 'Orkan'},
];

function getSpeedText (speed) {
  const foundObj = speedTexts.find(obj => {
    return speed >= obj.speeds[0] && speed <= obj.speeds[1];
  });

  return foundObj ? foundObj.text : '';
}

export default React.createClass({
  getInitialState () {
    return {
      speedText: getSpeedText(this.props.speed) || '',
      gustText: getSpeedText(this.props.gust) || '',
    }
  },

  render () {
    return (
      <div className="windspeed">
        <h2>WIND SPEED</h2>
        <ul>
          <li>
            <div className="data">
              <h3>{this.props.speed}</h3>
              <span>m/s</span>
            </div>
            <p>{this.state.speedText}</p>
          </li>
          <li>
            <div className="data">
              <h3>{this.props.gust}</h3>
              <span>m/s</span>
            </div>
            <p>{this.state.gustText}</p>
          </li>
        </ul>
      </div>
    );
  },
});
