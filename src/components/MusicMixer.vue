<template>
  <div>
    <v-layout align-center justify-center column>
      <span>{{playedItem.name}}</span>
      <audio :src="audioFile" controls ref="audio" class="my-3" @pause="getPlayStatus" @play="getPlayStatus"/>
    </v-layout>
    <v-card>
      <v-card-text class="flex-container">
        <div class="control">
          <v-subheader class="title">High shelf</v-subheader>
          <v-slider
            v-model="audioControls.highShelf.frequency.value"
            :max="audioControlsRanges.highShelf.frequency.max"
            :min="audioControlsRanges.highShelf.frequency.min"
            :label="audioControlsRanges.highShelf.frequency.unit"
            :step="1"
            thumb-size="40"
            thumb-label
            color="green"
          ></v-slider>
          <v-slider
            v-model="audioControls.highShelf.gain.value"
            :max="audioControlsRanges.highShelf.gain.max"
            :min="audioControlsRanges.highShelf.gain.min"
            :label="audioControlsRanges.highShelf.gain.unit"
            :step="1"
            thumb-size="40"
            thumb-label
            color="green"
          ></v-slider>
        </div>

        <div class="control">
          <v-subheader class="title">Low shelf</v-subheader>
          <v-slider
            v-model="audioControls.lowShelf.frequency.value"
            :max="audioControlsRanges.lowShelf.frequency.max"
            :min="audioControlsRanges.lowShelf.frequency.min"
            :label="audioControlsRanges.lowShelf.frequency.unit"
            :step="1"
            thumb-size="40"
            thumb-label
            color="green"
          ></v-slider>
          <v-slider
            v-model="audioControls.lowShelf.gain.value"
            :max="audioControlsRanges.lowShelf.gain.max"
            :min="audioControlsRanges.lowShelf.gain.min"
            :label="audioControlsRanges.lowShelf.gain.unit"
            :step="1"
            thumb-size="40"
            thumb-label
            color="green"
          ></v-slider>
        </div>

        <div class="control">
          <v-subheader class="title">High pass</v-subheader>
          <v-slider
            v-model="audioControls.highPass.frequency.value"
            :max="audioControlsRanges.highPass.frequency.max"
            :min="audioControlsRanges.highPass.frequency.min"
            :label="audioControlsRanges.highPass.frequency.unit"
            :step="1"
            thumb-size="40"
            thumb-label
            color="green"
          ></v-slider>
          <v-slider
            v-model="audioControls.highPass.Q.value"
            :max="audioControlsRanges.highPass.Q.max"
            :min="audioControlsRanges.highPass.Q.min"
            :label="audioControlsRanges.highPass.Q.unit"
            :step="0.1"
            thumb-size="40"
            thumb-label
            color="green"
          ></v-slider>
        </div>

        <div class="control">
          <v-subheader class="title">Low pass</v-subheader>
          <v-slider
            v-model="audioControls.lowPass.frequency.value"
            :max="audioControlsRanges.lowPass.frequency.max"
            :min="audioControlsRanges.lowPass.frequency.min"
            :label="audioControlsRanges.lowPass.frequency.unit"
            :step="1"
            thumb-size="40"
            thumb-label
            color="green"
          ></v-slider>
          <v-slider
            v-model="audioControls.lowPass.Q.value"
            :max="audioControlsRanges.lowPass.Q.max"
            :min="audioControlsRanges.lowPass.Q.min"
            :label="audioControlsRanges.lowPass.Q.unit"
            :step="0.1"
            thumb-size="40"
            thumb-label
            color="green"
          ></v-slider>
        </div>
      </v-card-text>
    </v-card>

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
import SoundControls from '@/components/mixins/SoundControls';

export default {
  mixins: [SoundControls],
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
    }
  },
  mounted() {
    this.init();
  }
};
</script>
<style scoped>
.flex-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.control {
  width: 45%;
}
</style>
