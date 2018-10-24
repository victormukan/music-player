<template>
  <v-container>
    <v-flex xs12>
      <files-list />
      
      <v-text-field 
        label="Select Audio File" 
        @click="pickFile" 
        v-model="fileName" 
        prepend-icon="attach_file" 
        color="green accent-4"
        class="mt-3">
      </v-text-field>
      
      <input type="file" @change="loadFile" accept=".mp3,audio/*" class="hidden" ref="fileInput">

    </v-flex>
  </v-container>
</template>
<script>
import FilesList from '@/components/FilesList';

export default {
  data() {
    return {
      fileName: ''
    };
  },
  methods: {
    pickFile() {
      this.$refs.fileInput.click();
    },
    getFiles() {
      return this.$store.getters.getAll;
    },
    loadFile(e) {
      if (e.target.files[0]) {
        this.fileName = e.target.files[0].name;
        this.$store.dispatch('addFile', e.target.files[0]);
      }
    },
    clearAll() {
      this.$store.dispatch('deleteAll');
    }
  },
  computed: {
    files() {
      return this.$store.getters.getAll;
    }
  },
  components: {
    'files-list': FilesList
  }
};
</script>
<style scoped>
.hidden {
  display: none
}
</style>

