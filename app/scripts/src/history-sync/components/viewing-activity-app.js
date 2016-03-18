import React from 'react';

import ActivityList from './activity-list';
import ActivityStore from '../stores/activity-store';
import TraktWebAPIUtils from '../utils/trakt-web-api-utils';
import NetflixWebAPIUtils from '../utils/netflix-web-api-utils';

export default class ViewingActivityApp extends React.Component {
  getStateFromStores() {
    return {
      activities: ActivityStore.getAll(),
      message: ActivityStore.getMessage(),
      page: ActivityStore.getPage()
    }
  }

  constructor() {
    super();
    let state = this.getStateFromStores();
    this.state = Object.assign(state, { loading: state.activities.length === 0 });
  }

  componentDidMount() {
    ActivityStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    ActivityStore.removeChangeListener(this._onChange.bind(this));
  }

  componentDidUpdate() {
    componentHandler.upgradeDom();

    if (this.state.message) {
      this.showSnackbar();
    }
  }

  _onChange() {
    let state = this.getStateFromStores();
    this.setState(Object.assign(state, { loading: false }));
  }

  _onSyncClick() {
    this.setState({ loading: true });
    TraktWebAPIUtils.addActivities(this.state.activities);
  }

  _onNextPageClick() {
    this.setState({ loading: true });
    NetflixWebAPIUtils.getActivities(this.state.page);
  }

  showSnackbar() {
    let snackbar = document.querySelector('.mdl-js-snackbar');
    snackbar.MaterialSnackbar.showSnackbar({ message: this.state.message });
  }

  render() {
    let content;

    if (this.state.loading) {
      content = (
        <div style={{textAlign: 'center', marginTop: 25}}>
          <div className='mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active' />
        </div>
      );
    } else if (this.state.activities.length) {
      content = (
        <div>
          <ActivityList activities={this.state.activities} />
          <div style={{textAlign: 'center'}}>
            <button onClick={this._onSyncClick.bind(this)} className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect'>
              Sync now
            </button>

            <button onClick={this._onNextPageClick.bind(this)} className='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect'>
              Next page
            </button>
          </div>
        </div>
      )
    } else {
      content = (<div><h4>There's no more items in your history. Refresh the page to go to the beginning.</h4></div>);
    }

    return(
      <div>
        {content}
        <div aria-live='assertive' aria-atomic='true' aria-relevant='text' className='mdl-snackbar mdl-js-snackbar'>
            <div className='mdl-snackbar__text'></div>
            <button type='button' className='mdl-snackbar__action'></button>
        </div>
      </div>
    );
  }
}
