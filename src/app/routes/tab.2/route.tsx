import { useState } from "react";
import {useLoaderData} from "@remix-run/react";
import React from "react";

import ItemList from "../_components/ItemList";
import { getBookRequest, getBookDetailsRequest } from "./../../../lib/database/book";
import { getMovieRequest, getMovieDetailsRequest } from "src/lib/database/movie";
import { getSongRequest, getSongDetailsRequest } from "src/lib/database/song";
//import { getMovieRequest } from "./../../../lib/database/movie";  

interface LoaderData {
  user: {
    items: Array<{
      imageSrc: string;
      placeholder: string;
    }>;
  };
}
// Define interface for book object
interface Book {
  itemTitle: string;
  // genre: string;
  // language: string;
  // averageRating: number;
  // ratingsCount: number;
  // authors: string[];
  // publishedDate: string;
  thumbnailUrl: string;
  // Add other properties of a book as needed
}
interface Movie {
  itemTitle: string;
  thumbnailUrl: string;
}
interface Song {
  itemTitle: string;
  thumbnailUrl: string;
}
// interface details {
//   title: string,
//   genre: string;
// }
// interface Movie {
//   itemTitle: string;
//   // genre: string;
//   // language: string;
//   // averageRating: number;
//   // ratingsCount: number;
//   // authors: string[];
//   // publishedDate: string;
//   thumbnailUrl: string;
//   // Add other properties of a book as needed
// }

export const loader = async (): Promise<LoaderData> => {
  return {
    user: {
      items: [
        {
          imageSrc: "https://picsum.photos/200.webp",
          placeholder: "Itefwrfwrgvefgvetffgb rgergvefgvergttefgtfem",
        },
        {
          imageSrc: "https://picsum.photos/200.webp",
          placeholder: "Item fewf few f2f f",
        },
        {
          imageSrc: "https://picsum.photos/200.webp",
          placeholder: "Item",
        },
        {
          imageSrc: "https://picsum.photos/200.webp",
          placeholder: "Item",
        },
        {
          imageSrc: "https://picsum.photos/200.webp",
          placeholder: "Item",
        },
        {
          imageSrc: "https://picsum.photos/200.webp",
          placeholder: "Item",
        },
        {
          imageSrc: "https://picsum.photos/200.webp",
          placeholder: "Item",
        },
        {
          imageSrc: "https://picsum.photos/200.webp",
          placeholder: "Item",
        },
        {
          imageSrc: "https://picsum.photos/200.webp",
          placeholder: "Item",
        },
        {
          imageSrc: "https://picsum.photos/200.webp",
          placeholder: "Item",
        },
        {
          imageSrc: "https://picsum.photos/200.webp",
          placeholder: "Item",
        },
      ],
    },
  };
};



