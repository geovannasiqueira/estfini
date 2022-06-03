<script>
  import { Accounts } from "meteor/accounts-base";
  import { router } from "tinro";
  import Modal from "../atoms/Modal.svelte";

  let email = "";
  let password = "";
  let showModal = false;

  const handleModalCancel = () => {
    showModal = false;
  };

  const handleRegister = () => {
    Accounts.createUser({ username: email, password }, (error) => {
      if (error) {
        console.error(error);
      } else {
        router.goto("/");
      }
    });
  };

  const handleLogin = () => {
    Meteor.loginWithPassword({ username: email }, password, (error) => {
      if (error) {
        console.error(error);
        showModal = true;
      } else {
        router.goto("/");
      }
    });
  };
</script>

<Modal show={showModal} title={"E-mail not found"}>
  <p class="py-4">
    This user does not exist. Do you want to create a new user using this e-mail
    address?
  </p>
  <div class="flex justify-end space-x-2">
    <button class="btn btn-outline" on:click={handleModalCancel}>
      Cancel
    </button>
    <button class="btn btn-primary" on:click={handleRegister}>
      Create User
    </button>
  </div>
</Modal>

<div class="w-full h-full flex justify-center items-center bg-gray-200">
  <div
    class="inline-flex flex-col gap-4 w-96 bg-white p-12 rounded-md shadow-xl"
  >
    <p class="font-bold opacity-80 mb-4">LOGIN</p>

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
      <label for="remember" > Remember me? </label>
    </div>

    <button class="btn btn-primary" on:click={handleLogin}>LOGIN</button>

    <div class='flex justify-center flex-col items-center text-sm opacity-80'>
      <p> Don't have an account yet?</p>
      <a class='underline' href="#"> Register here </a>
    </div>
    
  </div>
</div>
