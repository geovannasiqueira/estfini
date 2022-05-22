import { Mongo } from "meteor/mongo";

export const UsersRecommendationsCollection = new Mongo.Collection(
  "usersRecommendations"
);

if (Meteor.isServer) {
  UsersRecommendationsCollection.createIndex({ userId: 1, mediaId: 1 }, { unique: true });  
}
