<template>
  <v-container fluid>
    <v-layout row>
      <v-flex lg6>
        <music-mixer class="mx-4"/>
      </v-flex>

      <v-flex lg6>
        <music-mixer class="mx-4"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import MusicMixer from '@/components/MusicMixer';

export default {
  components: {
    'music-mixer': MusicMixer
  }
};
</script>
