import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const display = this.props.logged ? `block` : `none`;

    return(
      <header className='mdl-layout__header mdl-shadow--7dp'>
        <div className='mdl-layout__header-row'>
          <span className='mdl-layout-title'>
            <Link to='/not-watching'>
                  traktflix
            </Link>
          </span>
          <div className='mdl-layout-spacer'/>
          <nav className='mdl-navigation'>
            <Link className='mdl-navigation__link item-about' to='/about'>
              About
            </Link>
            <a
              className='mdl-navigation__link item-history'
              target='noopener noreferrer _blank'
              href={chrome.extension.getURL('options.html')}>
              Options
            </a>
            <a
              className='mdl-navigation__link item-history'
              style={{display: display}}
              target='noopener noreferrer _blank'
              href={chrome.extension.getURL('history-sync.html')}>
              History
            </a>
            <a
              className='mdl-navigation__link item-history'
              style={{display: display}}
              onClick={this.props.logoutClicked}>
              Logout
            </a>
          </nav>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  logged: PropTypes.bool.isRequired,
  logoutClicked: PropTypes.func.isRequired
};

export default Header;
