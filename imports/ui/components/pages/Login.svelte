<script>
  import { Accounts } from "meteor/accounts-base";
  import { router } from "tinro";
  import AlertDanger from "../atoms/AlertDanger.svelte";

  let email = "";
  let password = "";
  let showLoginError = false;

  const handleLogin = () => {
    Meteor.loginWithPassword({ username: email }, password, (error) => {
      if (error) {
        console.error(error);
        showLoginError = true;
      } else {
        router.goto("/");
      }
    });
  };
</script>

<AlertDanger
  bind:open={showLoginError}
  primaryText="Holy smokes! Something is wrong."
  secondaryText="You better type that credentials right this time."
/>

<div class="w-full h-full flex justify-center items-center bg-gray-200">
  <form
    on:submit|preventDefault
    class="inline-flex flex-col gap-4 w-96 bg-white p-12 rounded-md shadow-xl"
  >
    <p class="font-extrabold opacity-80 mb-4">LOGIN</p>

    <div class="flex flex-col">
      <label for="login" class="opacity-80"> Email </label>
      <input
        id="login"
        class="input input-bordered rounded-sm h-10"
        bind:value={email}
        type="email"
        placeholder="Email"
      />
    </div>

    <div class="flex flex-col">
      <label for="password" class="opacity-80"> Password </label>
      <input
        id="password"
        class="input input-bordered rounded-sm h-10"
        placeholder="Password"
        bind:value={password}
        type="password"
      />
    </div>

    <div class="flex items-center mt-4">
      <input
        type="checkbox"
        id="remember"
        class="checkbox checkbox-primary checkbox-xs rounded-sm mr-3"
      />
      <!-- TODO: So guys, this checkbox here does nothing, I'm sorry. That's up to you, peace. -->
      <label for="remember"> Remember me? </label>
    </div>

    <button class="btn btn-primary" on:click={handleLogin}>LOGIN</button>

    <div class="flex justify-center flex-col items-center text-sm opacity-80">
      <p>Don't have an account yet?</p>
      <a class="underline" href="/signup"> Register here </a>
    </div>
  </form>
</div>
