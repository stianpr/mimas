const Store = function (url) {
  this.url = url;
};

Store.prototype = {
  get () {
    return fetch(this.url)
      .then(response => response.json())
      .then(data => data);
  },
};

export default new Store('http://nilsbu.no/api/weather-stats/');
