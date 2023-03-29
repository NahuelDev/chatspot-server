# Chatspot Server

Chatspot is a chat application that allows you to connect with other people who are listening to the same song as you on Spotify. The application uses the Spotify API to fetch the current song and match you with other users who are listening to the same track.

## Technologies

- Socket.IO
- Node.js
- Express

## Installation

To install and run the server, follow these steps:

1. Clone the repository
2. Install the dependencies by running `npm install`
3. Change `.env.example` to `.env`
3. Create a new Spotify app on the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications) and set all the required variables on `.env`
4. Start server  with `npm run dev`

You also need to run the client that is found [here](https://github.com/NahuelDev/chatspot-client)

## Contributing

Contributions are welcome! Please follow the steps below to contribute:

1. Fork the repository
2. Create a new branch for your feature or bug fix
3. Make your changes and commit them
4. Push your changes to your forked repository
5. Create a pull request

## License

This project is licensed under the MIT License. See the LICENSE file for details.