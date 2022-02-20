<script>
  import { Accounts } from 'meteor/accounts-base';
  import { router } from 'tinro';

  let email = '';
  let password = '';

  // TODO: Fazer componente de registro e arrumar login;

  const handleLogin = () => {
    Meteor.loginWithPassword({username:email}, password, (error) => {
      if (error){
        console.error(error);
        Accounts.createUser({username:email, password}, console.error);
      };
    });
  }
</script>

<input bind:value={email} type='email' placeholder='Seu melhor email :D'/>
<input bind:value={password} type='password'/>
<button on:click={handleLogin}>Entrar</button>
