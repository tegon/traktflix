import React from 'react';
import Rollbar from '../../rollbar';

export default class TraktURLForm extends React.Component {
  constructor() {
    super();
    this.state = { traktURL: undefined };
  }

  _onSubmit(event) {
    this.props.onSubmit(this.props.activity, this.state.traktURL);
  }

  _onChange(event) {
    this.setState({ traktURL: event.target.value });
  }

  render() {
    let display =  this.props.show ? 'block' : 'none';
    let content = (
      <div style={{display: display}}>
        <div className='mdl-textfield mdl-js-textfield mdl-textfield--floating-label'>
          <input className='mdl-textfield__input' type='text' id={this.props.activity.netflix.title} onChange={this._onChange.bind(this)} />
          <label className='mdl-textfield__label' htmlFor={this.props.activity.netflix.title}>Paste the Trakt.tv link to the correct item</label>
        </div>
        <button className='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect' onClick={this._onSubmit.bind(this)}>
          Update item
        </button>
      </div>
    );

    return(<div>{content}</div>);
  }
}
