import PropTypes from 'prop-types';
import React from 'react';
import TmdbImage from '../tmdb/TmdbImage';
import TmdbImageContainer from '../tmdb/TmdbImageContainer';

class Watching extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    browser.runtime.sendMessage({type: `sendAppView`, view: `Watching ${this.props.item.title }`});

    return (
      <TmdbImageContainer>
        <TmdbImage className='mdl-card mdl-shadow--2dp watching-card-thumb' item={this.props.item}>
          <div className='mdl-card__title mdl-card--expand'/>
          <div className='mdl-card__actions'>
            <span className='watching-card-thumb__title'>{this.props.item.title}</span>
          </div>
        </TmdbImage>
      </TmdbImageContainer>
    );
  }
}

Watching.propTypes = {
  item: PropTypes.object
};

export default Watching;
