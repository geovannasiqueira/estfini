import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";

export const MediasCollection = new Mongo.Collection("medias");

if (Meteor.isServer) {
    MediasCollection.createIndex({ theMovieDbId: 1 }, { unique: true });
}
