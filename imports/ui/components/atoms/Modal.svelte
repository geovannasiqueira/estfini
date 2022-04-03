<script>
  export let show = false;
  export let title = "Title";
  const close = () => {
    show = false;
  };
</script>

<div
  for="my-modal-4"
  class="modal cursor-pointer"
  class:modal-open={show}
  on:click={close}
>
  <div class="modal-box relative" on:click|stopPropagation>
    <h3 class="text-lg font-bold">{title}</h3>
    <slot {close} />
  </div>
</div>
