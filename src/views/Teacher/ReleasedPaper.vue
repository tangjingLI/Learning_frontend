<template>
  <div>
    <div class="top">
      <p>已发布试卷</p>
      <a-button @click="back">返回</a-button>
    </div>

    <div class="content">

    </div>
  </div>
</template>

<script>
export default {
  name: "ReleasedPaper",
  data(){
    return{

    }
  },
  methods:{
    back(){
      this.$router.push({name:'control'})
    },

  },
  mounted() {
  }
}
</script>

<style scoped>
.top {
  height: 40px;
  background-color: white;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
}

.top p {
  float: left;
  margin-left: 15px;
  letter-spacing: 2px;
  font-weight: bold;
  font-size: 15px;
  color: #6a6868;
  margin-top: 5px;
}

.top button {
  margin-top: 5px;
  background-color: white;
  color: #1C90F5;
  border: 1px solid #1C90F5;
  margin-right: 10px;
  float: right;
}

</style>