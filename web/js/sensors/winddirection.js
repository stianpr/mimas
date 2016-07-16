import React from 'react';

import sensorStore from '../stores/sensor';
import '../../sass/winddirection.scss';


const directionTexts = [
    {direction: 11.25, abbr: 'N', text: 'Nord'},
    {direction: 33.75, abbr: 'NNØ', text: 'Nord-Nordøst'},
    {direction: 56.25, abbr: 'NØ', text: 'Nordøst'},
    {direction: 78.75, abbr: 'ØNØ', text: 'Øst-Nordøst'},
    {direction: 101.25, abbr: 'Ø', text: 'Øst'},
    {direction: 123.75, abbr: 'ØSØ', text: 'Øst Sørøst'},
    {direction: 146.25, abbr: 'SØ', text: 'Sørøst'},
    {direction: 168.75, abbr: 'SSØ', text: 'Sør-Sørøst'},
    {direction: 191.25, abbr: 'S', text: 'Sør'},
    {direction: 213.75, abbr: 'SSV', text: 'Sør Sørvest'},
    {direction: 236.25, abbr: 'SV', text: 'Sørvest'},
    {direction: 258.75, abbr: 'VSV', text: 'Vest Sørvest'},
    {direction: 281.25, abbr: 'V', text: 'Vest'},
    {direction: 303.75, abbr: 'VNV', text: 'Vest Nordvest'},
    {direction: 326.25, abbr: 'NV', text: 'Nordvest'},
    {direction: 348.75, abbr: 'NNV', text: 'Nord Nordvest'},
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
  listener: null,

  componentWillMount () {
    sensorStore.on('direction', this.listener = data => {
      this.setState({ degrees: data });
    });
  },

  componentWillUnmount () {
    sensorStore.off('direction', this.listener);
  },

  shouldComponentUpdate (nextProps, nextState) {
    return nextState.degrees !== this.state.degrees;
  },

  getInitialState () {
    return { degrees: 0 };
  },

  render () {
    const directionStyle = {
      transform: `rotate(${this.state.degrees}deg)`,
    };
    const direction = getDirection(parseInt(this.state.degrees, 10));

    return (
      <div className="component windspeed">
        <div className="compass">
          <h3>{direction.abbr}</h3>
          <p>{direction.text}</p>
          <div className="arrow" style={directionStyle}></div>
        </div>
      </div>
    );
  },
});
