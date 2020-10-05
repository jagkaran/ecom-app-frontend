<template>
  <div>
    <!-- Displays page Title and Description -->
    <div v-for="contents in content" :key="contents.id">
      <h1
        class="uk-heading uk-text-center uk-text-uppercase"
        v-html="contents.Title"
      />
      <h2 class="uk-text-lead uk-text-center" v-html="contents.Description" />
    </div>
  </div>
</template>
<script>
export default {
  // content is query data from parent page
  // title is the page title of parent page
  props: ["content", "title"],
};
</script>
