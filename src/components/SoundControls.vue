<template>
  <v-card>
    <v-card-text class="flex-container">
      <div class="control">
        <v-subheader>High shelf</v-subheader>
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
</template>
<script>
export default {
  data() {
    return {
      audioControls: {
        context: null,
        source: null,
        highShelf: {
          frequency: { value: 4700 },
          gain: { value: 50 }
        },
        lowShelf: {
          frequency: { value: 35 },
          gain: { value: 50 }
        },
        highPass: {
          frequency: { value: 800 },
          Q: { value: 0.7 }
        },
        lowPass: {
          frequency: { value: 800 },
          Q: { value: 0.7 }
        }
      },
      audioControlsRanges: {
        highShelf: {
          frequency: { min: 4700, max: 22000, unit: 'Hz' },
          gain: { min: -50, max: 50, unit: 'dB' }
        },
        lowShelf: {
          frequency: { min: 35, max: 220, unit: 'Hz' },
          gain: { min: -50, max: 50, unit: 'dB' }
        },
        highPass: {
          frequency: { min: 800, max: 5900, unit: 'Hz' },
          Q: { min: 0.7, max: 12, unit: 'Q' }
        },
        lowPass: {
          frequency: { min: 80, max: 1600, unit: 'Hz' },
          Q: { min: 0.7, max: 12, unit: 'Q' }
        }
      }
    };
  },
  methods: {
    init(audioFile) {
      this.audioControls.context = new (window.AudioContext || window.webkitAudioContext)();
      this.audioControls.source = this.audioControls.context.createMediaElementSource(audioFile);

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
      this.audioControls.lowShelf.frequency.value = 35;
      this.audioControls.lowShelf.gain.value = 50;

      this.audioControls.highPass.type = 'highpass';
      this.audioControls.highPass.frequency.value = 800;
      this.audioControls.highPass.Q.value = 0.7;

      this.audioControls.lowPass.type = 'lowpass';
      this.audioControls.lowPass.frequency.value = 880;
      this.audioControls.lowPass.Q.value = 0.7;
    }
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
