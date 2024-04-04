import {ItemInfo, ItemType, People, SongContent} from "../interfaces";

function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getItemInfo(id: string): ItemInfo | undefined {
  const content: SongContent = {
    duration: 150,
    album: "album1",
  };

  function makePeople(): People[] {
    const returnList: People[] = [];
    for (let i = 0; i < 3; i++) {
      const id = randomInteger(0, 1084);
      const newItem: People = {
        name: `people${id}`,
        role: `role${id}`,
      };
      returnList.push(newItem);
    }

    return returnList;
  }

  if (isNaN(+id)) {
    const newId = randomInteger(0, 1084);
    return {
      id: newId,
      title: `title ${id}`,
      isInLibrary: !isNaN(+id),
      img: `https://picsum.photos/id/${randomInteger(0, 1084)}/200.webp`, // string of the url
      genre: ["genre1", "genre2"],
      tag: ["genre1", "genre2"],
      country: "Singapore",
      publicationDate: "2021-12-02",
      type: ItemType.Song, // movie song or book
      otherContent: content,
      people: makePeople(),
    };
  }

  return {
    id: +id,
    title: `title ${id}`,
    isInLibrary: !isNaN(+id),
    img: `https://picsum.photos/id/${randomInteger(0, 1084)}/200.webp`, // string
    // of
    // the
    // url
    genre: ["genre1", "genre2"],
    tag: ["genre1", "genre2"],
    country: "Singapore",
    publicationDate: "2021-12-02",
    type: ItemType.Song, // movie song or book
    otherContent: content,
    people: makePeople(),
  };
}
