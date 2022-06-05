<!-- TODO:
  I ask you guys to give it a cool translation animation on display 
  It looks like it comes from nowhere...
-->
<script>
  export let primaryText = "Text one";
  export let secondaryText = "Text two";
  export let open = false;
</script>

<div class="{open ? 'flex' : 'hidden'} justify-center w-full bottom-2 fixed">
  <div class="alert alert-error shadow-lg">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="stroke-current flex-shrink-0 h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      ><path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      /></svg
    >
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="stroke-info flex-shrink-0 w-6 h-6"
        ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        /></svg
      >
      <div>
        <h3 class="font-bold">{primaryText}</h3>
        <div class="text-xs">{secondaryText}</div>
      </div>
    </div>
    <div class="flex-none">
      <button
        on:click={() => (open = false)}
        class="btn btn-sm btn-circle btn-ghost">&times;</button
      >
    </div>
  </div>
</div>
