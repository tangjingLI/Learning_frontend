<template>
  <div>
    <div class="top">
      <a-button
          style=" float:left;margin-top: 5px;background-color: white;color: #1C90F5;border: 1px solid #1C90F5;margin-left: 10px;height: 70%;"
          @click="back">
        <a-icon type="left-circle"/>
        返回
      </a-button>
      <h1> 课程详情 </h1>
      <a-button id="edit"
                style=" margin-top: 5px;background-color: white;color: #1C90F5;border: 1px solid #1C90F5;margin-right: 10px;float: right;">
        <a-icon type="setting"/>
        编辑
      </a-button>
    </div>

    <div class="box">
      <div class="content">

      </div>
    </div>
  </div>
</template>

<script>
import {getCourseDetail} from "../../api/course";

export default {
  name: "CourseInfo",
  data(){
    return{

    }
  },
  methods:{
    back(){
      this.$router.push('/teacher/courseList')
    }
  },
  mounted() {
    let response=getCourseDetail(this.$store.getters.getTeacher.id,this.$route.params.courseId)
  },

}
</script>

<style scoped>
.top {
  height: 40px;
  background-color: white;
  margin-top: 10px;
}

.top h1 {
  float: left;
  margin-left: 15px;
  letter-spacing: 2px;
  font-weight: bold;
  size: 10px;
  color: #6a6868;
  margin-top: 5px;
}

.box{
  text-align: center;
  margin-top: 15px;
}

.content{
  border-radius: 10px;
  box-shadow: 2px 2px 10px #939393;
  width: 95%;
  height: 520px;
  margin: 0 auto;
  overflow: auto;
  background-color: white;
  text-align: center;
}
</style>