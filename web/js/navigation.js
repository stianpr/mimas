import React from 'react';

import NavigationItem from './navigation_item';
import '../sass/navigation.scss';


export default React.createClass({
  getInitialState () {
    return {
      links: [
        {
          icon: 'cloud',
          title: 'Now',
          active: true,
        },
        {
          icon: 'image',
          title: 'Snaphots',
          active: false,
        },
        {
          icon: 'graph',
          title: 'Weather',
          active: false,
        },
      ]
    };
  },

  render () {
    const items = this.state.links.map((item, index) =>
      <NavigationItem
        key={index}
        icon={item.icon}
        title={item.title}
        active={item.active} />
    );
    return (
      <nav><ol>{items}</ol></nav>
    );
  },
});
