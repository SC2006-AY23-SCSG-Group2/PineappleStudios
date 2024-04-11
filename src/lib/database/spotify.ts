// import fetch from "node-fetch";

// interface SpotifyTokenResponse {
//   access_token: string;
//   token_type: string;
//   expires_in: number;
// }

// let lastTokenFetchTime: number | null = null; // Variable to store the time of the last token fetch
// let spotifyToken: string | null = null; // Variable to store the current Spotify token

// const fetchSpotifyToken = async () => {
//   try {
//     const response = await fetch('https://accounts.spotify.com/api/token', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       body: 'grant_type=client_credentials&client_id=8cdca6a867134003b59e00ba30b939e5&client_secret=005ce7b3003c47b29a9fbae03e86a9e8',
//     });
//     const data = await response.json() as SpotifyTokenResponse; // Type assertion
//     spotifyToken = data.access_token;
//     lastTokenFetchTime = Date.now(); // Record the time of token fetch
//   } catch (error) {
//     console.error('Error fetching Spotify token:', error);
//   }
// };

// export const getSpotifyTokens = async () => {
//   // Check if the token is null or if it has expired
//   if (!spotifyToken || !lastTokenFetchTime || (Date.now() - lastTokenFetchTime > 3600000)) {
//     await fetchSpotifyToken(); // Fetch new token if null or expired
//   }
//   return spotifyToken;
// };
interface SpotifyTokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
  }
  
  let lastTokenFetchTime: number | null = null; // Variable to store the time of the last token fetch
  let spotifyToken: string | null = null; // Variable to store the current Spotify token
  
  const fetchSpotifyToken = async () => {
    try {
      const clientId = '8cdca6a867134003b59e00ba30b939e5';
      const clientSecret = '005ce7b3003c47b29a9fbae03e86a9e8';
      const credentials = `${clientId}:${clientSecret}`;
      const base64Credentials = Buffer.from(credentials).toString('base64');
  
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${base64Credentials}`,
        },
        body: 'grant_type=client_credentials',
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch Spotify token');
      }
  
      const data = await response.json() as SpotifyTokenResponse; // Type assertion
      spotifyToken = data.access_token;
      lastTokenFetchTime = Date.now(); // Record the time of token fetch
    } catch (error) {
      console.error('Error fetching Spotify token:', error);
    }
  };
  
  
  export const getSpotifyTokens = async () => {
    // Check if the token is null or if it has expired
    if (!spotifyToken || !lastTokenFetchTime || (Date.now() - lastTokenFetchTime > 3600000)) {
      await fetchSpotifyToken(); // Fetch new token if null or expired
    }
    return spotifyToken;
  };
  