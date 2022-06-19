<script>
  import Icon from 'svelte-icons-pack/Icon.svelte';
  import heartIcon from 'svelte-icons-pack/fa/FaHeart';
  import solidHeartIcon from 'svelte-icons-pack/fa/FaSolidHeart';
import { methodCall } from '../../../methodCall';

  export let media = {};

  const handleRecommend = () => {
    methodCall("media.recommend", media);
    
  };

</script>

<div class="card shadow bg-base-200">
  <div class="card-body flex flex-row items-center space-x-4">
    <button on:click={handleRecommend} >
      <Icon className="fill-current" size="2em" src={solidHeartIcon}/>
    </button>
    <div class="flex flex-col">
      <p>
        {media.name}
      </p>
    </div>
  </div>
</div>
