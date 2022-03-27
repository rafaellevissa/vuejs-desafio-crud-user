<template>
  <v-app>
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>{{ $t("LOGIN.TITLE") }}</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <form ref="form" @submit.prevent="login()">
                  <v-text-field
                    v-model="form.username"
                    name="username"
                    v-bind:label="$t('LOGIN.FIELDS.USERNAME')"
                    type="text"
                  ></v-text-field>
                  <div v-if="errors.username" class="red--text">
                    {{ errors.username }}
                  </div>

                  <v-text-field
                    v-model="form.password"
                    name="password"
                    v-bind:label="$t('LOGIN.FIELDS.PASSWORD')"
                    type="password"
                  ></v-text-field>
                  <div v-if="errors.password" class="red--text">
                    {{ errors.password }}
                  </div>

                  <v-btn
                    type="submit"
                    class="mt-4"
                    color="primary"
                    :loading="$store.state.auth.submitting"
                    >{{ $t("LOGIN.SUBMIT") }}</v-btn
                  >
                  <div class="grey--text mt-4" v-on:click="register()">
                    {{ $t("LOGIN.NEW_ACCOUNT") }}
                  </div>
                </form>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import LoginValidationSchema from "../validations/login";

export default {
  name: "LoginPage",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      errors: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      LoginValidationSchema.validate(this.form, { abortEarly: false })
        .then(() => {
          this.loginLoading = true;
          this.errors = {};
          this.$store.dispatch("login", this.form);
        })
        .catch((errors) => {
          errors.inner.forEach((error) => {
            this.errors[error.path] = error.message;
          });
        });
    },
    register() {
      this.$router.push("/register");
    },
  },
};
</script>
