import { Meteor } from "meteor/meteor";
import fetch from "node-fetch";
import { MediasCollection } from "./MediasCollection";
import { UsersRecommendationsCollection } from "./UsersRecommendationsCollection";

Meteor.methods({
  "media.save": function (media) {
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

  "media.recommend": function (mediaId) {
    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    return UsersRecommendationsCollection.insert({
      userId: this.userId,
      mediaId,
    });
  },

  "searchTheMovieDb": async function (searchString) {
    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }
    const { results } = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=${Meteor.settings.theMovieDbApiKey}&language=en-US&page=1&query=${searchString}`)
      .then(res => {
        return res.json();
      } );
    // TODO: get genres, complete image url
    return results.map(({poster_path, id, name, overview, original_language, first_air_date}) => ({
      id,
      name,
      overview,
      originalLanguage: original_language,
      releaseDate: first_air_date,
      image: poster_path,
    }))
  },
});
