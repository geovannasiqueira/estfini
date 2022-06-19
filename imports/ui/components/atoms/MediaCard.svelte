<script>
  import Icon from "svelte-icons-pack/Icon.svelte";
  import heartIcon from "svelte-icons-pack/fa/FaHeart";
  import solidHeartIcon from "svelte-icons-pack/fa/FaSolidHeart";
  import { methodCall } from "../../../methodCall";
  import { UsersRecommendationsCollection } from "../../../api/UsersRecommendationsCollection";
  import { MediasCollection } from "../../../api/MediasCollection";

  export let media = {};

  const handleToggleRecommend = () => {
    const dbMedia = MediasCollection.findOne({ theMovieDbId: media.theMovieDbId });
    const recommendation = UsersRecommendationsCollection.findOne({
      mediaId: dbMedia._id,
    });
    if (recommendation) {
      methodCall("media.unrecommend", dbMedia._id);
      return;
    }
    methodCall("media.recommend", media);
  };

</script>

<div class="card bg-base-200 shadow">
  <div class="card-body flex flex-row items-center space-x-4">
    <button on:click={handleToggleRecommend}>
      <Icon className="fill-current" size="2em" src={solidHeartIcon} />
    </button>
    <div class="flex flex-col">
      <p>
        {media.name}
      </p>
    </div>
  </div>
</div>
