'use strict';

var React = require('react');

module.exports = React.createClass({
  render: function() {
    return(
      <header className="mdl-layout__header mdl-shadow--7dp">
        <div className="mdl-layout__header-row">
          <span className="mdl-layout-title">traktflix</span>
          <div className="mdl-layout-spacer"></div>
          <nav className="mdl-navigation">
            {
              this.props.items.map(function(item) {
                var className = 'mdl-navigation__link item-' + item.name;
                var display = item.show ? 'block' : 'none';
                return(
                  <a className={className} key={item.name} style={{ display: display }}
                    onClick={this.props.onItemClicked}>{item.name}</a>
                );
              }.bind(this))
            }
          </nav>
        </div>
      </header>
    );
  }
});