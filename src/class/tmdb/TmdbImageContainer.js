import Settings from '../../settings';
import React from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from '../ErrorBoundary';

class TmdbImageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      imageHost: null,
      imageWidth: {
        show: null,
        movie: null
      }
    };
  }

  componentDidMount() {
    fetch(`https://api.themoviedb.org/3/configuration?api_key=${Settings.tmdbApiKey}`)
      .then(this.parseJsonResponse.bind(this))
      .then(this.onConfigLoaded.bind(this));
  }

  parseJsonResponse(response) {
    return response.json();
  }

  /**
   * @param response
   * @property {string} response.secure_base_url
   * @property {string[]} response.still_sizes
   * @property {string[]} response.poster_sizes
   */
  onConfigLoaded(response) {
    this.setState({
      imageHost: response.images.secure_base_url,
      imageWidth: {show: response.images.still_sizes[2], movie: response.images.poster_sizes[2]}
    });
  }

  render() {
    return (
      <ErrorBoundary>
        <div>
          {this.props.children && React.cloneElement(this.props.children, {
            imageHost: this.state.imageHost,
            imageWidth: this.state.imageWidth
          })}
        </div>
      </ErrorBoundary>
    );
  }
}

TmdbImageContainer.propTypes = {
  children: PropTypes.node
};

export default TmdbImageContainer;