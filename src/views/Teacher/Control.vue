<template>
  <div class="control" style=" overflow-y: scroll;">

    <div class="block1">
      <div class="top1">
        <h1>您好！欢迎使用个性化学习过程管理与推荐系统</h1>
        <p style="margin-left: 20px;float: left">教师端控制台</p>
        <p style="float: right;margin-right: 10px">用户： {{ this.$store.getters.getTeacher.phone }}</p>
      </div>

      <div class="top2">
        <div class="func1">
          <a-icon type="carry-out" theme="twoTone" class="icon"/>
          <p>我的课程</p>
          <router-link to="/teacher/courseList">查看>></router-link>
        </div>

        <div class="func1">
          <a-icon type="book" theme="twoTone" class="icon"/>
          <p>我的试卷</p>
          <router-link to="/teacher/paperBank">查看>></router-link>
        </div>

        <div class="func1">
          <a-icon type="control" theme="twoTone" class="icon"/>
          <p>我的题目</p>
          <router-link to="/teacher/testBank">查看>></router-link>
        </div>

        <div class="func1">
          <a-icon type="bulb" theme="twoTone" class="icon"/>
          <p>我的能力</p>
          <router-link to="/teacher/knowledge">查看>></router-link>
        </div>

        <div class="func1">
          <a-icon type="crown" theme="twoTone" class="icon"/>
          <p>已发布试卷</p>
          <router-link to="/teacher/releasedPaper">查看>></router-link>
        </div>
      </div>
    </div>

    <div class="block2">
      <p>最近删除</p>

      <div class="func2">
        <a-icon type="rest" theme="twoTone" class="icon"/>
        <p>题目回收站</p>
        <router-link to="/teacher/testBin">查看>></router-link>
      </div>

      <div class="func2">
        <a-icon type="rest" theme="twoTone" class="icon"/>
        <p>题库回收站</p>
        <router-link to="/teacher/testBankBin">查看>></router-link>
      </div>

      <!--      <div class="func2">-->
      <!--        <a-icon type="rest" theme="twoTone" class="icon"/>-->
      <!--        <p>试卷回收站</p>-->
      <!--        <router-link to="">查看>></router-link>-->
      <!--      </div>-->

      <!--      <div class="func2">-->
      <!--        <a-icon type="rest" theme="twoTone" class="icon"/>-->
      <!--        <p>试卷库回收站</p>-->
      <!--        <router-link to="">查看>></router-link>-->
      <!--      </div>-->
    </div>

    <div class="block3">
      <div class="top3">
        <h1>课程参与情况</h1>
      </div>

      <div class="echart" id="mychart"></div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import {baseUrls} from "../../api/baseUrl";
import * as echarts from "echarts";

export default {
  name: "Control",
  data() {
    return {
      items: [],
      xData: [],
      yData: [],
      fData:[],
    }
  },
  methods: {
    async getData(){
      axios.get(`${baseUrls.score}/courseData/data/1`, {
        params: {
          user_id: this.$store.getters.getTeacher.id
        }
      }).then(res => {
        this.items = res.data.data.courseData
        this.xData=res.data.data.name
        this.fData=res.data.data.finishedNumberOfPeople
        this.yData=res.data.data.selectNumberOfPeople
        this.initEcharts()
      })
    },
    async reset() {
      await this.getData()
    },
    initEcharts() {
      const option = {
        xAxis: {
          data: this.xData
        },
        legend: {
          data: ["选课人数", "结课人数"],
          bottom: "0%"
        },
        yAxis: {},
        series: [
          {
            name: "选课人数",
            data: this.yData,
            type: "line",
            label: {
              show: false,
              position: "top",
              textStyle: {
                fontSize: 12
              }
            }
          },
          {
            name: "结课人数",
            data: this.fData,
            type: "line",
            label: {
              show: false,
              position: "bottom",
              textStyle: {
                fontSize: 12
              }
            }
          }
        ]
      };
      this.myChart = echarts.init(document.getElementById("mychart"));
      this.myChart.setOption(option);

      // window.addEventListener("resize", () => {
      //   this.myChart.resize();
      // });
    },
  },
  mounted() {
    this.reset()
  }
}
</script>

<style scoped>
body {
  background-color: #939393;
}

.top1 {
  width: 100%;
  margin: 10px 0;
  height: 100px;
  /*background-color: #23B5F7;*/
  background-image: linear-gradient(to bottom right, #23B5F7, #7ad2fc);
  box-shadow: 0 2px 2px #939393;
  padding: 10px;
}

.top1 h1 {
  color: white;
  letter-spacing: 2px;
  font-weight: bold;
  font-size: 20px;
  margin-left: 20px;
  margin-top: 10px;
}

.top1 p {
  color: white;
  letter-spacing: 2px;

}

.top2 {
  width: 100%;
  height: 300px;
  box-shadow: 0 2px 2px #939393;
  background-color: white;
}

.block1 {
  width: 60%;
  float: left;
  margin: 10px 10px;
}

.block2 {
  width: 35%;
  height: 420px;
  margin: 10px 10px;
  box-shadow: 0 2px 2px #939393;
  background-color: white;
  float: left;
}

.block3 {
  box-shadow: 0 2px 2px #939393;
  background-color: white;
  width: 97%;
  height: 500px;
  float: left;
  margin: 10px 10px;
  overflow-x: scroll;
}

.icon {
  font-size: 30px;
  float: left;
  margin-left: 25px;
  margin-top: 10px;
}

.func1 {
  height: 30%;
  width: 45%;
  margin-left: 20px;
  float: left;
}

.func1 p {
  float: left;
  margin-top: 15px;
  margin-left: 15px;
  font-size: 15px;
  letter-spacing: 2px;
  color: #6a6868;
  font-weight: bold;
}

.func1 a {
  float: right;
  margin-top: 15px;
  margin-right: 30px;
}

.block2 p,.top3 h1 {
  margin-top: 15px;
  margin-left: 15px;
  font-size: 15px;
  letter-spacing: 2px;
  color: #6a6868;
  font-weight: bold;
}

.func2 {
  width: 100%;
  height: 20%;
}

.func2 p {
  float: left;
  margin-top: 15px;
  margin-left: 15px;
  font-size: 15px;
  letter-spacing: 2px;
  color: #6a6868;
  font-weight: bold;
}

.func2 a {
  float: right;
  margin-top: 15px;
  margin-right: 100px;
}

#mychart{
  width: 100%;
  height:400px;
  margin: 0 auto;
}

</style>