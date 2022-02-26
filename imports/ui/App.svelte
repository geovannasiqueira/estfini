<script>
  import { Route, router } from "tinro";
  import Login from "./components/pages/Login.svelte";

  let counter = 0;

  if (!Meteor.userId()) {
    router.goto("/login");
  }

  const addToCounter = () => {
    counter += 1;
  };
</script>

<div class="bg-base-100 h-full w-full flex flex-col">
  <div class="flex justify-end p-4 bg-base-200">
    <button class="btn btn-ghost" on:click={Meteor.logout}>Logout</button>
  </div>
  <Route path="/login">
    <Login />
  </Route>
</div>
