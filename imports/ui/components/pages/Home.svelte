<script>
  import { Mongo } from "meteor/mongo";
  import { MediaCollection } from "../../../api/MediaCollection";
  import { Meteor }from 'meteor/meteor';
  import { Tracker } from 'meteor/tracker'

  console.log(MediaCollection.find({}).fetch());

  let medias = [];
  let title = '';
  let author = '';
  let description = '';

  const handleSubmit = () => {
    Meteor.call('saveMedia', {title, author, description});
  };

  Tracker.autorun(function(){
    medias = MediaCollection.find({}).fetch();
  })

</script>

<form on:submit|preventDefault = {handleSubmit}>
  <div class="form-control w-full max-w-xs">
    <label for="title" class="label label-text">
      Title
    </label>
    <input id="title" type="text" class="input input-bordered w-full max-w-xs" bind:value={title}>
  </div>
  <div class="form-control w-full max-w-xs">
    <label for="author" class="label label-text">
      Author
    </label>
    <input id="author" type="text" class="input input-bordered w-full max-w-xs" bind:value={author}>
  </div>
  <div class="form-control w-full max-w-xs">
    <label for="description" class="label label-text">
      Description
    </label>
    <textarea  id="description" class="textarea textarea-bordered resize-none" bind:value={description}></textarea>
  </div>
  <button class="btn" type="submit">Save</button>
</form>

<div>
  {#each medias as { title, author, description }}
    {title}
    {author}
    {description}
  {/each}
</div>