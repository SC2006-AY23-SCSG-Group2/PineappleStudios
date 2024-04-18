import {
  LoaderFunctionArgs,
  Session,
  TypedResponse,
  json,
  redirect,
} from "@remix-run/node";
import {fetchRecommendationsBasedOnUserPreferences} from "src/lib/dataRetrieve/recommendedItems";

import {fetchRecommendationsForRecentItems} from "../../../lib/dataRetrieve/fetchRecent3Items";
import {
  handleBookSearchAPI,
  handleMovieSearchAPI,
  handleSongSearchAPI,
} from "../../../lib/dataRetrieve/getAPIInfo";
import {ErrorResponse, RecommendationResponse} from "../../../lib/interfaces";
import {ItemType, SimpleItem} from "../../../lib/interfaces";
import {
  SessionData,
  SessionFlashData,
  commitSession,
  destroySession,
  getSession,
} from "../../session";

export async function action(loaderArgs: LoaderFunctionArgs): Promise<
  | TypedResponse<never>
  | TypedResponse<{
      success: boolean;
      data: {data: SimpleItem[]} | null;
      error: {msg: string} | null;
    }>
> {
  return loader(loaderArgs);
}

export async function loader({request}: LoaderFunctionArgs): Promise<
  | TypedResponse<never>
  | TypedResponse<{
      success: boolean;
      data: {data: SimpleItem[]} | null;
      error: {msg: string} | null;
    }>
> {
  const session: Session<SessionData, SessionFlashData> = await getSession(
    request.headers.get("cookie"),
  );

  if (!session.has("userId") || !session.data.userId) {
    session.flash("error", "User not login");

    return redirect("/login", {
      headers: {
        "Set-Cookie": await destroySession(session),
      },
    });
  }

  if (isNaN(+session.data.userId)) {
    session.flash("error", "User id is not a number");

    return redirect("/login", {
      headers: {
        "Set-Cookie": await destroySession(session),
      },
    });
  }

  const recommendationResultForRecentItems:
    | RecommendationResponse
    | ErrorResponse = await fetchRecommendationsForRecentItems(
    +session.data.userId,
  );

  const recommendationResultBasedOnPreferences:
    | RecommendationResponse
    | ErrorResponse = await fetchRecommendationsBasedOnUserPreferences(
    +session.data.userId,
  );

  // Combine the results using Promise.all
  const combinedRecommendations: [
    RecommendationResponse | ErrorResponse,
    RecommendationResponse | ErrorResponse,
  ] = await Promise.all([
    recommendationResultForRecentItems,
    recommendationResultBasedOnPreferences,
  ]);

  // Extract individual results
  const [resultForRecentItems, resultBasedOnPreferences] =
    combinedRecommendations;

  // Handle error responses
  if ("error" in resultForRecentItems || "error" in resultBasedOnPreferences) {
    const errorMessages: string[] = [];
    if ("error" in resultForRecentItems) {
      errorMessages.push(resultForRecentItems.error);
    }
    if ("error" in resultBasedOnPreferences) {
      errorMessages.push(resultBasedOnPreferences.error);
    }
    const errorMessage = errorMessages.join(", ");
    return json(
      {
        success: false,
        data: null,
        error: {
          msg: errorMessage,
        },
      },
      {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      },
    );
  }

  // Combine the recommendations from both responses
  // Combine the recommendations from both responses while eliminating duplicates
  const combinedRecommendationResult: RecommendationResponse = {
    books: [
      ...new Set([
        ...resultForRecentItems.books,
        ...resultBasedOnPreferences.books,
      ]),
    ],
    movies: [
      ...new Set([
        ...resultForRecentItems.movies,
        ...resultBasedOnPreferences.movies,
      ]),
    ],
    songs: [
      ...new Set([
        ...resultForRecentItems.songs,
        ...resultBasedOnPreferences.songs,
      ]),
    ],
  };

  const returnResult: SimpleItem[] = [];

  for (const i of combinedRecommendationResult.books) {
    const bookResult = await handleBookSearchAPI(i);
    if (bookResult.length >= 1) {
      const e = bookResult[0];
      returnResult.push({
        tag: [],
        id: e.srcId,
        title: e.itemTitle,
        type: ItemType.Book,
        img: e.thumbnailUrl,
      });
    }
  }

  for (const i of combinedRecommendationResult.songs) {
    const bookResult = await handleSongSearchAPI(i);
    if (bookResult.length >= 1) {
      const e = bookResult[0];
      returnResult.push({
        tag: [],
        id: e.srcId,
        title: e.itemTitle,
        type: ItemType.Song,
        img: e.thumbnailUrl,
      });
    }
  }

  for (const i of combinedRecommendationResult.movies) {
    const bookResult = await handleMovieSearchAPI(i);
    if (bookResult.length >= 1) {
      const e = bookResult[0];
      returnResult.push({
        tag: [],
        id: e.srcId,
        title: e.itemTitle,
        type: ItemType.Movie,
        img: e.thumbnailUrl,
      });
    }
  }

  if (returnResult.length === 0) {
    return json(
      {
        success: false,
        data: null,
        error: {
          msg:
            "There is no recommendation result for this user, " +
            "you can browser more and add more items to your library first.",
        },
      },
      {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      },
    );
  }

  return json(
    {
      success: true,
      data: {data: returnResult},
      error: null,
    },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    },
  );
}
