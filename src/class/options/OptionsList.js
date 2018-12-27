import React from 'react';
import PropTypes from 'prop-types';
import OptionsListItem from './OptionsListItem';
import 'material-design-lite';

/* global componentHandler */

class OptionsList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {options} = this.props;
    const items = options.map((option, index) => {
      return (
        <OptionsListItem
          option={option}
          key={index}
          componentHandler={componentHandler}
        />
      );
    });

    return (
      <ul className='mdl-list'>
        {items}
      </ul>
    );
  }
}

OptionsList.propTypes = {
  options: PropTypes.array
};

export default OptionsList;
