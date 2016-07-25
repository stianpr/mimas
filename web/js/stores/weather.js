import EventEmitter from 'event-emitter';


const Store = function (url) {
  this.url = url;
};

Store.prototype = {
  get (from_date, to_date) {
    return fetch(this.url + '?from='+ from_date + '&to=' + to_date)
      .then(response => response.json())
      .then(data =>  {
        this.emit('data', data);
      });
  },
};

const store = EventEmitter(new Store('http://nilsbu.no/api/weather-stats/'));

export default store;
