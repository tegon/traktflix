import 'material-design-lite';
import PropTypes from 'prop-types';
import React from 'react';
import ActivityListItem from './ActivityListItem';

/* global componentHandler */

class ActivityList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {activities, imageHost, imageWidth, dateFormat} = this.props;
    const items = activities.map((activity, index) => {
      return (
        <ActivityListItem
          activity={activity}
          key={index}
          componentHandler={componentHandler}
          imageHost={imageHost}
          imageWidth={imageWidth}
          dateFormat={dateFormat}
        />
      );
    });

    return (
      <ul className='mdl-list'>
        {items}
      </ul>
    );
  }
}

ActivityList.propTypes = {
  activities: PropTypes.array,
  imageHost: PropTypes.string,
  imageWidth: PropTypes.object,
  dateFormat: PropTypes.string,
};

export default ActivityList;
