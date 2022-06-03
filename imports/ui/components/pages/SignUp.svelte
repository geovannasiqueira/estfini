<script>
  import { Accounts } from "meteor/accounts-base";
  import { router } from "tinro";

  let email = "";
  let password = "";

  const handleRegister = () => {
    Accounts.createUser({ username: email, password }, (error) => {
      if (error) {
        console.error(error);
      } else {
        router.goto("/");
      }
    });
  };
</script>

<div class="w-full h-full flex justify-center items-center bg-gray-200">
  <div
    class="inline-flex flex-col gap-4 w-96 bg-white p-12 rounded-md shadow-xl"
  >
    <p class="font-extrabold opacity-80 mb-4">SIGN UP</p>

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

    <button class="btn btn-primary" on:click={handleRegister}>SIGN UP</button>

    <div class="flex justify-center flex-col items-center text-sm opacity-80">
      <p>Do you already have an account?</p>
      <a class="underline" href="/login"> Login here </a>
    </div>
  </div>
</div>
