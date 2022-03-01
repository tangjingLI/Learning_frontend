<template>
  <div>
    <div>课程列表</div>
    <button @click="goDetail(1)">课程详情</button>
  </div>

</template>

<script>
export default {
  name: "Course",
  methods:{
    goDetail(id){
      // console.log('this')
      let obj={1:'数据库'}
      this.$store.commit("saveMapTitle",obj)
      this.$router.push({path:`/teacher/courseInfo/${id}`})
    },
    // goDetail(row){
    //   this.$router.push({path:`/industry/dataAccount/Day/${row.id}`})
    //   let obj={[row.id]:row.name}
    //   console.log(obj)
    //   this.$store.commit("saveMapTitle",obj)
    // },
  }
}
</script>

<style scoped>

</style>