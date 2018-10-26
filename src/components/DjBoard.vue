<template>
  <div class="flex-container">
    <music-mixer class="half-size"/>
    <music-mixer class="half-size"/>
  </div>
</template>
<script>
import MusicMixer from '@/components/MusicMixer';

export default {
  components: {
    'music-mixer': MusicMixer
  }
};
</script>
<style scoped>
.flex-container {
  display: flex;
  justify-content: space-around;
}
.half-size {
  margin-top: 3%;
  width: 45%;
}
</style>

