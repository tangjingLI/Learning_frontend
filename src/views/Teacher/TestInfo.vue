<template>
  <div>
    <div class="top">
      <a-button
          style=" float:left;margin-top: 5px;background-color: white;color: #1C90F5;border: 1px solid #1C90F5;margin-left: 10px;height: 70%;"
          @click="back(question.bankId)">
        <a-icon type="left-circle"/>
        返回
      </a-button>
      <h1> 题目详情 </h1>
      <a-button id="edit" @click="showEdit"
                style=" margin-top: 5px;background-color: white;color: #1C90F5;border: 1px solid #1C90F5;margin-right: 10px;float: right;">
        <a-icon type="setting"/>
        编辑
      </a-button>
    </div>

    <div class="box">
      <div class="content">

        <div class="block" style="margin-top: 35px;">
          <h1>
            {{ question.title }}
            <a-tag v-if="question.type==1" color="blue">单选</a-tag>
            <a-tag v-else-if="question.type==2" color="purple">多选</a-tag>
            <a-tag v-else color="pink">简答</a-tag>
          </h1>
          <a-divider/>
        </div>

        <div class="block">
          <p>
            <a-tag color="orange" class="tag">题目描述</a-tag>
            &emsp;{{ question.content }}
          </p>
          <a-divider/>
        </div>

        <div class="block">
          <p v-for="ch in choices">{{ ch.number }} {{ ch.content }}</p>
          <p style="color: mediumseagreen">正确答案： {{ question.answer }}</p>
          <p> 解析： {{ question.analysis }}</p>
          <a-divider/>
        </div>

        <div class="block">
          <p>
            正确率： {{ question.rate }}
            <a-divider type="vertical"/>
            预计耗时： {{ question.consume }} 分钟
          </p>
        </div>

      </div>
    </div>

    <a-modal v-model="showEditFlag" title="修改题目" @ok="editTestItem">
      <a-form :form="form1" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }"
              style="height: 350px;overflow-y: scroll">
        <a-form-item label="题目标题">
          <a-input
              v-decorator="['title', { rules: [
                  { required: true, message: '不能为空' },
                  {pattern:/^.{2,8}$/,message: '题目标题长度为2-8位'}
                  ] }]"
          />
        </a-form-item>

        <a-form-item label="题目内容">
          <a-textarea
              :auto-size="{ minRows: 1, maxRows: 6 }"
              v-decorator="['content', { rules: [
                  { required: true, message: '不能为空' },
                  {pattern:/^.{1,100}$/,message: '题目内容长度为1-100位'}
                  ] }]"
          />
        </a-form-item>

        <a-form-item label="题目类型">
          <a-radio-group name="testType"
                         v-decorator="['type',{rules:[
                             { required: true, message: '不能为空' }
                             ]}]">
            <a-radio :value="1" @click="()=>{this.testType=1;}">
              单选
            </a-radio>
            <a-radio :value="2" @click="()=>{this.testType=2;}">
              多选
            </a-radio>
            <a-radio :value="3" @click="()=>{this.testType=0;}">
              简答
            </a-radio>
          </a-radio-group>
        </a-form-item>

        <div v-if="testType==1||testType==2" v-for="(choice,index) in choose" class="choice">
          <a-form-item>
            <p>选项{{ choice.number }}&emsp;</p>
            <a-input style="float: left;width: 240px"
                     v-decorator="[choice.number, { rules: [
                          {pattern:/^.{1,12}$/,message: '答案长度为1-12位'}
                          ] }]"
            />
          </a-form-item>
        </div>

        <a-form-item v-if="testType==1||testType==2">
          <a-button @click="addChoice" id="btn1">
            <a-icon type="plus-circle" theme="twoTone"/>
            添加选项
          </a-button>
          <a-button @click="deleteChoice" id="btn2">
            <a-icon type="delete"/>
            删除选项
          </a-button>
        </a-form-item>

        <a-form-item label="答案">
          <a-input
              v-decorator="['answer', { rules: [
                  { required: true, message: '不能为空' },
                  {pattern:/^.{1,100}$/,message: '答案长度为1-100位'}
                  ] }]"
          />
        </a-form-item>

        <a-form-item label="解析">
          <a-input
              v-decorator="['analysis', { rules: [
                  { required: true, message: '不能为空' },
                  {pattern:/^.{1,100}$/,message: '解析长度为1-100位'}
                  ] }]"
          />
        </a-form-item>

        <a-form-item label="预计用时">
          <a-input
              v-decorator="['consume', { rules: [
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
import {addTest, getTestDetail, editTest} from "../../api/test";

