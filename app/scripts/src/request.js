var Settings = require('./settings.js');

module.exports = {
  send: function(options) {
    var xhr = new XMLHttpRequest();

    xhr.open(options.method, options.url, true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.setRequestHeader('trakt-api-key', Settings.clientId);
    xhr.setRequestHeader('trakt-api-version', Settings.apiVersion);

    xhr.onload = function() {
      if (this.status >= 200 && this.status < 400) {
        options.success.call(this, this.response);
      } else {
        options.error.call(this, this.status, this.responseText);
      }
    }
    xhr.onerror = options.error;

    xhr.send(JSON.stringify(options.params));
  }
};