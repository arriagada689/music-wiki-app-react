# Music Wiki App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## API
This app uses the [Spotify for Developers, Web API](https://developer.spotify.com/). On initial mount, a trending or popular track is fetched and rendered onto the screen. Additionally, the user has the option to search for their favorite albums, tracks, artists, or playlists. Based on the user input, Spotify's search feature will return the closest matches to the search query and the results will be displayed on the screen. The user can click more and more information from the API will be pulled and displayed on the screen. The Spotify API provides plenty of data to work with including small previews of tracks, and links to a particular album, track, artist, or playlist page on Spotify.

## Hooks and State
Hooks and state are fundamental to this application for keeping track of dynamic API data, user input, and conditionals for whether or not to render components. 