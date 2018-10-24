import React from 'react';
import PropTypes from 'prop-types';

class TraktURLForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {traktURL: undefined};
  }

  _onSubmit() {
    this.props.onSubmit(this.props.activity, this.state.traktURL);
  }

  _onChange(event) {
    this.setState({traktURL: event.target.value});
  }

  render() {
    const display = this.props.show ? `block` : `none`;
    const formId = `${this.props.activity.netflix.id}--url`;
    const content = (
      <div style={{display: display}}>
        <div className='mdl-textfield mdl-js-textfield mdl-textfield--floating-label'>
          <label className='mdl-textfield__label' htmlFor={formId}>{chrome.i18n.getMessage(this.props.error ? `pasteTraktUrlError` : `pasteTraktUrl2`)}</label>
          <input className='mdl-textfield__input' type='text' id={formId} onChange={this._onChange.bind(this)} disabled={this.props.click}/>
        </div>
        <button className='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect' disabled={this.props.click}
                onClick={this._onSubmit.bind(this)}>
          {chrome.i18n.getMessage(this.props.isUpdating || this.props.click ? `updatingItem` : `updateItem`)}
        </button>
      </div>
    );
    return (<div>{content}</div>);
  }
}

TraktURLForm.propTypes = {
  activity: PropTypes.object,
  click: PropTypes.bool,
  error: PropTypes.bool,
  isUpdating: PropTypes.bool,
  onSubmit: PropTypes.func,
  show: PropTypes.bool
};

export default TraktURLForm;
