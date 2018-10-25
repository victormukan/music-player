<template>
  <div>
    <v-layout align-center justify-center column>
      <span>{{playedItem.name}}</span>
      <audio :src="audioFile" controls ref="audio" class="my-3"/>
    </v-layout>
    <v-data-table :headers="headers" :items="files()" class="elevation-5">
      <template slot="items" slot-scope="props">
          <td>
            <v-btn icon @click="play(props.item)">
              <v-icon>play_circle_outline</v-icon>
            </v-btn>
            <v-btn icon @click="pause">
              <v-icon>pause_circle_outline</v-icon>
            </v-btn>
          </td>
          <td>{{ props.item.name.split('.').slice(0,-1).join('.') }}</td>
      </template>
    </v-data-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      playedItem: { name: '' },
      audioFile: null,
      audioControls: {
        context: null,
        source: null,
        highShelf: null,
        lowShelf: null,
        highPass: null,
        lowPass: null
      },
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
    init() {
      this.audioFile = this.$store.getters.getAll[0].file;
      this.playedItem = this.$store.getters.getAll[0];

      this.audioControls.context = new (window.AudioContext || window.webkitAudioContext)();
      this.audioControls.source = this.audioControls.context.createMediaElementSource(this.$refs.audio);

      this.audioControls.highShelf = this.audioControls.context.createBiquadFilter();
      this.audioControls.lowShelf = this.audioControls.context.createBiquadFilter();
      this.audioControls.highPass = this.audioControls.context.createBiquadFilter();
      this.audioControls.lowPass = this.audioControls.context.createBiquadFilter();

      this.audioControls.source.connect(this.audioControls.highShelf);
      this.audioControls.highShelf.connect(this.audioControls.lowShelf);
      this.audioControls.lowShelf.connect(this.audioControls.highPass);
      this.audioControls.highPass.connect(this.audioControls.lowPass);
      this.audioControls.lowPass.connect(this.audioControls.context.destination);

      this.audioControls.highShelf.type = 'highshelf';
      this.audioControls.highShelf.frequency.value = 4700;
      this.audioControls.highShelf.gain.value = 50;

      this.audioControls.lowShelf.type = 'lowshelf';
      this.audioControls.lowShelf.frequency.value = 220;
      this.audioControls.lowShelf.gain.value = 50;

      this.audioControls.highPass.type = 'highpass';
      this.audioControls.highPass.frequency.value = 800;
      this.audioControls.highPass.Q.value = 0.7;

      this.audioControls.lowPass.type = 'lowpass';
      this.audioControls.lowPass.frequency.value = 880;
      this.audioControls.lowPass.Q.value = 0.7;
    }
  },
  mounted() {
    this.init();
  }
};
</script>
<style scoped>
.centered {
  display: flex;
  float: center;
}
</style>
