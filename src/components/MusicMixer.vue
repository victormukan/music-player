<template>
  <div>
    <audio :src="audioFile" controls></audio>
    <ul v-for="item in getFiles()" :key="item">
      <li>{{item}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fileUrl: null
    };
  },
  methods: {
    getFiles() {
      return this.$store.getters.getAll;
    }
  },
  computed: {
    audioFile() {
      return this.getFiles()[0].url;
    }
  }
};
</script>
