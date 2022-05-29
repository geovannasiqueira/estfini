<script>
  import { MediasCollection } from "../../../api/MediasCollection";
  import { Meteor } from "meteor/meteor";
  import { Tracker } from "meteor/tracker";
  import { tick } from "svelte";
  import MediaCard from "../atoms/MediaCard.svelte";
  import Icon from "svelte-icons-pack/Icon.svelte";
  import SeartIcon from "svelte-icons-pack/fa/FaSolidSearch";

  let FAKE_LOADING_TIME = 1000;
  let medias = [];
  let isSearching = false;
  let inputElement = null;
  let debounceTimer = null;

  const handleSearchClick = async () => {
    isSearching = true;
    await tick();
    inputElement.focus();
  };

  const handleSearchChange = (event) => {
    const searchString = event.target.value;
    search(searchString);
  };

  const handleInputBlur = (event) => {
    if (!event.target.value) {
      isSearching = false;
      return;
    }
  };

  const search = (searchString) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      Meteor.call("searchTheMovieDb", searchString, (error, result) => {
        medias = result;
      });
    }, FAKE_LOADING_TIME);
  };

  Tracker.autorun(function () {
    medias = MediasCollection.find({}).fetch();
  });
</script>

<div class="relative h-full w-full overflow-y-scroll">
  <div class="sticky top-0 z-50 p-2">
    <div class="navbar rounded-2xl bg-neutral text-neutral-content shadow">
      <a class="btn btn-ghost" href="/">Est Fini</a>
      <div class="ml-auto">
        {#if isSearching}
          <input
            class="input input-sm text-base-content"
            on:input={handleSearchChange}
            on:blur={handleInputBlur}
            bind:this={inputElement}
          />
        {:else}
          <button class="btn btn-circle" on:click={handleSearchClick}>
            <Icon className="fill-current" src={SeartIcon} />
          </button>
        {/if}
      </div>
    </div>
  </div>

  <ul class="space-y-2 p-2">
    {#each medias as media (media.theMovieDbId)}
      <li>
        <MediaCard {media} />
      </li>
    {/each}
  </ul>
</div>
