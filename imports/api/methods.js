import { Meteor } from "meteor/meteor";
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
});
