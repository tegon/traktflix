import PropTypes from 'prop-types';
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }

  componentDidCatch(error, info) {
    console.log(error, info);
    this.setState({hasError: true});
  }

  render() {
    let content;
    if (this.state.hasError) {
      content = <h1>Something went wrong.</h1>;
    } else {
      content = this.props.children;
    }
    return content;
  }
}

ErrorBoundary.propTypes = {
children: PropTypes.node
};

export default ErrorBoundary;