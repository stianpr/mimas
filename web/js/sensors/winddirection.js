import React from 'react';

import '../../sass/winddirection.scss';

const directionTexts = [
    {direction: 11.25, abbr: 'N', text: 'Nord'},
    {direction: 33.75, abbr: 'NNE', text: 'Nord-Nordøst'},
    {direction: 56.25, abbr: 'NE', text: 'Nordøst'},
    {direction: 78.75, abbr: 'ENE', text: 'Øst-Nordøst'},
    {direction: 101.25, abbr: 'E', text: 'Øst'},
    {direction: 123.75, abbr: 'ESE', text: 'Øst Sørøst'},
    {direction: 146.25, abbr: 'SE', text: 'Sørøst'},
    {direction: 168.75, abbr: 'SSE', text: 'Sør-Sørøst'},
    {direction: 191.25, abbr: 'S', text: 'Sør'},
    {direction: 213.75, abbr: 'SSW', text: 'Sør Sørvest'},
    {direction: 236.25, abbr: 'SW', text: 'Sørvest'},
    {direction: 258.75, abbr: 'WSW', text: 'Vest Sørvest'},
    {direction: 281.25, abbr: 'W', text: 'Vest'},
    {direction: 303.75, abbr: 'WNW', text: 'Vest Nordvest'},
    {direction: 326.25, abbr: 'NW', text: 'Nordvest'},
    {direction: 348.75, abbr: 'NNW', text: 'Nord Nordvest'},
];

function getDirection (degrees) {
  const found = directionTexts.find(obj => {
    return degrees < obj.direction;
  });

  if (!found) {
    return directionTexts[0];
  }

  return found;
}

export default React.createClass({
  render () {
    const directionStyle = {
      transform: `rotate(${this.props.degrees}deg)`,
    };
    const direction = getDirection(parseInt(this.props.degrees, 10));

    return (
      <div className="compass">
        <h3>{direction.abbr}</h3>
        <p>{direction.text}</p>
        <div className="arrow" style={directionStyle}></div>
      </div>
    );
  },
});
