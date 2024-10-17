<template>
  <div class="about">
    <h1>Login</h1>
    <p>Welcome to Login!</p>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="username">Username:</label>
        <input id="username" v-model="username" type="text" />
      </div>
      <div>
        <label for="password">Password:</label>
        <input id="password" v-model="password" type="password" />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const router = useRouter();

const handleLogin = () => {
  const hardcodedUsername = 'admin';
  const hardcodedPassword = 'password';
  
  if (username.value === hardcodedUsername && password.value === hardcodedPassword) {
    localStorage.setItem('isAuthenticated', true);
    router.push('/about');
  } else {
    alert('Invalid credentials');
  }
};
</script>

<style>
.about {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 0 auto;
}
</style>
