<template>
  <div>
    <p>Items</p>
    <ul v-for="item in getFiles()" :key="item.name">
      <li>{{item.name}}</li>
    </ul>
    <input type="file" @change="loadFile" accept=".mp3,audio/*">
    <button @click="clearAll">Clear</button>
  </div>
</template>
<script>

export default {
  methods: {
    getFiles() {
      return this.$store.getters.getAll;
    },
    loadFile(e) {
      if (e.target.files[0]) {
        this.$store.dispatch('addFile', e.target.files[0]);
      }
    },
    clearAll() {
      this.$store.dispatch('clearAll');
    }
  }
};
</script>
