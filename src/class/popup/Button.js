import PropTypes from 'prop-types';
import React from 'react';
import ErrorBoundary from '../ErrorBoundary';

class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick() {
    browser.tabs.create({url: this.props.url, active: true});
  }

  render() {
    return (
      <ErrorBoundary>
        <button onClick={this.handleClick.bind(this)}
                className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect'>
          {this.props.text}
        </button>
      </ErrorBoundary>
    );
  }
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

export default Button;