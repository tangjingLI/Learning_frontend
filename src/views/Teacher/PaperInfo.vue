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
      <a-button v-if="status==0" class="button" @click="showUpload">
        <a-icon type="check-circle"/>
        发布试卷
      </a-button>
      <a-tag color="green" v-else style="margin-left: 10px;margin-top: 5px;">已发布</a-tag>
    </div>

    <div class="content">
      <div v-for="question in questions" class="block">
        <h1>
          {{ question.title }}
          <a-tag v-if="question.type==1" color="blue">单选</a-tag>
          <a-tag v-else-if="question.type==2" color="purple">多选</a-tag>
          <a-tag v-else color="pink">简答</a-tag>
        </h1>
        <a-divider/>

        <p>
          <a-tag color="orange" class="tag">题目描述</a-tag>
          &emsp;{{ question.content }}
        </p>
        <a-divider/>

        <p v-for="ch in question.choices">{{ ch.number }} {{ ch.content }}</p>
        <p style="color: mediumseagreen">正确答案： {{ question.answer }}</p>
        <p> 解析： {{ question.analysis }}</p>
        <a-divider/>

      </div>
    </div>

    <a-modal v-model="uploadFlag" title="发布试卷" @ok="upload" @cancel="cancel1">
      <a-form :form="form1" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }"
              style="height: 200px;overflow-y: scroll">

        <a-form-item label="考试简介">
          <a-textarea
              :auto-size="{ minRows: 1, maxRows: 6 }"
              v-decorator="['remark', { rules: [
                  { required: true, message: '不能为空' },
                  {pattern:/^.{1,100}$/,message: '长度为1-50位'}
                  ] }]"
          />
        </a-form-item>

        <a-form-item label="考试时长">
          <a-input
              v-decorator="['time', { rules: [
                  { required: true, message: '不能为空' },
                  {pattern:/^[1-9]\d{0,4}$/,message: '输入长度为1-5位的非0开头的数字'}
                  ] }]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import {getPaperDetail, uploadPaper} from "../../api/paper";

export default {
  name: "PaperInfo",
  data() {
    return {
      paperTitle: '',
      questions: [],
      score: 0,
      bankId: 0,
      status: 0,
      uploadFlag: false,
      form1: this.$form.createForm(this, {name: 'uploadPaper'}),
    }
  },
  mounted() {
    this.reset()
  },
  methods: {
    async reset() {
      let params = this.$route.params;
      let response = await getPaperDetail(params.paperId);
      this.paperTitle = response.res.title;
      this.score = response.res.score;
      this.questions = response.res.questions;
      this.bankId = response.res.bankId;
      this.status = response.res.status;
    },
    back(id) {
      this.$router.push({name: 'paperList', params: {bankId: id}});
    },
    //发布试卷
    showUpload() {
      this.uploadFlag = true;
    },
    upload(e) {
      e.preventDefault();
      this.form1.validateFields(async (err, values) => {
        if (!err) {
          let response = await uploadPaper(this.$route.params.paperId, values.time, values.remark);
          this.uploadFlag = false;
          this.form1.resetFields()
          if (response.code == 0) {
            this.$message.success('发布成功！');
          } else {
            this.$message.error("发布失败")
          }
        }
      })
    },
    cancel1() {
      this.form1.resetFields();
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

.content {
  text-align: center;
  height: 500px;
  overflow-y: scroll;
}

.block {
  background-color: white;
  width: 95%;
  text-align: center;
  margin: 0 auto;
  border-radius: 20px;
  /*box-shadow: 0 2px 2px #939393;*/
}

.block h1 {
  letter-spacing: 2px;
  font-weight: bold;
  size: 25px;
  color: #6a6868;
}

.block p {
  font-size: 15px;
}

</style>