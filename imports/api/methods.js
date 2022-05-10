import { Meteor } from "meteor/meteor";
import fetch from "node-fetch";
import { MediasCollection } from "./MediasCollection";
import { UsersRecommendationsCollection } from "./UsersRecommendationsCollection";

Meteor.methods({
  "media.recommend": function (theMovieDbId) {
    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }
    //console.log(media);
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

  "searchTheMovieDb": async function (searchString) {
    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }
    console.log(Meteor.settings)
    const { results } = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=${Meteor.settings.theMovieDbApiKey}&language=en-US&page=1&query=${searchString}`)
      .then(res => {
        return res.json();
      });
    console.log(results)
    // TODO: get genres, complete image url
    return await Promise.all(results.map(
      async ({
        poster_path,
        id,
        name,
        overview,
        original_language,
        first_air_date
      }) => {
        const {status} = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${Meteor.settings.theMovieDbApiKey}`)
          .then(res => {
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
        }
      }))
  },
});
