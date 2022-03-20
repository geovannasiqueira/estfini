<script>
  import { Accounts } from "meteor/accounts-base";
  import { router } from "tinro";
  import Modal from "../atoms/Modal.svelte";

  let email = "";
  let password = "";
  let modalTitle = "E-mail not found";
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

  // TODO: Fazer componente de registro e arrumar login;

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

<Modal show={showModal} title={modalTitle}>
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

<div class="inline-flex flex-col gap-4 self-center w-80 mt-8">
  <input
    class="input input-bordered"
    bind:value={email}
    type="email"
    placeholder="Email"
  />
  <input
    class="input input-bordered"
    placeholder="Password"
    bind:value={password}
    type="password"
  />
  <button class="btn" on:click={handleLogin}>Login</button>
</div>
