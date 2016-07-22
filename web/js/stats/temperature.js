import React from 'react';

export default React.createClass({
  render () {
    const min = parseFloat(this.props.min).toFixed(1);
    const max = parseFloat(this.props.max).toFixed(1);

    return (
      <div className="weather">
        <h2>Temperatur</h2>
        <ul>
          <li>
            <span className="type">min</span>
            <h3>{min}</h3>
            <span>&deg;C</span>
          </li>
          <li>
            <span className="type">maks</span>
            <h3>{max}</h3>
            <span>&deg;C</span>
          </li>
        </ul>
      </div>
    );
  },
});
