import PropTypes from 'prop-types';
import React from 'react';
import OptionsActionCreators from './OptionsActionCreators';

class OptionsListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.componentHandler.upgradeDom();
  }

  _onChange(event) {
    OptionsActionCreators.toggleOption(this.props.option, event.target.checked);
  }

  render() {
    const option = this.props.option;
    return (
      <li className='mdl-list__item mdl-list__item--three-line'>
        <span className='mdl-list__item-primary-content'>
          <span>{option.name}</span>
          <br/>
          <span className='mdl-list__item-text-body'>
            {option.description}
            {option.additionalElements}
          </span>
        </span>
        <span className='mdl-list__item-secondary-action'>
          <label className='mdl-switch mdl-js-switch mdl-js-ripple-effect'>
            <input type='checkbox' className='mdl-switch__input activity-item-switch' checked={option.add}
                   onChange={this._onChange.bind(this)}/>
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
