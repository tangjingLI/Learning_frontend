<template>
  <div>
    <div class="top">
      <a-button
          style=" float:left;margin-top: 5px;background-color: white;color: #1C90F5;border: 1px solid #1C90F5;margin-left: 10px;height: 70%;"
          @click="back">
        <a-icon type="left-circle"/>
        返回
      </a-button>
      <h1> {{ course.name }} </h1>
      <a-button id="edit"
                style=" margin-top: 5px;background-color: white;color: #1C90F5;border: 1px solid #1C90F5;margin-right: 10px;float: right;">
        <a-icon type="setting"/>
        编辑
      </a-button>
    </div>

    <div class="box">
      <div class="content">
        <div class="left">
          <img src="../../assets/course.jpg" id="image">

        </div>

        <div class="right">

        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {getCourseDetail} from "../../api/course";

export default {
  name: "CourseInfo",
  data() {
    return {
      course: {},
      chapters: [],
      abilityList: [],
    }
  },
  methods: {
    async reset() {
      let response = await getCourseDetail(this.$store.getters.getTeacher.id, this.$route.params.courseId)
      this.course = response.course
      this.chapters = response.course_sections
      this.abilityList = response.abilities
    },
    back() {
      this.$router.push('/teacher/courseList')
    }
  },
  mounted() {
    this.reset()
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

.box {
  text-align: center;
  margin-top: 15px;
}

.content {
  border-radius: 10px;
  box-shadow: 2px 2px 10px #939393;
  width: 95%;
  height: 520px;
  margin: 0 auto;
  overflow: auto;
  background-color: white;
  /*text-align: center;*/
}

.left{
  width: 50%;
  height: 100%;
  float: left;
  border-style: solid;
}

#image{
  float: left;
  margin-top: 10px;
  margin-left: 10px;
  height: 150px;
  width: 300px;
}

.right{
  width: 48%;
  height: 95%;
  margin-top: 10px;
  margin-right: 15px;
  float: right;
  border: 2px solid #bdbcbc;
}
</style>