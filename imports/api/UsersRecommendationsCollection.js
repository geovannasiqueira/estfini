import { Mongo } from "meteor/mongo";

export const UsersRecommendationsCollection = new Mongo.Collection(
  "usersRecommendations"
);
