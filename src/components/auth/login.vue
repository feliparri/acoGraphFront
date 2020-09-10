<template>
  <q-layout>
  <q-page-container>
    <q-page>
      <div class="row window-height items-center">
        <div class="col-xs-1 col-sm-3 col-md-6 col-lg-8  bg-image window-height"></div>
        <div class="col-xs-11 col-sm-9 col-md-6 col-lg-4 bg-login">
          <div class="login-heading text-center"><img src="../../assets/aco_logo.png" alt=""></div>
          <div class="q-pa-sm" >
            <q-card class="my-card center">
              <q-card-section class="form-label-group">
                <div class="text-center login-heading">
                  <h5>BIENVENIDO</h5>
                </div>
                <div class="text-subtitle2">
                  <q-form action="#" @submit.prevent="login" class="q-gutter-md">
                    <q-input
                      standard
                      v-model="username"
                      label="Usuario"
                      hint="Usuario"
                      lazy-rules
                      :rules="[ val => val && val.length > 0 || 'Please type something']"
                    />
                    <q-input
                      standard
                      type="password"
                      v-model="password"
                      label="Password"
                      hint="Password"
                      lazy-rules
                      :rules="[ val => val && val.length > 0 || 'Please type something']"
                    />
                    <div>
                      <q-btn class="btn-login" v-if="!this.loading" label="INGRESAR" type="submit" color="secondary"/>
                      <q-space />
                      <q-spinner
                        v-if="this.loading"
                        color="primary"
                        size="2em"
                        :thickness="10"
                      />
                    </div>
                  </q-form>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </q-page>
  </q-page-container>
</q-layout>
  <!--<q-layout>
    <q-page-container>
      <q-page class="bg-login window-height window-width row justify-center items-center">
        <div class="column">
          <h2 class="login-heading"><img src="../../assets/logoTammFix.png" alt=""></h2>
          <q-form action="#" @submit.prevent="login" class="q-gutter-md">
            <q-input
              filled
              v-model="username"
              label="Usuario"
              hint="Usuario"
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
          </q-form>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>-->

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
        this.$store.dispatch('reports/getUserData')
          .then(response => {
            this.loading = false
            this.$router.push('/')
          })
      })
    }
  }
}
</script>
<style lang="scss">
/* Change autocomplete styles in WebKit */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  border: none;
  -webkit-text-fill-color: green;
  -webkit-box-shadow: 0 0 0px 1000px #fff inset;
  transition: background-color 5000s ease-in-out 0s;
}
</style>

<style>
.q-card {
  box-shadow: none !important;
}
.my-card {
  width: 100%;
  max-width: 500px;
}
.center {
  margin: auto;
  padding: 10px;
}
.bg-login{
  background-color: white;
}

:root {
  --input-padding-x: 1.5rem;
  --input-padding-y: 0.75rem;
}

.login,
.image {
  min-height: 100vh;
}

.bg-image {
  background-image: url('../../assets/aco_fondo.jpg');
  background-size: cover;
  background-position: center;
  -khtml-opacity:.40;
 -moz-opacity:.40;
 -ms-filter:"alpha(opacity=40)";
  filter:alpha(opacity=40);
  filter: progid:DXImageTransform.Microsoft.Alpha(opacity=0.4);
  opacity:.40;
}

.login-heading {
  font-weight: 300;
}

.btn-login {
  font-size: 0.9rem;
  letter-spacing: 0.05rem;
  padding: 0.75rem 1rem;
  border-radius: 2rem;
}

.form-label-group {
  position: relative;
  margin-bottom: 1rem;
}

.form-label-group>input,
.form-label-group>label {
  padding: var(--input-padding-y) var(--input-padding-x);
  height: auto;
  border-radius: 2rem;
}

.form-label-group>label {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  margin-bottom: 0;
  /* Override default `<label>` margin */
  line-height: 1.5;
  color: #495057;
  cursor: text;
  /* Match the input under the label */
  border: 1px solid transparent;
  border-radius: .25rem;
  transition: all .1s ease-in-out;
}

.form-label-group input::-webkit-input-placeholder {
  color: transparent;
}

.form-label-group input:-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-moz-placeholder {
  color: transparent;
}

.form-label-group input::placeholder {
  color: transparent;
}

.form-label-group input:not(:placeholder-shown) {
  padding-top: calc(var(--input-padding-y) + var(--input-padding-y) * (2 / 3));
  padding-bottom: calc(var(--input-padding-y) / 3);
}

.form-label-group input:not(:placeholder-shown)~label {
  padding-top: calc(var(--input-padding-y) / 3);
  padding-bottom: calc(var(--input-padding-y) / 3);
  font-size: 12px;
  color: #777;
}

/* Fallback for Edge
-------------------------------------------------- */

@supports (-ms-ime-align: auto) {
  .form-label-group>label {
    display: none;
  }
  .form-label-group input::-ms-input-placeholder {
    color: #777;
  }
}

/* Fallback for IE
-------------------------------------------------- */

@media all and (-ms-high-contrast: none),
(-ms-high-contrast: active) {
  .form-label-group>label {
    display: none;
  }
  .form-label-group input:-ms-input-placeholder {
    color: #777;
  }
}
</style>
