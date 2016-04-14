import React from 'react';
import Rollbar from '../../rollbar';

export default class ReportActivity extends React.Component {
  constructor() {
    super();
    this.state = { correctItemUrl: undefined, reported: false };
  }

  _sendReport(event) {
    Rollbar.warning('Wrong item on sync history', {
      traktId: this.props.activity.trakt.ids.trakt,
      netflixId: this.props.activity.netflix.id,
      correctItemUrl: this.state.correctItemUrl
    });
    this.setState({ reported: true });
  }

  _onChange(event) {
    this.setState({ correctItemUrl: event.target.value });
  }

  render() {
    let content;

    if (this.state.reported) {
      content = (<span>Thanks for the report. We will check this soon</span>);
    } else {
      let display =  this.props.show ? 'block' : 'none';
      content = (
        <div style={{display: display}}>
          <div className='mdl-textfield mdl-js-textfield mdl-textfield--floating-label'>
            <input className='mdl-textfield__input' type='text' id={this.props.activity.trakt.ids.trakt} onChange={this._onChange.bind(this)} />
            <label className='mdl-textfield__label' htmlFor={this.props.activity.trakt.ids.trakt}>Paste the Trakt.tv link to the correct item</label>
          </div>
          <button className='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect' onClick={this._sendReport.bind(this)}>
            Send report
          </button>
        </div>
      );
    }

    return(<div>{content}</div>);
  }
}
