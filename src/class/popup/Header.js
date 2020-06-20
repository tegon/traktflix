import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import ErrorBoundary from '../ErrorBoundary';
import Shared from '../Shared';

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
                {browser.i18n.getMessage(`about`)}
              </Link>
              <a
                className='mdl-navigation__link item-history'
                onClick={() => Shared.openTab(browser.runtime.getURL('html/options.html'))}>
                {browser.i18n.getMessage(`options`)}
              </a>
              <a
                className='mdl-navigation__link item-history'
                style={{display: display}}
                onClick={() => Shared.openTab(browser.runtime.getURL('html/history-sync.html'))}>
                {browser.i18n.getMessage(`history`)}
              </a>
              <a
                className='mdl-navigation__link item-history'
                style={{display: display}}
                onClick={this.props.logoutClicked}>
                {browser.i18n.getMessage(`logout`)}
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
