import 'material-design-lite';
import React from 'react';
import BrowserStorage from '../BrowserStorage';
import NetflixApiUtils from '../NetflixApiUtils';
import Select from '../Select';
import TmdbImageContainer from '../tmdb/TmdbImageContainer';
import ActivityList from './ActivityList';
import ActivityStore from './ActivityStore';
import TraktWebAPIUtils from './TraktWebAPIUtils';

/* global componentHandler */

export default class ViewingActivityApp extends React.Component {
  getInitialState() {
    return Object.assign(this.getStateFromStores(), {
      addWithReleaseDate: this.props.addWithReleaseDate,
      pagesToLoad: this.props.pagesToLoad
    });
  }

  getStateFromStores() {
    return {
      activities: ActivityStore.getAll(),
      isLoadingTraktData: ActivityStore.isLoadingTraktData(),
      loading: ActivityStore.isLoading(),
      message: ActivityStore.getMessage(),
      page: ActivityStore.getPage()
    };
  }

  constructor(props) {
    super(props);
    this.state = this.getInitialState();
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
    this.setState(this.getStateFromStores());
  }

  _onSyncClick() {
    const confirmationMessage = browser.i18n.getMessage(`confirmSync`);
    if (confirm(confirmationMessage)) {
      this.setState({loading: true});
      TraktWebAPIUtils.addActivities(this.state.activities, this.state.addWithReleaseDate);
    }
  }

  _onPagesToLoadChange(pagesToLoad) {
    BrowserStorage.get(`prefs`).then(storage => {
      if (!storage.prefs) {
        storage.prefs = {};
      }
      storage.prefs.pagesToLoad = pagesToLoad;
      BrowserStorage.set({prefs: storage.prefs}, true);
    });
    this.setState({pagesToLoad});
  }

  _onNextPageClick() {
    this.setState({loading: true});
    if (this.state.pagesToLoad === `All`) {
      NetflixApiUtils.getActivities(this.state.page, -1);
    } else {
      NetflixApiUtils.getActivities(this.state.page, this.state.page + parseInt(this.state.pagesToLoad));
    }
  }

  _onToggleAll(event) {
    const inputs = Array.from(document.querySelectorAll('.mdl-list__item-secondary-action:not([style="display: none;"]) .activity-item-switch'));
    inputs.map(input => input.checked === event.target.checked ? null : input.click());
  }

  __onToggleReleaseDate(event) {
    const addWithReleaseDate = event.target.checked;
    BrowserStorage.get(`prefs`).then(storage => {
      if (!storage.prefs) {
        storage.prefs = {};
      }
      storage.prefs.addWithReleaseDate = addWithReleaseDate;
      BrowserStorage.set({prefs: storage.prefs}, true);
    });
    this.setState({addWithReleaseDate});
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
          <div className='mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active is-upgraded'/>
          <h4>{browser.i18n.getMessage(`loadingPage`)} {this.state.page + 1}...</h4>
        </div>
      );
    } else if (this.state.activities.length) {
      content = (
        <div>
          <div className={'loading-trakt'} style={{display: this.state.isLoadingTraktData ? 'block' : 'none'}}>
            {browser.i18n.getMessage(`loadingTraktData`)} <div className='mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active'/>
          </div>
          <span className='mdl-list__item-secondary-action'>
            <label className='mdl-switch mdl-js-switch mdl-js-ripple-effect' htmlFor='toggle-all'>
              <input type='checkbox' id='toggle-all' className='mdl-switch__input'
                     onChange={this._onToggleAll.bind(this)}/>
              <span className='mdl-switch__label'>{browser.i18n.getMessage(`selectAll`)}</span>
            </label>
            <label className='mdl-switch mdl-js-switch mdl-js-ripple-effect' htmlFor='add-with-release-date'>
              <input type='checkbox' id='add-with-release-date' className='mdl-switch__input'
                     onChange={this.__onToggleReleaseDate.bind(this)} checked={this.state.addWithReleaseDate}/>
              <span className='mdl-switch__label'>{browser.i18n.getMessage(`addWithReleaseDate`)}</span>
            </label>
          </span>
          <TmdbImageContainer>
            <ActivityList activities={this.state.activities}/>
          </TmdbImageContainer>
          <div className='mdl-actions-wrapper'>
            <button onClick={this._onSyncClick.bind(this)} disabled={this.state.isLoadingTraktData}
                    className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect'
                    title={this.state.isLoadingTraktData ? 'Cannot sync while loading Trakt data' : ''}>
              {browser.i18n.getMessage(`syncNow`)}
            </button>

            <button onClick={this._onNextPageClick.bind(this)}
                    className='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect'>
              {browser.i18n.getMessage(`nextPage`)}
            </button>

            <Select
              label={browser.i18n.getMessage(`pagesToLoad`)}
              value={this.state.pagesToLoad}
              options={[
                { value: `0`, label: `1` },
                { value: `4`, label: `5` },
                { value: `9`, label: `10` },
                { value: `49`, label: `50` },
                { value: `99`, label: `100` },
                { value: `All`, label: browser.i18n.getMessage(`allPages`) }
              ]}
              onChange={this._onPagesToLoadChange.bind(this)}
            />
          </div>
        </div>
      );
    } else {
      content = (<div><h4>{browser.i18n.getMessage(`noMoreHistory`)}</h4></div>);
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
