import React from 'react';
import Messages from '../../modules/popup/messages';
import Button from './Button';
import Info from './Info';

const messages = Messages.aboutMessages;

export default class About extends React.Component {
  render() {
    return (
      <Info messages={messages}>
        <Button url={'https://github.com/tegon/traktflix'} text={browser.i18n.getMessage(`readMore`)}/>
      </Info>
    );
  }
}