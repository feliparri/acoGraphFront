<template>
  <q-layout>
    <q-page-container>
      <q-page class="bg-login window-height window-width row justify-center items-center">
        <div class="column">
          <h2 class="login-heading"><img src="../../assets/logoTammFix.png" alt=""></h2>
          <q-form action="#" @submit.prevent="login" class="q-gutter-md">
            <q-input
              filled
              v-model="username"
              label="Email"
              hint="Email"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />
            <q-input
              filled
              type="password"
              v-model="password"
              label="Password"
              hint="Password"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />
            <div>
              <q-btn v-if="!this.loading" label="INGRESAR" type="submit" color="primary"/>
              <q-space />
              <q-spinner
                v-if="this.loading"
                color="primary"
                size="2em"
                :thickness="10"
              />
            </div>
            <!-- <div class="form-control">
              <button type="submit" class="btn-submit">Login</button>
              <q-spinner
                v-if="this.loading"
                color="primary"
                size="2em"
                :thickness="10"
              />
            </div> -->

          </q-form>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>

</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      loading: false
    }
  },
  methods: {
    login () {
      this.loading = true
      this.$store.dispatch('reports/retrieveToken', {
        username: this.username,
        password: this.password
      }).then(response => {
        this.loading = false
        this.$router.push('/')
      })
    }
  }
}
</script>

<style>
.bg-login{
  background-color: white;
}
</style>
