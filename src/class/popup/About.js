import React from 'react';
import Button from './Button';
import Info from './Info';
import Messages from '../../modules/popup/messages';

const messages = Messages.aboutMessages;

export default class About extends React.Component {
  render() {
    return (
      <Info messages={messages}>
        <Button url={'https://github.com/gsrafael01/traktflix'} text={'Read more'}/>
      </Info>
    );
  }
}