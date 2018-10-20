import React from 'react';
import PropTypes from 'prop-types';
import ActivityListItem from './ActivityListItem';
import 'material-design-lite';

/* global componentHandler */

class ActivityList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {activities, imageHost, imageWidth} = this.props;
    const items = activities.map((activity, index) => {
      return(
        <ActivityListItem
          activity={activity}
          key={index}
          componentHandler={componentHandler}
          imageHost={imageHost}
          imageWidth={imageWidth}
        />
      );
    });

    return(
      <ul className='mdl-list'>
        {items}
      </ul>
    );
  }
}

ActivityList.propTypes = {
  activities: PropTypes.array,
  imageHost: PropTypes.string,
  imageWidth: PropTypes.object
};

export default ActivityList;
