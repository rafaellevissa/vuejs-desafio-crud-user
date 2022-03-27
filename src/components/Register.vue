<template>
  <v-app>
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>{{ $t("SIGNUP.TITLE") }}</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <form ref="form" @submit.prevent="register()">
                  <v-text-field
                    v-model="form.name"
                    name="name"
                    :label="$t('SIGNUP.FIELDS.NAME')"
                    type="text"
                  ></v-text-field>
                  <div v-if="errors.name" class="red--text">
                    {{ errors.name }}
                  </div>
                  <v-text-field
                    v-model="form.username"
                    name="username"
                    :label="$t('SIGNUP.FIELDS.USERNAME')"
                    type="text"
                  ></v-text-field>
                  <div v-if="errors.username" class="red--text">
                    {{ errors.username }}
                  </div>
                  <v-text-field
                    v-model="form.password"
                    name="password"
                    :label="$t('SIGNUP.FIELDS.PASSWORD')"
                    type="password"
                  ></v-text-field>
                  <div v-if="errors.password" class="red--text">
                    {{ errors.password }}
                  </div>
                  <v-text-field
                    v-model="form.confirmPassword"
                    name="confirmPassword"
                    :label="$t('SIGNUP.FIELDS.CONFIRM_PASSWORD')"
                    type="password"
                  ></v-text-field>
                  <div v-if="errors.confirmPassword" class="red--text">
                    {{ errors.confirmPassword }}
                  </div>
                  <v-btn
                    type="submit"
                    class="mt-4"
                    color="primary"
                    :loading="$store.state.auth.submitting"
                    value="log in"
                    >{{ $t("SIGNUP.SUBMIT") }}</v-btn
                  >
                  <div class="grey--text mt-4" v-on:click="login()">
                    {{ $t("SIGNUP.LOGIN_ACCOUNT") }}
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
import SignupValidationSchema from "../validations/signup";

export default {
  name: "RegisterPage",
  data() {
    return {
      form: {
        name: "",
        username: "",
        password: "",
        confirmPassword: "",
      },
      errors: {
        name: "",
        username: "",
        password: "",
        confirmPassword: "",
      },
    };
  },
  methods: {
    register() {
      SignupValidationSchema.validate(this.form, { abortEarly: false })
        .then(() => {
          this.errors = {};
          this.$store.dispatch("signup", this.form);
        })
        .catch((errors) => {
          errors.inner.forEach((error) => {
            this.errors[error.path] = error.message;
          });
        });
    },
    login() {
      this.$router.push("/");
    },
  },
};
</script>
