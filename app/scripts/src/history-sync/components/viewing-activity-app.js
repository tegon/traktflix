import React from 'react';

import ActivityList from './activity-list';
import ActivityStore from '../stores/activity-store';
import TraktWebAPIUtils from '../utils/trakt-web-api-utils';

export default class ViewingActivityApp extends React.Component {
  getStateFromStores() {
    return {
      activities: ActivityStore.getAll(),
      message: ActivityStore.getMessage()
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
    if (this.state.message) {
      this.showSnackbar();
    }
  }

  _onChange() {
    let state = this.getStateFromStores();
    this.setState(Object.assign(state, { loading: false }));
  }

  _onClick() {
    this.setState({ loading: true });
    TraktWebAPIUtils.addActivities(this.state.activities);
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
    } else {
      content = (
        <div>
          <ActivityList activities={this.state.activities} />
          <div style={{textAlign: 'center'}}>
            <button onClick={this._onClick.bind(this)} className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect'>
              Sync now
            </button>
          </div>
        </div>
      )
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
