# Functions that communicates database from ui

## For login and session validation

### Sessions

using `createCookieSessionStorage` from `Remix.run`

> Data Definition:

```ts
type SessionData = {
  id: number;
};

type SessionFlashData = {
  errorMsg: string;
};
```

For sessions, please read: <https://remix.run/docs/en/main/utils/sessions>
and <https://remix.run/docs/en/main/utils/cookies>

## For Display

### UserProfile

> function

```ts
getUserInfo(number
id
)
```

> return `User`

```ts
type User = {
  id: number;
  email: string;
  name: string;
  history: Item[];
  countItemsInLibrary: number;
  preference: string[];
};

type Item = {
  id: number;
  name: number;
  img: string; // string of the url
  type: string;
};
```

### Item

> ! a thing to remind: All kind of the items, no matter movie, song, or book,
> they share the `id`. that is to say: if `Item[1]` is movie, then there will not
> be `Song[1]` or `Book[1]`

---

> function:

```ts
getItemInfo(number
id, number
userId
)
```

> return: `Item`

```ts
type Item = {
  id: number;
  title: string;
  isInLibrary: boolean;
  img: string; // string of the url
  genre: string;
  country: string?;
  publicationDate: string?;
  type: string; // movie song or book
  otherContent: MovieContent | SongContent | BookContent;
  people: People[];
};

type People = {
  name: string;
  role: string; // do not leave this null, give some default value, creator for song, movie, author for book.
};

type MovieContent = {
  duration: number?;
  country: string?;
};

type SongContent = {
  duration: number?;
  album: string?；
};

type BookContent = {
  pageCount: number?;
};
```

### Folder

> function:

```ts
getFolderInfo(number
id, number
userId
)
```

> return: `Folder`

```ts
type Folder = {
  id: number;
  name: string;
  isSeries: boolean;
  img: string; // string of the url, maybe a default value, may be upload by user, may be the img of the first item in the folder
  items: Item[];
};

type Item = {
  id: number;
  name: number;
  img: string; // string of the url
  type: string;
};
```

### Library

> function:

```ts
getLibraryInfo(number
userId
)
```

> return: `Library`

```ts
type Library = {
  id: number;
  userId: number;
  items: Item[];
  folders: Folder[];
  series: Folder[];
};

type Item = {
  id: number;
  name: number;
  img: string; // string of the url
  type: string;
};

type Folder = {
  id: number;
  name: string;
  isSeries: boolean;
  img: string; // string of the url, maybe a default value, may be upload by user, may be the img of the first item in the folder
};
```

### Browser

> function:

```ts
getBrowserContent();
```

> return: `OnlineContent`

```ts
type OnlineContent = {
  movies: Item[]?;
  songs: Item[]?;
  books: Item[]?;
};

type Item = {
  id: number;
  name: number;
  img: string; // string of the url
  type: string;
};
```

## Editing

> TODO

folder
library
items
user_profile

## search

### Search Item

> function:

```ts
getSearch(searchKey
:
string, type
:
Type
)
;

enum Type

= {
  Book,
  Song,
  Movie,
  All
}
```

> return: `OnlineContent`

```ts
type OnlineContent = {
  movies: Item[]?;
  songs: Item[]?;
  books: Item[]?;
};

type Item = {
  id: number;
  name: number;
  img: string; // string of the url
  type: string;
};
```
