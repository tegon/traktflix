import React from 'react';

import ActivityActionCreators from '../actions/activity-action-creators';

export default class ActivityListItem extends React.Component {
  componentDidMount() {
    this.props.componentHandler.upgradeDom();
  }

  _onChange(event) {
    ActivityActionCreators.toggleActivity(this.props.activity, event.target.checked);
  }

  render() {
    let activity = this.props.activity;
    let trakt = activity.trakt;
    let netflix = activity.netflix;
    let traktDate = trakt.date ? trakt.date.format('MMMM Do YYYY, h:mm:ss a') : '-';
    let traktImage = trakt.images.poster ? trakt.images.poster : trakt.images.screenshot;
    let thumb = traktImage.thumb ? traktImage.thumb : 'https://trakt.tv/assets/placeholders/thumb/poster-2d5709c1b640929ca1ab60137044b152.png';
    let netflixTitle = netflix.epTitle ? `${netflix.title}: ${netflix.epTitle}` : netflix.title;

    return(
      <li className='mdl-list__item mdl-list__item--three-line'>
        <span className='mdl-list__item-primary-content'>
          <div style={{backgroundImage: `url(${thumb})`, backgroundSize: 'cover'}} className='mdl-list__item-avatar'></div>
          <span>Netflix title: {netflixTitle}</span>
          <span> / </span>
          <span>Trakt.tv title: {trakt.title}</span>
          <span className='mdl-list__item-text-body'>
            Netflix date: {netflix.date.format('MMMM Do YYYY, h:mm:ss a')} / Trakt.tv date: {traktDate}
            <br />
            Is this wrong?<a> Report</a>
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
