<script>
  import Icon from 'svelte-icons-pack/Icon.svelte';
  import heartIcon from 'svelte-icons-pack/fa/FaHeart';
  import solidHeartIcon from 'svelte-icons-pack/fa/FaSolidHeart';

  export let media = {};
</script>

<div class="card shadow bg-base-200">
  <div class="card-body flex flex-row items-center space-x-4">
    <div>
      <Icon className="fill-current" size="2em" src={solidHeartIcon}/>
    </div>
    <div class="flex flex-col">
      <p>
        {media.title}
      </p>
      <p>
        {media.author}
      </p>
    </div>
  </div>
</div>
