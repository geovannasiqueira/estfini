<script>
  // called only once
  import { Route, router } from "tinro";
  import Login from "./components/pages/Login.svelte";
  import Home from "./components/pages/Home.svelte";
  import { Accounts } from "meteor/accounts-base";

  let isLogedIn = Meteor.userId();
  Accounts.onLogin(() => {
    isLogedIn = true;
  });
  Accounts.onLogout(() => {
    isLogedIn = false;
  });

  // reactive
  $: {
    if (!isLogedIn) {
      router.goto("/login");
    }
  }
</script>

<div class="bg-base-100 h-full w-full flex flex-col">
  <div class="flex justify-end p-4 bg-base-200">
    {#if isLogedIn}
      <button class="btn btn-ghost" on:click={Meteor.logout}>Logout</button>
    {/if}
  </div>
  <Route path="/"><Home /></Route>

  <Route path="/login">
    <Login />
  </Route>
</div>
