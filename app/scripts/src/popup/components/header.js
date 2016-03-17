'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var Handler = ReactRouter.Handler;
var Link = ReactRouter.Link;

module.exports = React.createClass({
  render: function() {
    var display = this.props.logged ? 'block' : 'none';

    return(
      <header className='mdl-layout__header mdl-shadow--7dp'>
        <div className='mdl-layout__header-row'>
          <span className='mdl-layout-title'>traktflix</span>
          <div className='mdl-layout-spacer'></div>
          <nav className='mdl-navigation'>
            <Link className='mdl-navigation__link item-about' to='/about'>
              About
            </Link>
            <a
              className='mdl-navigation__link item-history'
              style={{display: display}}
              target='_blank'
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
});
