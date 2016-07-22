import React from 'react';

export default React.createClass({
  render () {
    const sum = parseFloat(this.props.sum).toFixed(1);

    return (
      <div className="weather">
        <h2>Nedbør</h2>
        <ul>
          <li>
            <span>totalt</span>
            <h3>{sum}</h3>
            <span>mm</span>
          </li>
        </ul>
      </div>
    );
  },
});