export default {
  name: "TestInfo",
  data() {
    return {
      testId: -1,
      question: {},
      choices: [],
      knowledge: [],
      showEditFlag: false,
      testType: 0,
      list: ['A', 'B', 'C', 'D', 'E', 'F'],
      choose: [],
      num: 2,
      form1: this.$form.createForm(this, {name: 'editTest'}),
    }
  },
  methods: {
    back(id) {
      this.$router.push({name: 'testList', params: {bankId: id}})
    },
    async reset() {
      let params = this.$route.params;
      let response = await getTestDetail(params.testId);
      console.log('testInfo', response)
      this.testId = response.id
      this.question = response
      this.choices = response.choices
      this.knowledge = response.knowledges
      this.testType = this.question.type
      this.num = this.choices.length
      this.choose = this.choices
    },
    setForm() {
      this.$nextTick(() => {
        this.form1.setFieldsValue({
          title: this.question.title,
          content: this.question.content,
          type: this.question.type,
          answer: this.question.answer,
          analysis: this.question.analysis,
          consume: this.question.consume,
        })
        for (let i = 0, temp = ['A', 'B', 'C', 'D', 'E', 'F']; i < this.num; i++) {
          this.form1.setFieldsValue({
            [`${temp[i]}`]: this.choices[i].content
          })
        }
      })

    },
    deleteChoice() {
      if (this.num == 2) {
        this.$message.warning("最少添加两个选项");
      } else {
        this.num--;
        this.choose.pop();
      }
    },
    addChoice() {
      if (this.num == 6) {
        this.$message.warning("最多添加六个选项");
      } else {
        this.choose.push({number: this.list[this.num], content: ''});
        this.num++;
      }
    },
    showEdit() {
      this.showEditFlag = true
      this.setForm()
    },
    async editTestItem(e) {
      e.preventDefault();
      this.form1.validateFields(async (err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          let arr = []
          let list = ['A', 'B', 'C', 'D', 'E', 'F']
          while (this.num > 0) {
            this.num--;
            let key = list[this.num]
            arr.push({
              number: key,
              content: values[key]
            })
          }
          console.log('arr', arr)
          let response = await editTest(values, this.testId, this.$store.getters.getTeacher.id, this.$route.params.bankId, arr);
          this.showEditFlag = false
          console.log('editResult', response)
          if (response.code == 0) {
            this.$message.success("修改题目成功！");
            await this.reset()
          } else {
            this.$message.error("修改题目失败");
          }
        }
      })
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

.box {
  text-align: center;
}

.content {
  border-radius: 10px;
  box-shadow: 2px 2px 10px #939393;
  width: 95%;
  height: 520px;
  margin: 0 auto;
  overflow: auto;
  background-color: white;
  /*display: flex;*/
  /*justify-content: center;*/
  /*align-items: center;*/
  text-align: center;
}

.block {
  width: 80%;
  /*border: 1px solid black;*/
  margin: 0 auto;
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

.tag {
  font-size: 15px;
}

#btn1 {
  background-color: #1C90F5;
  color: white;
  border: none;
  margin-left: 100px;
  float: left;
  margin-top: 10px;
}

#btn2 {
  background-color: #ea5454;
  color: white;
  border: none;
  margin-left: 20px;
  float: left;
  margin-top: 10px;
}

.choice p {
  font-weight: bold;
  color: #6a6868;
  float: left;
  margin-left: 40px;
  margin-bottom: 0;
}

</style>