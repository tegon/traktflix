import React from 'react';
import PropTypes from 'prop-types';

class OptionsListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.option.value
    };
  }

  componentDidMount() {
    this.props.componentHandler.upgradeDom();
  }

  _onChange(event) {
    const value = event.target.checked;
    this.props.option.value = value;
    this.setState({value});
  }

  render() {
    const option = this.props.option;
    return(
      <li className='mdl-list__item mdl-list__item--three-line'>
        <span className='mdl-list__item-primary-content'>
          <span>{option.name}</span>
          <br/>
          <span className='mdl-list__item-text-body'>
            {option.description}
          </span>
        </span>
        <span className='mdl-list__item-secondary-action'>
          <label className='mdl-switch mdl-js-switch mdl-js-ripple-effect'>
            <input type='checkbox' className='mdl-switch__input activity-item-switch' checked={this.state.value} onChange={this._onChange.bind(this)} />
          </label>
        </span>
      </li>
    );
  }
}

OptionsListItem.propTypes = {
  option: PropTypes.object,
  componentHandler: PropTypes.object
};

export default OptionsListItem;
