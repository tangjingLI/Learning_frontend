<template>
  <div>
    <div class="top">
      <h1>{{ paperTitle }}</h1>
      <a-tag v-if="this.isPublic==0" color="green" style="margin-left: 5px;margin-top: 8px">public</a-tag>
      <a-tag v-else color="orange" style="margin-left: 5px;margin-top: 8px">private</a-tag>
      <p>
        <a-icon type="file-text" theme="twoTone"/>
        试卷总分： {{ score }}
      </p>
      <a-button @click="back(bankId)" class="button">
        <a-icon type="left-circle"/>
        返回试卷列表
      </a-button>
      <a-button class="button" @click="showEdit">
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

        <p>
          <a-tag color="orange" class="tag">题目描述</a-tag>
          &emsp;{{ question.content }}
        </p>

        <p v-for="ch in question.choices">{{ ch.number }} {{ ch.content }}</p>
        <p style="color: mediumseagreen">正确答案： {{ question.answer }}</p>
        <p> 解析： {{ question.analysis }}</p>

        <p style="font-size: 12px">
          正确率： {{ question.rate*100 }}%
          <a-divider type="vertical"/>
          预计耗时： {{ question.consume }} 分钟
          <a-divider type="vertical"/>
          分值：{{question.score}}
          <a-divider type="vertical"/>
          使用次数：{{question.frequency}} 次

        </p>
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

    <a-modal v-model="editFlag" title="编辑试卷" @ok="editPaperItem">
      <a-form :form="form2" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-form-item label="试卷名">
          <a-input
              v-decorator="['title', { rules: [
                  { required: true, message: '不能为空' },
                  {pattern:/^.{2,8}$/,message: '试卷名长度为2-8位'}
                  ] }]"
          />
        </a-form-item>
        <a-form-item label="状态">
          <a-radio-group name="radioGroup"
                         v-decorator="['isPublic',{rules:[{required: true,message:'不能为空'}]}]">
            <a-radio :value="0">
              public
            </a-radio>
            <a-radio :value="1">
              private
            </a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import {getPaperDetail, uploadPaper, editPaper} from "../../api/paper";

export default {
  name: "PaperInfo",
  data() {
    return {
      paperTitle: '',
      questions: [],
      score: 0,
      bankId: 0,
      status: 0,
      isPublic: 0,
      uploadFlag: false,
      editFlag: false,
      form1: this.$form.createForm(this, {name: 'uploadPaper'}),
      form2: this.$form.createForm(this, {name: 'editPaper'}),

    }
  },
  mounted() {
    this.reset()
  },
  methods: {
    //编辑试卷
    setForm() {
      this.$nextTick(() => {
        this.form2.setFieldsValue({
          title: this.paperTitle,
          isPublic: this.isPublic
        })
      })
    },
    showEdit() {
      this.editFlag = true
      this.setForm()
    },
    editPaperItem(e) {
      e.preventDefault();
      this.form2.validateFields(async (err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          let response = await editPaper(this.$route.params.paperId, values.title, values.isPublic);
          this.editFlag = false
          console.log("edit", response)
          if (response.code == 0) {
            this.$message.success('编辑成功！')
            await this.reset()
          } else {
            this.$message.error("编辑失败")
          }
        }
      })
    },

    async reset() {
      let params = this.$route.params
      let response = await getPaperDetail(params.paperId)
      console.log("info", response)
      this.paperTitle = response.data.paperName
      this.score = response.data.totalScore
      this.questions = response.data.questions
      this.bankId = response.data.papersId
      this.status = response.data.status
      this.isPublic = response.data.isPublic
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
  /*text-align: center;*/
  height: 500px;
  margin-left: 10px;
  margin-right: 5px;
  background-color: white;
  overflow-y: scroll;
}

.block {
  background-color: white;
  width: 100%;
  padding-top: 10px;
  /*text-align: center;*/
  /*margin: 0 auto;*/
  /*border-radius: 20px;*/
  /*box-shadow: 2px 2px 4px #939393;*/
}

.block h1 {
  letter-spacing: 2px;
  font-weight: bold;
  margin-bottom: 20px;
  size: 25px;
  color: #6a6868;
  margin-left: 50px;
}

.block p {
  font-size: 15px;
  margin-left: 50px;
  margin-right: 50px;
}

</style>