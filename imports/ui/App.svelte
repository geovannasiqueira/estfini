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

<Route path="/">
  <Home />
</Route>

<Route path="/login">
  <Login />
</Route>
