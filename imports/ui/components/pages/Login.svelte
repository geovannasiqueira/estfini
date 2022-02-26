<script>
  import { Accounts } from "meteor/accounts-base";

  let email = "";
  let password = "";

  // TODO: Fazer componente de registro e arrumar login;

  const handleLogin = () => {
    Meteor.loginWithPassword({ username: email }, password, (error) => {
      if (error) {
        console.error(error);
        Accounts.createUser({ username: email, password }, console.error);
      }
    });
  };
</script>

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
  <button class="btn" on:click={handleLogin}>Entrar</button>
</div>
