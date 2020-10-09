<template>
  <div>
    <div class="uk-child-width-1-2@m uk-grid">
      <div>
        <div class="uk-card uk-card-default uk-card-small uk-card-body">
          <img
            src="https://data.whicdn.com/images/293246292/original.gif"
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
              <legend class="uk-legend">Register</legend>

              <div class="uk-margin">
                <label class="uk-form-label">Username</label>
                <div class="uk-inline">
                  <span class="uk-form-icon" uk-icon="user"></span>
                  <input
                    class="uk-input"
                    v-model="username"
                    type="text"
                    placeholder="Ex: jagkaran"
                  />
                </div>
              </div>

              <div class="uk-margin">
                <label class="uk-form-label" for="form-stacked-text"
                  >Email</label
                >
                <div class="uk-inline">
                  <span class="uk-form-icon" uk-icon="icon: mail"></span>
                  <input
                    class="uk-input"
                    v-model="email"
                    type="email"
                    placeholder="Ex: jagkarans43@gmail.com"
                  />
                </div>
              </div>

              <div class="uk-margin">
                <label class="uk-form-label" for="form-stacked-text"
                  >Password</label
                >
                <div class="uk-inline">
                  <span class="uk-form-icon" uk-icon="lock"></span>
                  <input class="uk-input" v-model="password" type="password" />
                </div>
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
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Import mapMutations in order to call mutations from your store
import { mapMutations } from "vuex";
import strapi from "~/utils/strapi";

export default {
  data() {
    return {
      title: "Register Online",
      email: "",
      password: "",
      username: "",
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
    // Method that will register your users
    async handleSubmit() {
      try {
        this.loading = true;
        const response = await strapi.register(
          this.username,
          this.email,
          this.password
        );
        this.loading = false;
        // Call your setUser mutation from your auth.js store file
        this.setUser(response.user);
        this.$router.go(-1);
      } catch (err) {
        this.loading = false;
        alert(err.message || "An error occurred.");
      }
    },
    // Define all your needed mutations, here: auth/setUser
    ...mapMutations({
      setUser: "auth/setUser",
    }),
  },
};
</script>