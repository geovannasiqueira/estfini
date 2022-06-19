import { MediasCollection } from "./MediasCollection";
import { UsersRecommendationsCollection } from "./UsersRecommendationsCollection";

Meteor.startup(() => {
  Meteor.publish("home", function () {
    const cursor = UsersRecommendationsCollection.find({ userId: this.userId });
    console.log(cursor.fetch());
    return [
      MediasCollection.find({}),
      cursor,
    ];
  });
});
