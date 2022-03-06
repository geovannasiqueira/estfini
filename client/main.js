import { Meteor } from 'meteor/meteor';
import App from '../imports/ui/App.svelte';


Meteor.startup(() => {
  Meteor.subscribe('media');
  new App({
    target: document.getElementById('app')
  });
});