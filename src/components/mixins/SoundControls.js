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
