import Settings from '../../settings';
import React from 'react';
import PropTypes from 'prop-types';

class TmdbImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      imageUrl: `https://trakt.tv/assets/placeholders/thumb/poster-2d5709c1b640929ca1ab60137044b152.png`
    }
  }

  componentDidMount() {
    if (this.props.item && this.props.imageHost) {
      this.getItemFromTmdb();
    }
  }

  componentDidUpdate(prevProps) {
    let shouldUpdate = false;
    if (!prevProps.item && this.props.item) {
      shouldUpdate = true;
    } else if (prevProps.item && this.props.item) {
      if (prevProps.imageHost !== this.props.imageHost) {
        shouldUpdate = true;
      } else if (prevProps.item.ids.tmdb !== this.props.item.ids.tmdb) {
        shouldUpdate = true;
      } else if (prevProps.item.show && this.props.item.show && prevProps.item.show.ids.tmdb !== this.props.item.show.ids.tmdb) {
        shouldUpdate = true;
      }
    }
    if (shouldUpdate) {
      if (this.props.item.ids.tmdb !== null) {
        this.getItemFromTmdb();
      } else {
        console.log(`There is no tmdb.id for item.`, this.props.item);
      }
    }
  }

  getItemFromTmdb() {
    fetch(this.getApiUrl()).then(this.parseJsonResponse.bind(this)).then(this.onItemLoaded.bind(this));
  }

  getApiUrl() {
    const type = this.props.item.type === `show` ? `tv` : `movie`;
    let path = this.props.item.ids.tmdb;
    if (this.props.item.type === `show`) {
      path = `${this.props.item.show.ids.tmdb}/season/${this.props.item.season}/episode/${this.props.item.number}`;
    }
    return `https://api.themoviedb.org/3/${type}/${path}/images?api_key=${Settings.tmdbApiKey}`;
  }

  parseJsonResponse(response) {
    return response.json();
  }

  /**
   * @param response
   * @property {number} status_code
   * @property {string} image.file_path
   */
  onItemLoaded(response) {
    clearTimeout(this.requestTimeout);
    if (response.status_code && response.status_code === 25) {
      // we've reached the API limit
      this.onItemFailed();
    } else {
      const imageKey = this.props.item.type === `show` ? `stills` : `posters`;
      const image = response[imageKey][0];
      if (image) {
        this.setState({ imageUrl: `${this.props.imageHost}${this.props.imageWidth[this.props.item.type]}${image.file_path }`});
      }
    }
  }

  onItemFailed() {
    this.requestTimeout = setTimeout(this.getItemFromTmdb.bind(this), 10000);
  }

  thumbStyle() {
    return {
      backgroundImage: `url(${this.state.imageUrl})`,
      backgroundSize: `cover`
    };
  }

  render() {
    return(
      <div className={this.props.className} style={this.thumbStyle()}>
        {this.props.children}
      </div>
    );
  }
}

TmdbImage.propTypes = {
  children: PropTypes.object,
  className: PropTypes.string,
  imageHost: PropTypes.string,
  imageWidth: PropTypes.object,
  item: PropTypes.object
};

export default TmdbImage;