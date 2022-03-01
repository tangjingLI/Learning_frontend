<template>
  <div>
    <div>this is detail {{ $route.params.courseId }}</div>
  </div>
</template>

<script>
export default {
  name: "CourseInfo",
  mounted() {
    // console.log("mounted");
    // 一定要使用 this.$nextTick 否则获取不到userID
    this.$nextTick(() => {
      let courseId = this.$route.params.courseId;
      let name = this.$store.getters.getMapTitle[courseId];
      this.$store.commit("addBreadList", {name: name});
    });
  }
}
</script>

<style scoped>

</style>