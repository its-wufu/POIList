# POI List

## What is this

This is an Expo App. To try it out, read the "Getting Started" paragraph.
You can see a List of Places around a location given in the `./config.js` file. You can look for places with a specific search query. If you want to list all available places, enter an empty search string.

When you press on one venue, the App will open a modal with additional info and you can call the place / open it in your native map App and share a link about this location with friends.

I tested the App using my Android Phone (Android Version 7.0 Nougat). The App should work on Android with this version and newer. For iOS I could not test it yet.

## Getting Started

To try out the App you need to have Expo installed. (Assuming you have npm package manager installed)

```bash
npm install -g expo-cli
```

Please clone the Repo and change the `./config.js` however you like, but the credentials are required. Get some at
[the Developer Page of Foursquare](https://developer.foursquare.com/docs)

Then run:

```bash
npm start
```

The Expo Metro Bundler will open in the browser and you can scan the QR-Code with your Android Phone using the

[Expo App at Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en)

## Additional Stuff You Can Do

### Persistence

To persist data we could safe the list we got from our last query and safe it into localStorage.

### Device Location

We can include a switch to activate device location tracking to get the coords.

### Pagination

Maybe load-on-scroll or something fancy.

### Testing
