import React from 'react';


export default React.createClass({
  render () {
    const pressure = parseFloat(this.props.pressure).toFixed(1);

    return (
      <div className="data">
        <h3>{pressure}</h3>
        <span>hba</span>
      </div>
    );
  },
});
