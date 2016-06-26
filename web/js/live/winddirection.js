import React from 'react';

import '../../sass/winddirection.scss';

const directionTexts = [
    {directions: [348.75, 11.25], abbr: 'N', text: 'Nord'},
    {directions: [11.26, 33.75], abbr: 'NNE', text: 'Nord-Nordøst'},
    {directions: [33.76, 56.25], abbr: 'NE', text: 'Nordøst'},
    {directions: [56.26, 78.75], abbr: 'ENE', text: 'Øst-Nordøst'},
    {directions: [78.76, 101.25], abbr: 'E', text: 'Øst'},
    {directions: [101.26, 123.75], abbr: 'ESE', text: 'Øst Sørøst'},
    {directions: [123.76, 146.25], abbr: 'SE', text: 'Sørøst'},
    {directions: [146.26, 168.75], abbr: 'SSE', text: 'Sør-Sørøst'},
    {directions: [168.76, 191.25], abbr: 'S', text: 'Sør'},
    {directions: [191.26, 213.75], abbr: 'SSW', text: 'Sør Sørvest'},
    {directions: [213.76, 236.25], abbr: 'SW', text: 'Sørvest'},
    {directions: [236.26, 258.75], abbr: 'WSW', text: 'Vest Sørvest'},
    {directions: [258.76, 281.25], abbr: 'W', text: 'Vest'},
    {directions: [281.26, 303.75], abbr: 'WNW', text: 'Vest Nordvest'},
    {directions: [303.76, 326.25], abbr: 'NW', text: 'Nordvest'},
    {directions: [326.26, 348.75], abbr: 'NNW', text: 'Nord Nordvest'},
];


function getDirection (degrees) {
  return directionTexts.find(obj => {
    return degrees >= obj.directions[0] && degrees <= obj.directions[1];
  });
}

export default React.createClass({
  getInitialState () {
    return {
      direction: getDirection(this.props.degrees),
    };
  },

  render () {
    const directionStyle = {
      transform: `rotate(${this.props.degrees}deg)`,
    };

    return (
      <div className="winddirection component">
        <h2>WIND DIRECTION</h2>
        <div className="compass">
          <h3>{this.state.direction.abbr}</h3>
          <p>{this.state.direction.text}</p>
          <div className="arrow" style={directionStyle}></div>
        </div>

      </div>
    );
  },
});
