import { Meteor } from 'meteor/meteor';
import {MediaCollection} from '/imports/api/MediaCollection'



Meteor.startup(() => {
  //console.log(MediaCollection.find({}));
  Meteor.publish('media', function () {
    return MediaCollection.find({});
  });

});
