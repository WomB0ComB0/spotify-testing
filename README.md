# Spotify Web Player React App

This project is a React application that integrates with the Spotify API to display user data such as currently playing tracks and top tracks.

## Prerequisites

Before you begin, ensure you have met the following requirements:

* You have a Spotify Developer account and have created a Spotify App
* You have Node.js and npm installed

## Setting up the Spotify App

1. Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/)
2. Create a new app
3. Note down the Client ID and Client Secret
4. Add `http://localhost:3000/callback` to the Redirect URIs in your app settings

## Installation

1. Clone this repository
2. Navigate to the project directory
3. Install dependencies:

   ```
   npm install
   ```

## Configuration

1. Create a `.env.local` file in the root directory
2. Add the following environment variables:

   ```
   VITE_SPOTIFY_CLIENT_ID=your_client_id_here
   VITE_SPOTIFY_CLIENT_SECRET=your_client_secret_here
   VITE_SPOTIFY_REDIRECT_URI=http://localhost:3000/callback
   ```

## Running the Application

1. Start the development server:

   ```
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:3000`

## Usage

1. Click on "Login with Spotify" to authenticate
2. After successful authentication, you'll see your Spotify data displayed

## Troubleshooting

If you encounter any issues:

1. Ensure all environment variables are correctly set
2. Check the browser console for any error messages
3. Verify that your Spotify Developer App settings are correct

## Contributing

Contributions to this project are welcome. Please ensure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
