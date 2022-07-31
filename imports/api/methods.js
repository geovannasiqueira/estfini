import { Meteor } from "meteor/meteor";
import fetch from "node-fetch";
import { MediasCollection } from "./MediasCollection";
import { UsersRecommendationsCollection } from "./UsersRecommendationsCollection";
import { theMovieDbMock } from "./mockApiCalls";
import { fetchMedia } from "./theMovieDbClient";

const MEDIA_STATUS = { ENDED: "Ended" };
const MIN_MEDIA_AMOUNT = 10;

Meteor.methods({
  "media.recommend": function (media) {
    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }
    MediasCollection.insert(
      { ...media, createdAt: new Date() },
      (error, createdMediaId) => {
        const mediaId =
          createdMediaId ||
          MediasCollection.findOne({ theMovieDbId: media.theMovieDbId })._id;

        UsersRecommendationsCollection.insert({
          userId: this.userId,
          mediaId,
        });
      }
    );
  },

  "media.unrecommend": function (mediaId) {
    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }
    return UsersRecommendationsCollection.remove({
      userId: this.userId,
      mediaId,
    });
  },

  searchTheMovieDb: async function (searchString) {
    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    const mediaSearchResult = Meteor.settings.mockApiCalls
      ? theMovieDbMock
      : await fetchMedia(searchString);
    return mediaSearchResult.map(
      ({
        id,
        status,
        name,
        overview,
        original_language,
        first_air_date,
        backdrop_path,
      }) => {
        return {
          theMovieDbId: id,
          status,
          name,
          overview,
          originalLanguage: original_language,
          releaseDate: first_air_date,
          image:
            backdrop_path && `https://image.tmdb.org/t/p/w780${backdrop_path}`,
        };
      }
    );
  },

  "usersRecommendations.count": function (mediaIds) {
    const usersRecommendations = UsersRecommendationsCollection.find({
      mediaId: { $in: mediaIds },
    }).fetch();

    const usersRecommendationsByMediaId = usersRecommendations.reduce(
      (acc, userRec) => {
        console.log('Acumulador:', acc);
        console.log('user rec:', userRec);

        return {
          ...acc,
          [userRec.mediaId]: (acc[userRec.mediaId] || 0) + 1,
        };
      },
      {}
    );

    console.log('BLABLA ', usersRecommendationsByMediaId);
    return usersRecommendationsByMediaId;
  },
});

