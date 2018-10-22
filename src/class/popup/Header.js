import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import ErrorBoundary from '../ErrorBoundary';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const display = this.props.logged ? `block` : `none`;

    return (
      <ErrorBoundary>
        <header className='mdl-layout__header mdl-shadow--7dp'>
          <div className='mdl-layout__header-row'>
            <span className='mdl-layout-title'>
              <Link to='/not-watching'>
                    traktflix
              </Link>
            </span>
            <nav className='mdl-navigation'>
              <Link className='mdl-navigation__link item-about' to='/about'>
                {chrome.i18n.getMessage(`about`)}
              </Link>
              <a
                className='mdl-navigation__link item-history'
                target='noopener noreferrer _blank'
                href={chrome.extension.getURL('options.html')}>
                {chrome.i18n.getMessage(`options`)}
              </a>
              <a
                className='mdl-navigation__link item-history'
                style={{display: display}}
                target='noopener noreferrer _blank'
                href={chrome.extension.getURL('history-sync.html')}>
                {chrome.i18n.getMessage(`history`)}
              </a>
              <a
                className='mdl-navigation__link item-history'
                style={{display: display}}
                onClick={this.props.logoutClicked}>
                {chrome.i18n.getMessage(`logout`)}
              </a>
            </nav>
          </div>
        </header>
      </ErrorBoundary>
    );
  }
}

Header.propTypes = {
  logged: PropTypes.bool.isRequired,
  logoutClicked: PropTypes.func.isRequired
};

export default Header;
