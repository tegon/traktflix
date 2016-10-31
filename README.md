![traktflix](traktflix.png)
#Trakt.tv and Netflix integration

[![Join the chat at https://gitter.im/tegon/traktflix](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/tegon/traktflix?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![Build Status](https://travis-ci.org/tegon/traktflix.svg?branch=master)](https://travis-ci.org/tegon/traktflix)
[![Coverage Status](https://coveralls.io/repos/tegon/traktflix/badge.svg?branch=master&service=github)](https://coveralls.io/github/tegon/traktflix?branch=master)

[![download](ChromeWebStore_BadgeWBorder_v2_206x58.png)](https://chrome.google.com/webstore/detail/bmoemkaigjgcgjjnpmdgkifndiidkeji?utm_source=github&utm_medium=readme& utm_campaign=repo)

###Table of Contents
* [What is Trakt?](#what-is-trakt)
* [Why do I need this extension?](#why-do-i-need-this-extension)
* [How this works?](#how-this-works)
* [Limitations](#limitations)
* [Problems](#problems)
* [Development](#development)

###What is Trakt?
Automatically scrobble TV show episodes and movies you are watching to Trakt.tv! Keep a history of everything you've watched! Sign up for a free account at [Trakt.tv](http://trakt.tv) and get a ton of features.

###Why do I need this extension?
Trakt.tv has a [lot of plugins](http://trakt.tv/downloads) to automatically scrobble the movies and episodes you watch from your media center.
But i found nothing to integrate with Netflix, so i created this extension.
Every time you click to play something on Netflix, it will send the scrobble to Trakt.tv. Cool, isn't it?

###How this works?
Unfortunately Netflix doesn't provide a public API, so the movie or espisode info is extracted from the HTML of the player.

###Limitations
This extension you only work with Netflix HTML player and new layout. If you are in the [old layout](http://www.netflix.com/WiHome), please open the [new one](http://www.netflix.com/browse).
See this link for more info: https://help.netflix.com/en/node/23742

###Problems
If you find any problems or have suggestions or questions, feel free to [open an issue](https://github.com/tegon/traktflix/issues/new)

###Development
Create an application in [Trakt API](http://trakt.tv/oauth/applications/new).

Don't forget to check `/scrobble` permission.

In `Redirect uri:` put `https://{extensionId}.chromiumapp.org`

In `Javascript (cors) origins:` put `https://{extensionId}.chromiumapp.org` and `chrome-extension://{extensionId}`

Copy the `config.json` example file and change Trakt.tv credentials:
```bash
cp config.json.dev config.json
```

Use [nvm](https://github.com/creationix/nvm) to run in the correct version of node

```bash
nvm use
```

Install the dependencies
```bash
npm install
```

To run in development mode
```bash
npm start
```

To get build version (generates app.zip, ready for chrome store)
```bash
npm run build
npm run zip
```

To run tests
```bash
npm test
```

###Credits
![TMDB API](tmdb-api-logo.png)

This product uses the TMDb API but is not endorsed or certified by TMDb.

![Trakt.tv API](trakt-api-logo.png)

This product uses the Trakt.tv API.

[LICENSE](LICENSE)
