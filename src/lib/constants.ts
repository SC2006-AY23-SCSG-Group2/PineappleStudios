export const MAX_SLOTS_PER_USER_FOR_RECENT_ITEM = 5;
export const SPOTIFY_CLIENT_ID =
  process.env.SPOTIFY_CLIENT_ID ?? "8cdca6a867134003b59e00ba30b939e5";
export const SPOTIFY_CLIENT_SECRET =
  process.env.SPOTIFY_CLIENT_SECRET ?? "005ce7b3003c47b29a9fbae03e86a9e8";

export function getPicsumURL(id?: number): string {
  function randomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  if (!id || id > 1084) {
    id = randomInteger(0, 1084);
  }
  return `https://picsum.photos/id/${id}/400/600.webp`;
}
