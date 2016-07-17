import React from 'react';

import sensorStore from '../stores/sensor';
import { getSpeedText } from '../utils/wind';

export default React.createClass({
  shouldComponentUpdate (nextProps, nextState) {
    return (nextProps.max !== this.props.max ||
        nextProps.avg !== this.props.avg);
  },

  render () {
    const max = parseFloat(this.props.max).toFixed(1);
    const avg = parseFloat(this.props.avg).toFixed(1);
    const maxText = getSpeedText(max);
    const avgText = getSpeedText(avg);

    return (
      <div className="weather">
        <h2>Vind</h2>
        <ul>
          <li>
            <h3>{avg}</h3>
            <span>m/s</span>
            <span>{avgText} i snitt.</span>
          </li>
          <li>
            <h3>{max}</h3>
            <span>m/s</span>
            <span>{maxText} på maks.</span>
          </li>
        </ul>
      </div>
    );
  },
});
