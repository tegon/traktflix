<h1 align="center">
  <br>
  <a href="https://tegon.github.io/traktflix/">
    <img src="https://raw.githubusercontent.com/tegon/traktflix/master/app/images/traktflix-icon-128.png" alt="Traktflix" width="150">
  </a>
  <br>
  traktflix
  <br>
  <br>
</h1>


<h4 align="center">Netflix and trakt.tv integration.</h4>

<p align="center">
  <a href="https://github.com/tegon/traktflix/releases"><img src="https://img.shields.io/github/release/tegon/traktflix.svg" alt="github release"></a>
  <a href="https://travis-ci.org/tegon/traktflix"><img src="https://img.shields.io/travis/feross/webtorrent/master.svg" alt="travis"></a>
  <a href="https://coveralls.io/github/tegon/traktflix?branch=master"><img src="https://coveralls.io/repos/tegon/traktflix/badge.svg?branch=master&service=github" alt="coveralls"></a>
  <a href="https://chrome.google.com/webstore/detail/traktflix-netflix-and-tra/bmoemkaigjgcgjjnpmdgkifndiidkeji"><img src="https://img.shields.io/chrome-web-store/d/bmoemkaigjgcgjjnpmdgkifndiidkeji.svg" alt="downloads"></a>
</p>

### Table of Contents
* [What is Trakt?](#what-is-trakt)
* [Why do I need this extension?](#why-do-i-need-this-extension)
* [How does traktflix work?](#how-does-traktflix-work)
* [Limitations](#limitations)
* [Problems](#problems)
* [Development](#development)

### What is Trakt?
Automatically scrobble TV show episodes and movies you are watching to Trakt.tv! Keep a history of everything you've watched! Sign up for a free account at [Trakt.tv](http://trakt.tv) and get a ton of features.

### Why do I need this extension?
Trakt.tv has a [lot of plugins](http://trakt.tv/downloads) to automatically scrobble the movies and episodes you watch from your media center.
But i found nothing to integrate with Netflix, so i created this extension.
Every time you click to play something on Netflix, it will send the scrobble to Trakt.tv. Cool, isn't it?

### How does traktflix work?
Unfortunately Netflix doesn't provide a public API, so the movie or espisode info is extracted from the HTML of the player.

### Limitations
This extension you only work with Netflix HTML player and new layout. If you are in the [old layout](http://www.netflix.com/WiHome), please open the [new one](http://www.netflix.com/browse).
See this link for more info: https://help.netflix.com/en/node/23742

### Problems
If you find any problems or have suggestions or questions, feel free to [open an issue](https://github.com/tegon/traktflix/issues/new)

### Development
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

### Credits
<h3 align="center">
  <a href="https://tegon.github.io/traktflix/">
    <img src="https://raw.githubusercontent.com/tegon/traktflix/master/tmdb-api-logo.png" alt="TMDB" width="150">
  </a>
  <a href="https://tegon.github.io/traktflix/">
      <img src="https://raw.githubusercontent.com/tegon/traktflix/master/trakt-api-logo.png" alt="TMDB" width="150">
  </a>
</h3>

This product uses the TMDb API but is not endorsed or certified by TMDb. <br>
This product uses the Trakt.tv API.

[LICENSE](LICENSE)
