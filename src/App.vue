<template>
  <div id="app">

    <router-view/>

  </div>
</template>

<script>
export default {
  name: "app",
  mounted() {
    window.addEventListener('unload', this.saveState);
  },
  methods: {
    saveState() {
      sessionStorage.setItem('user', JSON.stringify(this.$store.getters.getTeacher));
    }
  }
}
</script>

<style>

</style>
