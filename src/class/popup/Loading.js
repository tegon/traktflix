import React from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from '../ErrorBoundary';

class Loading extends React.Component {
  constructor(props) {
    super(props);
  }

  getSpinnerStyle() {
    if (this.props.show) {
      return {};
    } else {
      return {display: 'none'};
    }
  }

  render() {
    return (
      <ErrorBoundary>
        <div className='spinner-wrapper' style={this.getSpinnerStyle()}>
          <div className='mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active'/>
        </div>
      </ErrorBoundary>
    );
  }
}

Loading.propTypes = {
  show: PropTypes.bool
};

export default Loading;