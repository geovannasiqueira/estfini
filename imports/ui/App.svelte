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

{Meteor.userId()}

<div class="container">
  <button on:click={Meteor.logout}>Logout</button>
  <Route path="/login">
    <Login />
  </Route>
</div>
