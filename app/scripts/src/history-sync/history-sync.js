import React from 'react';

import ViewingActivityApp from './components/viewing-activity-app';
import NetflixWebAPIUtils from './utils/netflix-web-api-utils';

NetflixWebAPIUtils.getActivities();

React.render(<ViewingActivityApp />, document.getElementById('viewing-activity-app'));
