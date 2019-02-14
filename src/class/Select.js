import { select } from 'material-components-web';
import React from 'react';

/* global componentHandler */

export default class Select extends React.Component {
  constructor(props) {
    super(props);
    this.mdcSelectRoot = React.createRef();
  }

  componentDidMount() {
    this.mdcSelect = new select.MDCSelect(this.mdcSelectRoot.current);
    this.mdcSelect.listen(`MDCSelect:change`, () => this.props.onChange(this.mdcSelect.value));
  }

  componentWillUnmount() {
    this.mdcSelect.destroy();
  }

  componentDidUpdate() {
    componentHandler.upgradeDom();
  }

  render() {
    let options = [];
    for (const option of this.props.options) {
      options.push(
        <li className="mdc-list-item" data-value={option.value} key={option.value}>{option.label}</li>
      );
    }

    return (
      <div className="mdc-select mdc-select--outlined mdc-select--custom" ref={this.mdcSelectRoot}>
        <input type="hidden" name="enhanced-select" value={this.props.value}/>
        <i className="mdc-select__dropdown-icon"></i>
        <div className="mdc-select__selected-text"></div>
        <div className="mdc-select__menu mdc-menu mdc-menu-surface">
          <ul className="mdc-list">
            {options}
          </ul>
        </div>
        <div className="mdc-notched-outline">
          <div className="mdc-notched-outline__leading"></div>
          <div className="mdc-notched-outline__notch">
            <label className="mdc-floating-label">{this.props.label}</label>
          </div>
          <div className="mdc-notched-outline__trailing"></div>
        </div>
      </div>
    );
  }
}
