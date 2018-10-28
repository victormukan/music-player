<template>
  <div>
    <v-layout align-center justify-center column>
      <span>{{playedItem.name}}</span>
      <audio :src="audioFile" controls ref="audio" class="my-3" @pause="getPlayStatus" @play="getPlayStatus"/>
    </v-layout>

    <sound-controls ref="soundControls"/>

    <v-data-table :headers="headers" :items="files()" class="elevation-5">
      <template slot="items" slot-scope="props">
          <td>
            <v-btn v-if="!(!isPaused && playedItem.id === props.item.id)" icon @click="play(props.item)">
              <v-icon>play_circle_outline</v-icon>
            </v-btn>
            <v-btn v-if="!isPaused && playedItem.id === props.item.id" icon @click="pause">
              <v-icon>pause_circle_outline</v-icon>
            </v-btn>
          </td>
          <td>{{ props.item.name.split('.').slice(0,-1).join('.') }}</td>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import SoundControls from '@/components/SoundControls';

export default {
  data() {
    return {
      isPaused: true,
      playedItem: { name: '' },
      audioFile: null,
      headers: [
        { text: 'Play', sortable: false },
        { text: 'Name', sortable: false }
      ]
    };
  },
  methods: {
    files() {
      return this.$store.getters.getAll;
    },
    play(item) {
      this.playedItem = item;
      this.audioFile = item.file;
      setImmediate(() => this.$refs.audio.play());
    },
    pause() {
      this.$refs.audio.pause();
    },
    getPlayStatus() {
      this.isPaused = this.$refs.audio.paused;
    },
    init() {
      this.audioFile = this.$store.getters.getAll[0].file;
      this.playedItem = this.$store.getters.getAll[0];

      this.$refs.soundControls.init(this.$refs.audio);
    }
  },
  mounted() {
    this.init();
  },
  components: {
    'sound-controls': SoundControls
  }
};
</script>
