<template>
  <q-layout>
    <q-page-container>
      <q-page class="bg-login window-height window-width row justify-center items-center">
        <div class="column">
          <h2 class="login-heading"><img src="../../assets/logoTammFix.png" alt=""></h2>
          <form action="#" @submit.prevent="login">

            <div class="form-control">
              <label for="email">Username/Email</label>
              <input type="email" name="username" id="username" class="login-input" v-model="username">
            </div>

            <div class="form-control mb-more">
              <label for="password">Password</label>
              <input type="password" name="password" id="password" class="login-input" v-model="password">
            </div>

            <div class="form-control">
              <button type="submit" class="btn-submit">Login</button>
            </div>

          </form>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>

</template>

<!-- <form action="#" @submit.prevent="login">

            <div class="form-control">
              <label for="email">Username/Email</label>
              <input type="email" name="username" id="username" class="login-input" v-model="username">
            </div>

            <div class="form-control mb-more">
              <label for="password">Password</label>
              <input type="password" name="password" id="password" class="login-input" v-model="password">
            </div>

            <div class="form-control">
              <button type="submit" class="btn-submit">Login</button>
            </div>

          </form>
-->

<script>
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      this.$store.dispatch('reports/retrieveToken', {
        username: this.username,
        password: this.password
      }).then(response => {
        this.$router.push('/')
      })
    }
  }
}
</script>

<style>
.q-card {
  width: 360px;
}
.bg-login{
  background-color: #473f5d;
}
</style>
