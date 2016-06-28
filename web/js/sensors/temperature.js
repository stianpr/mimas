import React from 'react';


export default React.createClass({
  render () {
    const temperature = parseFloat(this.props.temperature).toFixed(1);

    return (
      <div className="data">
        <h3>{temperature}</h3>
        <span>&deg;C</span>
      </div>
    );
  },
});
