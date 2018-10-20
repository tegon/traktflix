import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick() {
    chrome.tabs.create({url: this.props.url, active: true});
  }

  render() {
    return (
      <button onClick={this.handleClick.bind(this)} className='mdl-button mdl-js-button mdl-button--primary'>
        {this.props.text}
      </button>
    );
  }
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

export default Button;