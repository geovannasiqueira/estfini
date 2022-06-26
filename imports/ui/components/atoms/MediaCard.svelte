<script>
  import Icon from "svelte-icons-pack/Icon.svelte";
  import heartIcon from "svelte-icons-pack/fa/FaHeart";
  import solidHeartIcon from "svelte-icons-pack/fa/FaSolidHeart";
  import { methodCall } from "../../../methodCall";
  import { UsersRecommendationsCollection } from "../../../api/UsersRecommendationsCollection";
  import { MediasCollection } from "../../../api/MediasCollection";
  import { Tracker } from "meteor/tracker";

  export let media = {};

  let isRecommended;

  const findUserRecommendation = () => {
    const dbMedia = MediasCollection.findOne({
      theMovieDbId: media.theMovieDbId,
    });
    return UsersRecommendationsCollection.findOne({
      mediaId: dbMedia?._id,
    });
  };

  const handleToggleRecommend = () => {
    const recommendation = findUserRecommendation();
    if (recommendation) {
      methodCall("media.unrecommend", recommendation.mediaId);
      return;
    }
    methodCall("media.recommend", media);
  };

  Tracker.autorun(() => {
    isRecommended = findUserRecommendation();
  });
</script>

<div class="card bg-base-100 shadow-xl image-full">
  {#if media.image}
    <figure>
      <img src={media.image} alt="Shoes" />
    </figure>
  {/if}

  <div class="card-body">
    <h2 class="card-title">{media.name}</h2>
    <p>{media.overview}</p>
    <div class="card-actions justify-end">
      <button on:click={handleToggleRecommend}>
        <Icon
          className="fill-current"
          size="2em"
          src={isRecommended ? solidHeartIcon : heartIcon}
        />
      </button>
    </div>
  </div>
</div>
