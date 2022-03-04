<template>
  <div>
    <div class="top">
      <a-button
          style=" float:left;margin-top: 5px;background-color: white;color: #1C90F5;border: 1px solid #1C90F5;margin-left: 10px;height: 70%;"
          @click="back(question.bankId)">
        <a-icon type="left-circle" />
        返回
      </a-button>
      <h1> 题目详情 </h1>
      <a-button id="edit"
                style=" margin-top: 5px;background-color: white;color: #1C90F5;border: 1px solid #1C90F5;margin-right: 10px;float: right;">
        <a-icon type="setting"/>
        编辑
      </a-button>
    </div>

    <div class="box">
      <div class="content">

        <div class="block" style="margin-top: 35px;">
          <h1>
            {{question.title}}
            <a-tag v-if="question.type==1" color="blue">单选</a-tag>
            <a-tag v-else-if="question.type==2" color="purple">多选</a-tag>
            <a-tag v-else color="pink">简答</a-tag>
          </h1>
          <a-divider />
        </div>

        <div class="block">
          <p>
            <a-tag color="orange" class="tag">题目描述</a-tag>
            &emsp;{{question.content}}
          </p>
          <a-divider />
        </div>

        <div class="block">
          <p v-for="ch in choices">{{ch.number}} {{ch.content}}</p>
          <p style="color: mediumseagreen">正确答案： {{question.answer}}</p>
          <p> 解析： {{question.analysis}}</p>
          <a-divider />
        </div>

        <div class="block">
          <p>
            正确率： {{question.rate}}
            <a-divider type="vertical" />
            预计耗时： {{question.consume}}  分钟
          </p>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import {getTestDetail} from "../../api/test";

export default {
  name: "TestInfo",
  data() {
    return {
      question: {},
      choices: [],
      knowledge: [],
    }
  },
  methods: {
    back(id) {
      this.$router.push({name: 'testList', params: {bankId: id}})
    }
  },
  mounted() {
    let params = this.$route.params;
    let response = getTestDetail(params.testId);
    this.question = response.question;
    this.choices = response.choices;
    this.knowledge = response.knowledges;
  }
}
</script>

<style scoped>
body {
  background-color: #939393;
}

.top {
  height: 40px;
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
  size: 20px;
  color: #6a6868;
  margin-top: 5px;
}

.box{
  text-align: center;
}

.content{
  border-radius: 70px;
  box-shadow: 2px 2px 10px #939393;
  width: 90%;
  height: 520px;
  margin: 0 auto;
  overflow: auto;
  background-color: white;
  /*display: flex;*/
  /*justify-content: center;*/
  /*align-items: center;*/
  text-align: center;
}

.block{
  width: 80%;
  /*border: 1px solid black;*/
  margin: 0 auto;
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

.tag{
  font-size: 15px;
}
</style>