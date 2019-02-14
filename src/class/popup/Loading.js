import PropTypes from 'prop-types';
import React from 'react';
import ErrorBoundary from '../ErrorBoundary';

class Loading extends React.Component {
  constructor(props) {
    super(props);
  }

  getSpinnerStyle() {
    let style = {};
    if (!this.props.show) {
      style.display = `none`;
    }
    return style;
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