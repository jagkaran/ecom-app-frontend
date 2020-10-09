<template>
  <div>
    <div class="uk-child-width-1-2@m uk-grid">
      <div>
        <div class="uk-card uk-card-default uk-card-small uk-card-body">
          <img
            src="https://static.wixstatic.com/media/002d73_2953dedfe10f4e55870d009d639f991d~mv2.gif"
            height="500"
            width="500"
            class="uk-align-center"
            alt
          />
        </div>
      </div>
      <div>
        <div class="uk-card uk-card-default uk-card-large uk-card-body">
          <form @submit.stop.prevent="handleSubmit">
            <fieldset class="uk-fieldset">
              <legend class="uk-legend">Sign in</legend>

              <div class="uk-margin">
                <label class="uk-form-label" for="form-stacked-text"
                  >Email</label
                >
                <input
                  class="uk-input"
                  v-model="email"
                  type="email"
                  placeholder="Ex: jagkarans43@gmail.com"
                />
              </div>

              <div class="uk-margin">
                <label class="uk-form-label" for="form-stacked-text"
                  >Password</label
                >
                <input class="uk-input" v-model="password" type="password" />
              </div>

              <div class="uk-margin">
                <button
                  class="uk-button uk-button-primary uk-width-1-1"
                  :disabled="loading"
                  type="submit"
                >
                  Submit
                </button>
              </div>

              <div class="uk-margin">
                <p>
                  No account yet?
                  <!-- <router-link :to="{ name: 'users-register' }"
                    >Register</router-link
                  > -->
                  <nuxt-link :to="localePath({ name: 'users-register' })">
                    Register
                  </nuxt-link>
                </p>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import strapi from "~/utils/strapi";

export default {
  data() {
    return {
      title: "Login Now",
      email: "",
      password: "",
      loading: false,
    };
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Order food online :)",
        },
      ],
    };
  },
  methods: {
    async handleSubmit() {
      try {
        this.loading = true;
        const response = await strapi.login(this.email, this.password);
        this.loading = false;
        this.setUser(response.user);
        this.$router.go(-1);
      } catch (err) {
        this.loading = false;
        console.error(err.message);
        alert("An error occurred.");
      }
    },
    ...mapMutations({
      setUser: "auth/setUser",
    }),
  },
};
</script>