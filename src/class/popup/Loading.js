import React from 'react';
import PropTypes from 'prop-types';

class Loading extends React.Component {
  constructor(props) {
    super(props);
  }

  getSpinnerStyle() {
    if (this.props.show) {
      return { display: 'block' };
    } else {
      return { display: 'none' };
    }
  }

  render() {
    return(
      <div className='spinner-wrapper' style={this.getSpinnerStyle()}>
        <div className='mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active' />
      </div>
    )
  }
}

Loading.propTypes = {
  show: PropTypes.bool
};

export default Loading;