import React from 'react';

import ActivityActionCreators from '../actions/activity-action-creators';
import ReportActivity from './report-activity';

export default class ActivityListItem extends React.Component {
  constructor() {
    super();
    this.state = { showReport: false };
  }

  componentDidMount() {
    this.props.componentHandler.upgradeDom();
  }

  _onChange(event) {
    ActivityActionCreators.toggleActivity(this.props.activity, event.target.checked);
  }

  _onShowReport(event) {
    this.setState({ showReport: true });
  }

  render() {
    let activity = this.props.activity;
    let trakt = activity.trakt;
    let netflix = activity.netflix;
    let traktDate = trakt.date ? trakt.date.format('MMMM Do YYYY, h:mm:ss a') : '-';
    let traktImage = trakt.images.poster ? trakt.images.poster : trakt.images.screenshot;
    let thumb = traktImage.thumb ? traktImage.thumb : 'https://trakt.tv/assets/placeholders/thumb/poster-2d5709c1b640929ca1ab60137044b152.png';
    let netflixTitle = netflix.epTitle ? `${netflix.title}: ${netflix.epTitle}` : netflix.title;
    let netflixUrl = `https://www.netflix.com/watch/${netflix.id}`;
    let traktUrl = trakt.season ? `https://trakt.tv/shows/${trakt.show.ids.slug}/seasons/${trakt.season}/episodes/${trakt.number}` : `https://trakt.tv/movies/${trakt.ids.slug}`;
    let traktTitle = trakt.show ? `${trakt.show.title}: ${trakt.title}` : trakt.title;

    return(
      <li className='mdl-list__item mdl-list__item--three-line'>
        <span className='mdl-list__item-primary-content'>
          <div style={{backgroundImage: `url(${thumb})`, backgroundSize: 'cover'}} className='mdl-list__item-avatar'></div>
          <span><a href={netflixUrl} target='_blank'>Netflix title: {netflixTitle}</a></span>
          <span> / </span>
          <span><a href={traktUrl} target='_blank'>Trakt.tv title: {traktTitle}</a></span>
          <span className='mdl-list__item-text-body'>
            Netflix date: {netflix.date.format('MMMM Do YYYY, h:mm:ss a')} / Trakt.tv date: {traktDate}
            <br />
            Is this wrong? <a className='report' onClick={this._onShowReport.bind(this)}>Report</a>
            <ReportActivity activity={activity} show={this.state.showReport} />
          </span>
        </span>
        <span className='mdl-list__item-secondary-action'>
          <label className='mdl-switch mdl-js-switch mdl-js-ripple-effect' htmlFor={netflix.id}>
            <input type='checkbox' id={netflix.id} className='mdl-switch__input' checked={activity.add} onChange={this._onChange.bind(this)} />
          </label>
        </span>
      </li>
    );
  }
}
