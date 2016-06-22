import React from 'react';

import setupFixedHeader from './fixed-header';
import '../sass/content.scss';


export default React.createClass({
  componentDidMount () {
    setupFixedHeader();
  },

  render () {
    return (
      <div className="content">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Mauris pretium lorem non purus aliquam sodales at cursus
          arcu. Vivamus eget sollicitudin risus, eu sodales mi.
          Praesent euismod in dui vel mollis. Donec nec sodales elit.
          Phasellus ornare finibus nibh a pellentesque. Curabitur at
        </p>
        <p>
          tellus porta, fringilla quam id, lacinia tortor. Pellentesque
          habitant morbi tristique senectus et netus et malesuada fames ac
          turpis egestas. Maecenas volutpat id nisl ac imperdiet. Vestibulum
          porta eu nibh eget condimentum. Donec lobortis, nulla ac finibus
          malesuada, lectus dui viverra nisi, vitae malesuada turpis magna ut
          lacus.
        </p>
        <p>
          tellus porta, fringilla quam id, lacinia tortor. Pellentesque
          habitant morbi tristique senectus et netus et malesuada fames ac
          turpis egestas. Maecenas volutpat id nisl ac imperdiet. Vestibulum
          porta eu nibh eget condimentum. Donec lobortis, nulla ac finibus
          malesuada, lectus dui viverra nisi, vitae malesuada turpis magna ut
          lacus.
        </p>
        <p>
          tellus porta, fringilla quam id, lacinia tortor. Pellentesque
          habitant morbi tristique senectus et netus et malesuada fames ac
          turpis egestas. Maecenas volutpat id nisl ac imperdiet. Vestibulum
          porta eu nibh eget condimentum. Donec lobortis, nulla ac finibus
          malesuada, lectus dui viverra nisi, vitae malesuada turpis magna ut
          lacus.
        </p>
        <p>
          tellus porta, fringilla quam id, lacinia tortor. Pellentesque
          habitant morbi tristique senectus et netus et malesuada fames ac
          turpis egestas. Maecenas volutpat id nisl ac imperdiet. Vestibulum
          porta eu nibh eget condimentum. Donec lobortis, nulla ac finibus
          malesuada, lectus dui viverra nisi, vitae malesuada turpis magna ut
          lacus.
        </p>
      </div>
    );
  },
});
