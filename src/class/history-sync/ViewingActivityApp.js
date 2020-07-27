import 'material-design-lite';
import React from 'react';
import BrowserStorage from '../BrowserStorage';
import NetflixApiUtils from '../NetflixApiUtils';
import Select from '../Select';
import TmdbImageContainer from '../tmdb/TmdbImageContainer';
import ActivityList from './ActivityList';
import ActivityStore from './ActivityStore';
import TraktWebAPIUtils from './TraktWebAPIUtils';
import ActivityActionCreators from './ActivityActionCreators';

/* global componentHandler */

export default class ViewingActivityApp extends React.Component {
  getInitialState() {
    return Object.assign(this.getStateFromStores(), {
      hideSynced: this.props.hideSynced,
      use24Clock: this.props.use24Clock,
      pagesToLoad: this.props.pagesToLoad,
      loadedPages: this.props.loadedPages
    });
  }

  getStateFromStores() {
    return {
      activities: ActivityStore.getAll(),
      isLoadingTraktData: ActivityStore.isLoadingTraktData(),
      loading: ActivityStore.isLoading(),
      message: ActivityStore.getMessage(),
      page: ActivityStore.getPage(),
      addWithReleaseDate: ActivityStore.addWithReleaseDate(),
    };
  }

  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  componentDidMount() {
    ActivityActionCreators.addWithReleaseDate(this.props.addWithReleaseDate);
    ActivityStore.addChangeListener(this._onChange.bind(this));
    NetflixApiUtils.getActivities();
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
      TraktWebAPIUtils.addActivities(this.state.activities);
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

  _loadedPagesChange(loadedPages){
    this.setState({loadedPages});
  }

  async _onNextPageClick() {
    this.setState({loading: true});
    if (this.state.pagesToLoad === `All`) {
      await NetflixApiUtils.getActivities(this.state.page, Number.MAX_VALUE);
    } else {
      await NetflixApiUtils.getActivities(this.state.page, this.state.page + parseInt(this.state.pagesToLoad));
    }
    this._loadedPagesChange(this.state.pagesToLoad);
  }

  async _onPreviousPageClick(){
    this.setState({loading: true});

    const currentPage = this.state.page - this.state.loadedPages - parseInt(this.state.pagesToLoad)
    const desiredPage = this.state.page - this.state.loadedPages;
    
    await NetflixApiUtils.getActivities(currentPage, desiredPage);
    this._loadedPagesChange(this.state.pagesToLoad);
  }

  _onToggleAll(event) {
    const inputs = Array.from(document.querySelectorAll('.mdl-list__item-secondary-action:not([style="display: none;"]) .activity-item-switch'));
    inputs.map(input => input.checked === event.target.checked ? null : input.click());
  }

  _onToggleReleaseDate(event) {
    const addWithReleaseDate = event.target.checked;
    BrowserStorage.get(`prefs`).then(storage => {
      if (!storage.prefs) {
        storage.prefs = {};
      }
      storage.prefs.addWithReleaseDate = addWithReleaseDate;
      BrowserStorage.set({prefs: storage.prefs}, true);
    });
    ActivityActionCreators.addWithReleaseDate(addWithReleaseDate);
  }

  _onToggleSynced(event) {
    const hideSynced = event.target.checked;
    BrowserStorage.get(`prefs`).then(storage => {
      if (!storage.prefs) {
        storage.prefs = {};
      }
      storage.prefs.hideSynced = hideSynced;
      BrowserStorage.set({prefs: storage.prefs}, true);
    });
    this.setState({hideSynced});
  }

  _onToggleClock(event) {
    const use24Clock = event.target.checked;
    BrowserStorage.get(`prefs`).then(storage => {
      if (!storage.prefs) {
        storage.prefs = {};
      }
      storage.prefs.use24Clock = use24Clock;
      BrowserStorage.set({prefs: storage.prefs}, true);
    });
    this.setState({use24Clock});
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
      const activities = this.state.hideSynced ? this.state.activities.filter(activity => !activity.alreadyOnTrakt) : this.state.activities;

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
                     onChange={this._onToggleReleaseDate.bind(this)} checked={this.state.addWithReleaseDate}/>
              <span className='mdl-switch__label'>{browser.i18n.getMessage(`addWithReleaseDate`)}</span>
            </label>
            <label className='mdl-switch mdl-js-switch mdl-js-ripple-effect' htmlFor='hide-synced'>
              <input type='checkbox' id='hide-synced' className='mdl-switch__input'
                     onChange={this._onToggleSynced.bind(this)} checked={this.state.hideSynced}/>
              <span className='mdl-switch__label'>{browser.i18n.getMessage(`hideSynced`)}</span>
            </label>
            <label className='mdl-switch mdl-js-switch mdl-js-ripple-effect' htmlFor='use-24-clock'>
              <input type='checkbox' id='use-24-clock' className='mdl-switch__input'
                     onChange={this._onToggleClock.bind(this)} checked={this.state.use24Clock}/>
              <span className='mdl-switch__label'>{browser.i18n.getMessage(`use24Clock`)}</span>
            </label>
          </span>
          {
            activities.length ? (
              <TmdbImageContainer>
                <ActivityList activities={activities} dateFormat={this.state.use24Clock ? 'MMMM Do YYYY, H:mm:ss' : 'MMMM Do YYYY, h:mm:ss a'} />
              </TmdbImageContainer>
            ) : (
              <div>
                <h4>{browser.i18n.getMessage(`noItemsToShow`)}</h4>
              </div>
            )
          }
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

            <button onClick={this._onPreviousPageClick.bind(this)}
                    className='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect'>
              {browser.i18n.getMessage(`previousPage`)}
            </button>

            <Select
              label={browser.i18n.getMessage(`pagesToLoad`)}
              value={this.state.pagesToLoad}
              options={[
                { value: `1`, label: `1` },
                { value: `5`, label: `5` },
                { value: `10`, label: `10` },
                { value: `50`, label: `50` },
                { value: `100`, label: `100` },
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
