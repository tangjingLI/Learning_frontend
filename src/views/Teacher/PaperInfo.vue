<template>
  <div>
    <div class="top">
      <h1>{{ paperTitle }}</h1>
      <p>
        <a-icon type="file-text" theme="twoTone"/>
        试卷总分： {{ score }}
      </p>
      <a-button @click="back(bankId)" class="button">
        <a-icon type="left-circle"/>
        返回试卷列表
      </a-button>
      <a-button class="button">
        <a-icon type="setting"/>
        编辑试卷
      </a-button>
    </div>

    <div class="content" >
      <div v-for="question in questions" class="block">
          <h1>
            {{question.title}}
            <a-tag v-if="question.type==1" color="blue">单选</a-tag>
            <a-tag v-else-if="question.type==2" color="purple">多选</a-tag>
            <a-tag v-else color="pink">简答</a-tag>
          </h1>
          <a-divider />

          <p>
            <a-tag color="orange" class="tag">题目描述</a-tag>
            &emsp;{{question.content}}
          </p>
          <a-divider />

          <p v-for="ch in question.choices">{{ch.number}} {{ch.content}}</p>
          <p style="color: mediumseagreen">正确答案： {{question.answer}}</p>
          <p> 解析： {{question.analysis}}</p>
          <a-divider />

        </div>
      </div>
    </div>
</template>

<script>
import {getPaperDetail} from "../../api/paper";

export default {
  name: "PaperInfo",
  data() {
    return {
      paperTitle: '',
      questions: [],
      score: 0,
      bankId:0
    }
  },
  mounted() {
    let params = this.$route.params;
    let response = getPaperDetail(params.paperId);
    this.paperTitle = response.res.title;
    this.score = response.res.score;
    this.questions = response.res.questions;
    this.bankId=response.res.bankId;
  },
  methods:{
    back(id){
      this.$router.push({name:'paperList',params:{bankId:id}});
    }
  },

}
</script>

<style scoped>
body {
  background-color: #939393;
}

.top {
  height: 75px;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: white;
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

.top p {
  float: left;
  margin-left: 15px;
  clear: both;
}

.button {
  background-color: white;
  color: #1C90F5;
  border: 1px solid #1C90F5;
  margin-right: 10px;
  float: right;
  height: 30px;
}

.content{
  text-align: center;
  height: 500px;
  overflow-y: scroll;
}

.block{
  background-color: white;
  width: 95%;
  text-align: center;
  margin: 0 auto;
  border-radius: 20px;
  /*box-shadow: 0 2px 2px #939393;*/
}

.block h1{
  letter-spacing: 2px;
  font-weight: bold;
  size: 25px;
  color: #6a6868;
}

.block p{
  font-size: 15px;
}

</style>