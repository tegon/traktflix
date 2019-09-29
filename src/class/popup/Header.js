import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import ErrorBoundary from '../ErrorBoundary';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  async onHistoryClicked() {
    const tabs = await browser.tabs.query({url: `*://*.netflix.com/*`, active: true});

    if (tabs.length > 0) {
      if (browser.cookies) {
        browser.tabs.create({
          cookieStoreId: tabs[0].cookieStoreId,
          index: tabs[0].index + 1,
          url: browser.runtime.getURL('html/history-sync.html'),
        });
      } else {
        browser.tabs.create({
          index: tabs[0].index + 1,
          url: browser.runtime.getURL('html/history-sync.html'),
        });
      }
    }
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
                target='noopener noreferrer _blank'
                href={browser.runtime.getURL('html/options.html')}>
                {browser.i18n.getMessage(`options`)}
              </a>
              <a
                className='mdl-navigation__link item-history'
                style={{display: display}}
                onClick={this.onHistoryClicked.bind(this)}>
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
