import PropTypes from 'prop-types';
import React from 'react';
import ErrorBoundary from '../ErrorBoundary';

class Info extends React.Component {
  constructor(props) {
    super(props);
  }

  getRandomMessage() {
    return this.props.messages[Math.floor(Math.random() * this.props.messages.length)];
  }

  render() {
    const message = this.getRandomMessage();
    browser.runtime.sendMessage({type: `sendAppView`, view: `Info`});

    return (
      <ErrorBoundary>
        <div className='mdl-card mdl-shadow--2dp info-card'>
          <div className='mdl-card__title mdl-card--expand'>
            <h4>{message}</h4>
          </div>
          {this.props.children}
        </div>
      </ErrorBoundary>
    );
  }
}

Info.propTypes = {
  children: PropTypes.node,
  messages: PropTypes.array.isRequired
};

export default Info;