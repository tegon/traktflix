import React from 'react';

import ActivityListItem from './activity-list-item';

export default class ActivityList extends React.Component {
  render() {
    let {activities, imageHost, imageWidth} = this.props;
    let items = activities.map((activity, index) => {
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
