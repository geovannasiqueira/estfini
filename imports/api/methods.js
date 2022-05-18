import { Meteor } from "meteor/meteor";
import fetch from "node-fetch";
import { MediasCollection } from "./MediasCollection";
import { UsersRecommendationsCollection } from "./UsersRecommendationsCollection";

const MEDIA_STATUS = { ENDED: "Ended" };
const MIN_MEDIA_AMOUNT = 10;

Meteor.methods({
  "media.recommend": function (theMovieDbId) {
    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }
    const mediaId = MediasCollection.insert(
      { ...media, createdAt: new Date() },
      (error) => {
        throw new Meteor.Error("Failed to register media.");
      }
    );

    return UsersRecommendationsCollection.insert({
      userId: this.userId,
      mediaId,
    });
  },

  searchTheMovieDb: async function (searchString) {
    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    let mediasThatEnded = [];
    let page = 1;
    let totalPages = 1;
    while (mediasThatEnded.length <= MIN_MEDIA_AMOUNT && page <= totalPages) {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/tv?api_key=${Meteor.settings.theMovieDbApiKey}&language=en-US&page=${page}&query=${searchString}`
      );
      const { results, total_pages } = await response.json();
      totalPages = total_pages;
      // TODO: get genres, complete image url
      const mediasWithStatus = await Promise.all(
        results.map(
          async ({
            poster_path,
            id,
            name,
            overview,
            original_language,
            first_air_date,
          }) => {
            const { status } = await fetch(
              `https://api.themoviedb.org/3/tv/${id}?api_key=${Meteor.settings.theMovieDbApiKey}`
            ).then((res) => {
              return res.json();
            });

            return {
              id,
              status,
              name,
              overview,
              originalLanguage: original_language,
              releaseDate: first_air_date,
              image: poster_path,
            };
          }
        )
      );
      mediasThatEnded = [...mediasThatEnded, ...mediasWithStatus.filter(
        ({ status }) => status === MEDIA_STATUS.ENDED
      )];
      page += 1;
    }
    return mediasThatEnded;
  },
});
