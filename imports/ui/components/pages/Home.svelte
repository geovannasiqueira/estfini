<script>
  import { Mongo } from "meteor/mongo";
  import { MediasCollection } from "../../../api/MediasCollection";
  import { Meteor } from "meteor/meteor";
  import { Tracker } from "meteor/tracker";
  import Modal from "../atoms/Modal.svelte";
  import MediaCard from "../atoms/MediaCard.svelte";

  console.log(MediasCollection.find({}).fetch());

  let medias = [];
  let title = "";
  let author = "";

  $: {
    console.log("title", title);
  }

  const handleSubmit = () => {
    Meteor.call("media.save", { title, author }, (error, result) => {
      title = "";
      author = "";

      if (error) {
        //TODO: Do something if error
      }
    });
  };

  Tracker.autorun(function () {
    medias = MediasCollection.find({}).fetch();
  });
</script>

<Modal title="Add media" let:close={closeModal} let:open={openModal}>
  <button
    class="btn col-start-2 btn-primary btn-sm justify-self-end"
    slot="outside"
    on:click={openModal}
  >
    Add Media
  </button>

  <form
    class="space-y-4 flex flex-col items-stretch"
    on:submit|preventDefault={handleSubmit}
  >
    <div class="form-control w-full">
      <label for="title" class="label label-text uppercase font-bold">
        Title
      </label>
      <input
        id="title"
        type="text"
        class="input input-bordered w-full"
        bind:value={title}
      />
    </div>
    <div class="form-control w-full">
      <label for="author" class="label label-text uppercase font-bold">
        Author
      </label>
      <input
        id="author"
        type="text"
        class="input input-bordered w-full"
        bind:value={author}
      />
    </div>
    <div class="self-end pt-6 space-x-4">
      <button class="btn btn-outline" type="button" on:click={closeModal}
        >Cancel</button
      >
      <button class="btn btn-primary" type="submit" on:click={closeModal}
        >Save</button
      >
    </div>
  </form>
</Modal>

{#each medias as { title, author }}
  <MediaCard
    class="card shadow"
    media={{
      title,
      author,
    }}
  />
{/each}
