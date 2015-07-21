var React = require('react');

module.exports = React.createClass({
  handleClick: function(e) {
    this.props.onClick(e);
    chrome.runtime.sendMessage({ type: 'launchAuthorize' }, this.oauthCallback);
  },
  oauthCallback: function(options) {
    if (options.err) {
      this.props.onTokenFailed(options.status, options.response);
    } else {
      this.props.onTokenSuccess(options.response);
    }
  },
  getSpinnerStyle: function() {
    if (this.props.loading) {
      return { display: 'block' };
    } else {
      return { display: 'none' };
    }
  },
  render: function() {
    chrome.runtime.sendMessage({ type: 'sendAppView', view: 'Login' });

    return(
      <div className='login-wrapper'>
        <div className='spinner-wrapper' style={this.getSpinnerStyle()}>
          <div className='mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active' />
        </div>
        <button onClick={this.handleClick} className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect'>
          Login with Trakt.tv
        </button>
      </div>
    );
  }
});