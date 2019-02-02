const notWatchingMessages = [];
for (let i = 1; ; i += 1) {
  try {
    const message = browser.i18n.getMessage(`notWatchingMessage${i}`);
    if (message) {
      notWatchingMessages.push(message);
    } else {
      break;
    }
  } catch (error) {
    console.log(error);
    break;
  }
}
const aboutMessages = [];
for (let i = 1; ; i += 1) {
  try {
    const message = browser.i18n.getMessage(`aboutMessage${i}`);
    if (message) {
      aboutMessages.push(message);
    } else {
      break;
    }
  } catch (error) {
    console.log(error);
    break;
  }
}
const messages = {
  notWatchingMessages: notWatchingMessages,
  aboutMessages: aboutMessages
};

export default messages;