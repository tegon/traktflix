import React from 'react';
import ReactDOM from 'react-dom';
import Rollbar from '../../class/Rollbar';
import OptionsStore from '../../class/options/OptionsStore';
import ViewingOptionsApp from '../../class/options/ViewingOptionsApp';
import '../../assets/styles';

Rollbar.init();
OptionsStore.getValues().then(options => {
  ReactDOM.render(<ViewingOptionsApp options={options}/>, document.getElementById('viewing-options-app'));
});