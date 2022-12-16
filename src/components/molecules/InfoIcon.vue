<template>
<div v-tooltip="item">
    <svg v-if="!outline" xmlns="http://www.w3.org/2000/svg" :fill="color" viewBox="0 0 30 30" :width="width" :height="height">    <path d="M15,3C8.373,3,3,8.373,3,15c0,6.627,5.373,12,12,12s12-5.373,12-12C27,8.373,21.627,3,15,3z M16,21h-2v-7h2V21z M15,11.5 c-0.828,0-1.5-0.672-1.5-1.5s0.672-1.5,1.5-1.5s1.5,0.672,1.5,1.5S15.828,11.5,15,11.5z"/></svg>
    <svg v-else xmlns="http://www.w3.org/2000/svg" :fill="color" viewBox="0 0 24 24" :width="width" :height="height">    <path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 7 L 11 9 L 13 9 L 13 7 L 11 7 z M 11 11 L 11 17 L 13 17 L 13 11 L 11 11 z"/></svg>
</div>
</template>
<script>
export default {
  name: "Infoicon",
  props: {
     width: {
         type: String,
         default: '30px'
     },
     height: {
         type: String,
         default: '30px'
     },
     color: {
         type: String,
         default: "#000000"
     },
     outline: {
         type: Boolean,
         default: false
     },
     item:{
         type: String,
         default: ''
     }
  },
};
</script>