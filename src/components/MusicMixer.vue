<template>
  <div>
    <audio :src="audioFile" controls  ref="audio"></audio>
    <ul v-for="item in getFiles()" :key="item.uuid">
      <li>{{item}}</li>
      <button @click="play(item.uuid)">Play</button>
      <button @click="pause">Pause</button>
    </ul>
    <span>{{playerInfo}}</span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      audioFile: null,
      audioControls: {
        context: null,
        source: null,
        highShelf: null,
        lowShelf: null,
        highPass: null,
        lowPass: null
      }
    };
  },
  methods: {
    init() {
      this.audioFile = this.$store.getters.getAll[0].url;

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
      this.audioControls.highShelf.gain.value = 0;

      this.audioControls.lowShelf.type = 'lowshelf';
      this.audioControls.lowShelf.frequency.value = 220;
      this.audioControls.lowShelf.gain.value = 50;

      this.audioControls.highPass.type = 'highpass';
      this.audioControls.highPass.frequency.value = 800;
      this.audioControls.highPass.Q.value = 0.7;

      this.audioControls.lowPass.type = 'lowpass';
      this.audioControls.lowPass.frequency.value = 880;
      this.audioControls.lowPass.Q.value = 0.7;
    },
    getFiles() {
      return this.$store.getters.getAll;
    },
    play(uuid) {
      this.audioFile = this.$store.getters.getByUuid(uuid).url;
      setImmediate(() => this.$refs.audio.play());
    },
    pause() {
      this.$refs.audio.pause();
      console.log(this.$refs.audio.currentTime, this.$refs.audio.duration)
    },
  },
  mounted() {
    this.init();
  }
};
</script>
<style>
.invisible {
  display:none;
}
</style>
