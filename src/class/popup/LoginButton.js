import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';

class LoginButton extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick(e) {
    this.props.onLoginClicked(e);
    chrome.runtime.sendMessage({ type: `launchAuthorize` }, this.oauthCallback.bind(this));
  }

  oauthCallback(options) {
    if (options.error) {
      this.props.onTokenFailed(options.status, options.response);
    } else {
      this.props.onTokenSuccess(options.response);
    }
  }

  render() {
    chrome.runtime.sendMessage({ type: `sendAppView`, view: `Login` });

    return(
      <div className='login-wrapper'>
        <Loading show={this.props.loading} />
        <button onClick={this.handleClick.bind(this)} className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect'>
          Login with Trakt.tv
        </button>
      </div>
    );
  }
}

LoginButton.propTypes = {
  loading: PropTypes.bool,
  onLoginClicked: PropTypes.func,
  onTokenFailed: PropTypes.func,
  onTokenSuccess: PropTypes.func
};

export default LoginButton;