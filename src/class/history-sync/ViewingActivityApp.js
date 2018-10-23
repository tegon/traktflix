import React from 'react';
import ActivityList from './ActivityList';
import ActivityStore from './ActivityStore';
import TraktWebAPIUtils from './TraktWebAPIUtils';
import NetflixApiUtils from '../NetflixApiUtils';
import TmdbImageContainer from '../tmdb/TmdbImageContainer';
import 'material-design-lite';

/* global componentHandler */

export default class ViewingActivityApp extends React.Component {
  getStateFromStores() {
    return {
      activities: ActivityStore.getAll(),
      message: ActivityStore.getMessage(),
      page: ActivityStore.getPage()
    };
  }

  constructor(props) {
    super(props);
    const state = this.getStateFromStores();
    this.state = Object.assign(state, {loading: state.activities.length === 0});
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
    const state = this.getStateFromStores();
    this.setState(Object.assign(state, {loading: false}));
  }

  _onSyncClick() {
    const confirmationMessage = chrome.i18n.getMessage(`confirmSync`);
    if (confirm(confirmationMessage)) {
      this.setState({loading: true});
      TraktWebAPIUtils.addActivities(this.state.activities);
    }
  }

  _onNextPageClick() {
    this.setState({loading: true});
    NetflixApiUtils.getActivities(this.state.page);
  }

  _onToggleAll(event) {
    const inputs = Array.from(document.querySelectorAll('.activity-item-switch'));
    inputs.map(input => input.checked === event.target.checked ? null : input.click());
  }

  showSnackbar() {
    const snackbar = document.querySelector('.mdl-js-snackbar');
    snackbar.MaterialSnackbar.showSnackbar({message: this.state.message});
  }

  render() {
    let content;

    if (this.state.loading) {
      content = (
        <div style={{textAlign: 'center', marginTop: 25}}>
          <div className='mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active'/>
        </div>
      );
    } else if (this.state.activities.length) {
      content = (
        <div>
          <span className='mdl-list__item-secondary-action'>
            <label className='mdl-switch mdl-js-switch mdl-js-ripple-effect' htmlFor='toggle-all'>
              <input type='checkbox' id='toggle-all' className='mdl-switch__input'
                     onChange={this._onToggleAll.bind(this)}/>
              <span className='mdl-switch__label'>{chrome.i18n.getMessage(`selectAll`)}</span>
            </label>
          </span>
          <TmdbImageContainer>
            <ActivityList activities={this.state.activities}/>
          </TmdbImageContainer>
          <div className='mdl-actions-wrapper'>
            <button onClick={this._onSyncClick.bind(this)}
                    className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect'>
              {chrome.i18n.getMessage(`syncNow`)}
            </button>

            <button onClick={this._onNextPageClick.bind(this)}
                    className='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect'>
              {chrome.i18n.getMessage(`nextPage`)}
            </button>
          </div>
        </div>
      );
    } else {
      content = (<div><h4>{chrome.i18n.getMessage(`noMoreHistory`)}</h4></div>);
    }

    return (
      <div>
        {content}
        <div aria-live='assertive' aria-atomic='true' aria-relevant='text' className='mdl-snackbar mdl-js-snackbar'>
          <div className='mdl-snackbar__text'/>
          <button type='button' className='mdl-snackbar__action'/>
        </div>
      </div>
    );
  }
}
