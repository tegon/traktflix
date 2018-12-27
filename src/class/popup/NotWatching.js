import React from 'react';
import Messages from '../../modules/popup/messages';
import Info from './Info';

const messages = Messages.notWatchingMessages;

export default class NotWatching extends React.Component {
  render() {
    return (<Info messages={messages}/>);
  }
}
