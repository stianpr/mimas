import React from 'react';


export default React.createClass({
  render () {
    return (
      <div className="data">
        <h3>{this.props.pressure}</h3>
        <span>hba</span>
      </div>
    );
  },
});
