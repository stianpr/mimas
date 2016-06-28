import React from 'react';

import NavigationItem from './navigation_item';
import '../sass/navigation.scss';


export default React.createClass({
  getInitialState () {
    return {
      links: [
        {
          icon: 'ion-ios-pulse',
          title: 'Now',
          active: true,
          path: '/',
        },
        {
          icon: 'ion-md-image',
          title: 'Snaphots',
          active: false,
          path: '/snapshots',
        },
        {
          icon: 'ion-ios-partly-sunny',
          title: 'Weather',
          active: false,
          path: '/weather'
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
        active={item.active}
        path={item.path} />
    );
    return (
      <nav><ol>{items}</ol></nav>
    );
  },
});