export default function tab_index(): React.JSX.Element {
  const { user } = useLoaderData<typeof loader>();
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const [searchResultsBooks, setSearchResultsBooks] = useState<Book[]>([]);
  const [modifiedSampleDataBooks, setModifiedSampleDataBooks] = useState<Book[]>([]);

  const [searchResultsMovies, setSearchResultsMovies] = useState<Movie[]>([]);
  const [modifiedSampleDataMovies, setModifiedSampleDataMovies] = useState<Movie[]>([]);

  const [searchResultsSongs, setSearchResultsSongs] = useState<Song[]>([]);
  const [modifiedSampleDataSongs, setModifiedSampleDataSongs] = useState<Song[]>([]);

  const sampleData = [
    {
      itemTitle: "Title",
      thumbnailUrl: "https://picsum.photos/200/300",
      duration: "117 min",
      genre: "Comedy",
      year: "2021",
      placeholder: "Comedy Movie",
      showHeart: true,
    },
    {
      itemTitle: "Title",
      thumbnailUrl: "https://picsum.photos/200/301",
      duration: "142 min",
      genre: "Drama",
      year: "2019",
      placeholder: "Drama Movie",
      showHeart: false,
    },
    {
      itemTitle: "Title",
      thumbnailUrl: "https://picsum.photos/200/302",
      duration: "129 min",
      genre: "Action",
      year: "2022",
      placeholder: "Action Movie",
      showHeart: true,
    },
    {
      itemTitle: "Title",
      thumbnailUrl: "https://picsum.photos/200.webp",
      duration: "95 min",
      genre: "Sci-Fi",
      year: "2020",
      placeholder: "Sci-Fi Movie",
      showHeart: false,
    },
    {
      itemTitle: "Title",
      thumbnailUrl: "https://picsum.photos/200.webp",
      duration: "103 min",
      genre: "Horror",
      year: "2018",
      placeholder: "Horror Movie",
      showHeart: true,
    },
    {
      itemTitle: "Title",
      thumbnailUrl: "https://picsum.photos/200/300",
      duration: "117 min",
      genre: "Comedy",
      year: "2021",
      placeholder: "Comedy Movie",
      showHeart: true,
    },
    {
      itemTitle: "Title",
      thumbnailUrl: "https://picsum.photos/200/301",
      duration: "142 min",
      genre: "Drama",
      year: "2019",
      placeholder: "Drama Movie",
      showHeart: false,
    },
    {
      itemTitle: "Title",
      thumbnailUrl: "https://picsum.photos/200/302",
      duration: "129 min",
      genre: "Action",
      year: "2022",
      placeholder: "Action Movie",
      showHeart: true,
    },
    {
      itemTitle: "Title",
      thumbnailUrl: "https://picsum.photos/200.webp",
      duration: "95 min",
      genre: "Sci-Fi",
      year: "2020",
      placeholder: "Sci-Fi Movie",
      showHeart: false,
    },
    {
      itemTitle: "Title",
      thumbnailUrl: "https://picsum.photos/200.webp",
      duration: "103 min",
      genre: "Horror",
      year: "2018",
      placeholder: "Horror Movie",
      showHeart: true,
    },
  ];

const handleSearch = async () => {
  if (searchValue.trim() !== "") {
    try {

      //Books
      const books: Book[] = await getBookRequest(searchValue);
      setSearchResultsBooks(books);
      setIsSearching(true);

      // Fetch details for each book
      const detailedBooksPromises: Promise<Book>[] = books.map(async book => {
        try {
          const [bookDetails] = await getBookDetailsRequest(book.itemTitle); // Destructure the details array
          return {
            //...book,
            //...details,
            itemTitle: book.itemTitle,
            thumbnailUrl:bookDetails.thumbnailUrl,
            genre: bookDetails.genre,
            duration: bookDetails.language,
            year: bookDetails.year,
          };
        } catch (error) {
          console.error("Error fetching details for book:", error);
          // Handle the error appropriately
          return book; // Return the book without details
        }
      });
      
      const detailedBooks: Book[] = await Promise.all(detailedBooksPromises);
      setModifiedSampleDataBooks(detailedBooks);

      
      // //Movies
      const movies: Movie[] = await getMovieRequest(searchValue);
      setSearchResultsMovies(movies);
      //console.error(movies);
      // Fetch details for each book
      const detailedMoviesPromises: Promise<Movie>[] = movies.map(async movie => {
        try {
          const [movieDetails] = await getMovieDetailsRequest(movie.itemTitle); // Destructure the details array
          return {
            itemTitle: movie.itemTitle,
            thumbnailUrl:movieDetails.thumbnailUrl,
            genre: movieDetails.genre,
            duration: movieDetails.duration,
            year: movieDetails.year,
          };
        } catch (error) {
          console.error("Error fetching details for book:", error);
          // Handle the error appropriately
          return movie; // Return the book without details
        }
      });
      
      const detailedMovies: Song[] = await Promise.all(detailedMoviesPromises);
      setModifiedSampleDataMovies(detailedMovies);


      // //Songs
      const songs: Song[] = await getSongRequest(searchValue);
      setSearchResultsSongs(songs);
      //console.error(movies);
      // Fetch details for each book
      const detailedSongsPromises: Promise<Song>[] = songs.map(async song => {
        try {
          const [songDetails] = await getSongDetailsRequest(song.itemTitle); // Destructure the details array
          return {
            itemTitle: song.itemTitle,
            thumbnailUrl: songDetails.thumbnailUrl,
            duration: songDetails.duration,
            genre: songDetails.genre,
            year: "2018",
            placeholder: "Horror Movie",
            showHeart: true,
          };
        } catch (error) {
          console.error("Error fetching details for book:", error);
          // Handle the error appropriately
          return song; // Return the book without details
        }
      });
      
      const detailedSongs: Song[] = await Promise.all(detailedSongsPromises);
      setModifiedSampleDataSongs(detailedSongs);


    } catch (error) {
      console.error("Error searching books:", error);
      setSearchResultsBooks([]);
      setSearchResultsMovies([]);
      setIsSearching(false);
    }
  } else {
    setSearchResultsBooks([]);
    setSearchResultsMovies([]);
    setIsSearching(false);
    setModifiedSampleDataBooks([]);
    setModifiedSampleDataMovies([]);
  }
};
return (
  <div className="bg-gray-100">
    <div className="flex bg-gray-100 p-2">
      <div className="flex transform items-center space-x-6 rounded-xl bg-white p-3 shadow-lg transition duration-200 hover:scale-95 hover:shadow-xl">
        <div className="flex w-72 space-x-4 rounded-lg bg-gray-100 p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 opacity-30"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            className="bg-gray-100 outline-none"
            type="text"
            placeholder="Item name or keyword..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div className="flex cursor-pointer rounded-lg px-4 py-2 font-semibold text-gray-500">
          <span>All categories</span>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
        <div
          className="duration-3000 cursor-pointer rounded-lg bg-gray-800 px-5 py-2 font-semibold text-white transition hover:shadow-lg"
          onClick={handleSearch}
        >
          <span>Search</span>
        </div>
      </div>
    </div>

    <div className="my-6 flex flex-wrap justify -start gap-4 px-4">
        <h1 className="mx-6 mb-4 text-xl font-extrabold text-black text-gray-900 md:text-3xl lg:text-4xl">
          <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Today's Hits
          </span>{" "}
        </h1>
        {isSearching ? (
          <>
            <ItemList items={modifiedSampleDataSongs} title={"Top Music"} />
            <ItemList items={modifiedSampleDataMovies} title={"Top Movies"} />
            <ItemList items={modifiedSampleDataBooks} title={"Top Books"} />
          </>
        ) : (
          <>
            <ItemList items={sampleData} title={"Top Music"} />
            <ItemList items={sampleData} title={"Top Movies"} />
            <ItemList items={sampleData} title={"Top TV Shows"} />
            <ItemList items={sampleData} title={"Top Books"} />
          </>
        )}
      </div>
    </div>
  );
}
