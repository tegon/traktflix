import React from 'react';

import ActivityListItem from './activity-list-item';

export default class ActivityList extends React.Component {
  render() {
    let items = this.props.activities.map((activity, index) => {
      return(<ActivityListItem activity={activity} key={index} componentHandler={componentHandler} />);
    });

    return(
      <ul className='mdl-list'>
        {items}
      </ul>
    );
  }
}
