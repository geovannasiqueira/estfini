<script>
  export let show = false;
  export let title = "Title";

  const close = () => {
    show = false;
  };

  const open = () => {
    show = true;
  };
</script>

<slot name="outside" {open}></slot>

<div
  for="my-modal-4"
  class="modal cursor-pointer"
  class:modal-open={show}
  on:click={close}
>
  <div class="modal-box relative" on:click|stopPropagation>
    <h3 class="text-xl font-bold mb-6">{title}</h3>
    <slot {close}/>
  </div>
</div>
