import React from 'react';

import { getDirection, getSpeedText } from '../utils/wind';

export default React.createClass({
  render () {
    const max = parseFloat(this.props.max).toFixed(1);
    const avg = parseFloat(this.props.avg).toFixed(1);
    const maxText = getSpeedText(max);
    const avgText = getSpeedText(avg);
    const directionText = getDirection(this.props.direction);

    return (
      <div className="weather">
        <h2>Vind</h2>
        <ul>
          <li>
            <span>snitt</span>
            <h3>{avg}</h3>
            <span>m/s</span>
            <span>{avgText}</span>
          </li>
          <li>
            <span>maks</span>
            <h3>{max}</h3>
            <span>m/s</span>
            <span>{maxText}</span>
          </li>
          <li>
            <span>retning</span>
            <h3>{this.props.direction}</h3>
            <span>&deg;</span>
            <span>{directionText.text}</span>
          </li>
        </ul>
      </div>
    );
  },
});
