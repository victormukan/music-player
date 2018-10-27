<template>
  <v-app id="app">
    <v-toolbar color="green accent-4">
      <v-toolbar-title class="font-weight-black font-italic display-1">Music player</v-toolbar-title>
    </v-toolbar>

    <v-tabs color="green accent-4" grow show-arrows>
      <v-tabs-slider centered color="black"></v-tabs-slider>

      <v-tab to="/dj-controller">DJ Controller</v-tab>
      <v-tab to="/upload">Upload files</v-tab>
    </v-tabs>

    <router-view/>
  </v-app>
</template>

<script>
export default {
  name: 'App'
};
</script>

