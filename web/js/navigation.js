import React from 'react';

import NavigationItem from './navigation_item';
import '../sass/navigation.scss';


export default React.createClass({
  getInitialState () {
    return {
      links: [
        {
          icon: 'ion-ios-partly-sunny',
          title: 'Now',
          active: true,
        },
        {
          icon: 'ion-md-image',
          title: 'Snaphots',
          active: false,
        },
        {
          icon: 'ion-ios-stats',
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
