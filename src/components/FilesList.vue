<template>
  <v-data-table :headers="headers" :items="files" class="elevation-5">
    <template slot="items" slot-scope="props">
      <td>{{ props.item.name.split('.').slice(0,-1).join('.')}}</td>
      <td>{{ `${parseFloat(props.item.size /1024 /1024).toFixed(2)} Mb`}} </td>
      <td>{{ props.item.type }}</td>
      <td class="text-s-right">
        <v-btn icon @click="deleteFile(props.item.uuid)">
          <v-icon>delete</v-icon>
        </v-btn>
      </td>
    </template>
  </v-data-table>
</template>
<script>
export default {
  data() {
    return {
      headers: [  
        { text: 'Name', sortable: false },
        { text: 'Size (Mb)', sortable: false },
        { text: 'Type', sortable: false },
        { text: 'Delete', sortable: false }
      ]
    };
  },
  methods: {
    deleteFile(uuid) {
      this.$store.dispatch('deleteByUuid', uuid);
    }
  },
  computed: {
    files() {
      return this.$store.getters.getAll;
    }
  }
};
</script>
