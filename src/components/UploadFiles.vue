<template>
  <v-container>
    <v-flex xs12>
      <v-data-table :headers="headers" :items="files" class="elevation-5">
        <template slot="items" slot-scope="props">
          <td>{{ props.item.name |  separateFileExtension }}</td>
          <td>{{ (props.item.size /1024 /1024).toFixed(2) }} Mb</td>
          <td>{{ props.item.type }}</td>
          <td class="text-s-right">
            <v-btn icon @click="deleteFile(props.item.id)">
              <v-icon>delete</v-icon>
            </v-btn>
          </td>
        </template>
      </v-data-table>

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
export default {
  data() {
    return {
      fileName: '',
      headers: [
        { text: 'Name', sortable: false },
        { text: 'Size (Mb)', sortable: false },
        { text: 'Type', sortable: false },
        { text: 'Delete', sortable: false }
      ]
    };
  },
  methods: {
    pickFile() {
      this.$refs.fileInput.click();
    },
    loadFile(e) {
      if (e.target.files[0]) {
        this.fileName = e.target.files[0].name;
        this.$store.dispatch('addFile', e.target.files[0]);
      }
    },
    deleteFile(id) {
      this.$store.dispatch('deleteById', id);
    }
  },
  computed: {
    files() {
      return this.$store.getters.getAll;
    }
  }
};
</script>
<style scoped>
.hidden {
  display: none
}
</style>

