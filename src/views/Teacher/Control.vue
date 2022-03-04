<template>
  <div class="control" style=" overflow-y: scroll;">

    <div class="block1">
      <div class="top1">
        <h1>您好！欢迎使用个性化学习过程管理与推荐系统</h1>
        <p style="margin-left: 20px;float: left">教师端控制台</p>
        <p style="float: right;margin-right: 10px">用户： {{this.$store.getters.getTeacher.phone}}</p>
      </div>

      <div class="top2">

      </div>
    </div>

    <div class="block2">

    </div>

    <div class="block3">

    </div>
  </div>
</template>

<script>
export default {
  name: "Control"
}
</script>

<style scoped>
body {
  background-color: #939393;
}

.top1{
  width: 100%;
  margin: 10px 0;
  height: 100px;
  /*background-color: #23B5F7;*/
  background-image: linear-gradient( to bottom right, #23B5F7, #7ad2fc);
  box-shadow: 0 2px 2px #939393;
  padding: 10px;
}

.top1 h1{
  color: white;
  letter-spacing: 2px;
  font-weight: bold;
  font-size: 20px;
  margin-left: 20px;
  margin-top: 10px;
}

.top1 p{
  color: white;
  letter-spacing: 2px;

}

.top2{
  width: 100%;
  height: 300px;
  box-shadow: 0 2px 2px #939393;
  background-color: white;
}

.block1{
  width: 60%;
  float: left;
  margin: 10px 10px;
}

.block2{
  width: 35%;
  height: 420px;
  margin: 10px 10px;
  box-shadow: 0 2px 2px #939393;
  background-color: white;
  float: left;
}

.block3{
  box-shadow: 0 2px 2px #939393;
  background-color: white;
  width: 97%;
  height: 600px;
  float: left;
  margin: 10px 10px;
}
</style>