import PropTypes from 'prop-types';
import React from 'react';
import ErrorBoundary from '../ErrorBoundary';
import Loading from './Loading';

class LoginButton extends React.Component {
  constructor(props) {
    super(props);
  }

  async handleClick(e) {
    this.props.onLoginClicked(e);
    const options = await browser.runtime.sendMessage({type: `launchAuthorize`});
    this.oauthCallback(options);
  }

  oauthCallback(options) {
    if (options.error) {
      this.props.onTokenFailed(options.status, options.response);
    } else {
      this.props.onTokenSuccess(options.response);
    }
  }

  getButtonStyle() {
    let style = {};
    if (this.props.loading) {
      style.display = `none`;
    }
    return style;
  }

  render() {
    browser.runtime.sendMessage({type: `sendAppView`, view: `Login`});

    return (
      <ErrorBoundary>
        <div className='login-wrapper'>
          <Loading show={this.props.loading}/>
          <button style={this.getButtonStyle()} onClick={this.handleClick.bind(this)}
                  className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect'>
            {browser.i18n.getMessage(`login`)}
          </button>
        </div>
      </ErrorBoundary>
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