import { Meteor } from "meteor/meteor";
import { MediasCollection } from "/imports/api/MediasCollection";
import "/imports/api/methods";

Meteor.startup(() => {
  //console.log(MediasCollection.find({}));
  Meteor.publish("media", function () {
    return MediasCollection.find({});
  });
});
