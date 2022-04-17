<template>
  <div class="test">
    <div class="top">
      <a-button
          style=" float:left;margin-top: 5px;background-color: white;color: #1C90F5;border: 1px solid #1C90F5;margin-left: 10px;height: 70%"
          @click="back">
        <a-icon type="left-circle"/>
        返回
      </a-button>
      <h1> {{ bankTitle }}</h1>
      <a-tag v-if="isPublic==0" color="green" style="margin-left: 5px;margin-top: 8px">public</a-tag>
      <a-tag v-else color="orange" style="margin-left: 5px;margin-top: 8px">private</a-tag>

      <a-popconfirm
          :disabled="!hasSelected"
          title="确定删除所选题目吗?"
          ok-text="Yes"
          cancel-text="No"
          @confirm="deleteGroup"
      >
        <a-button id="deleteAll" :disabled="!hasSelected" type="danger"
                  style=" margin-top: 5px;margin-right: 10px;float: right">
          删除题目
        </a-button>
      </a-popconfirm>

      <a-button id="edit" @click="showEdit"
                style=" margin-top: 5px;background-color: white;color: #1C90F5;border: 1px solid #1C90F5;margin-right: 10px;float: right">
        <a-icon type="setting"/>
        编辑题库
      </a-button>


      <a-button id="add" @click="showAddTest"
                style="  margin-top: 5px;background-color: #1C90F5;color: white;border: none;float: right;margin-right: 5px">
        <a-icon type="plus-circle"/>
        添加题目
      </a-button>

      <a-input-search placeholder="输入题目内容" enter-button @search="onSearch" id="search"
                      style="width: 30%; float: right;margin-top: 5px;margin-right: 5px"/>
      <a-button @click="reset"
                style="padding-left:5px;padding-right:5px;float: right;margin-right: 10px;margin-top: 5px;background-color: white;color: #1C90F5;border: 1px solid #1C90F5;">
        重置
      </a-button>

    </div>

    <div class="table">
      <a-table :columns="columns" :data-source="questions" style="background-color: white" :pagination="false"
               rowKey="id"
               :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      >
        <span slot="customTitle"><a-icon type="smile" theme="twoTone"/> 题目</span>

        <span slot="type" slot-scope="type">
          <a-tag v-if="type==1" color="blue">单选</a-tag>
          <a-tag v-else-if="type==2" color="purple">多选</a-tag>
          <a-tag v-else color="pink">简答</a-tag>
        </span>

        <span slot="rate" slot-scope="rate">
          {{ rate * 100 }}%
        </span>

        <span slot="consume" slot-scope="consume">
          {{ consume }} 分钟
        </span>

        <span slot="action" slot-scope="text, record">
          <a @click="detail(record.id)">查看</a>
          <a-divider type="vertical"/>
          <a-popconfirm
              title="确定删除该题目吗?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="confirm(record.id)"
              @cancel="cancel"
          >
            <a href="#">删除</a>
          </a-popconfirm>
          <a-divider type="vertical"/>
          <a @click="showBind(record.id)">绑定知识点</a>

        </span>

      </a-table>
    </div>

    <div class="footer">
      <a-pagination show-quick-jumper :pageSize="1" :total="totalPage" @change="onChange" id="page" v-model="current"/>
    </div>

    <a-modal v-model="editBank" title="编辑题库" @ok="edit" @cancel="cancel1">
      <a-form :form="form1" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-form-item label="题库名">
          <a-input
              v-decorator="['title', { rules: [
                  { required: true, message: '不能为空' },
                  {pattern:/^.{2,8}$/,message: '题库名长度为2-8位'},
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

    <a-modal v-model="showAdd" title="添加题目" @ok="addTest" @cancel="cancel2">
      <a-form :form="form2" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }"
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
                         v-decorator="['type',{rules:[{required: true,message:'不能为空'}]}]">
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

        <div v-if="testType==1||testType==2" v-for="(choice,index) in choices" class="choice">
          <a-form-item>
            <p>选项{{ choice.ch }}&emsp;</p>
            <a-input style="float: left;width: 240px"
                     v-decorator="[choice.ch, { rules: [
                  { required: true, message: '不能为空' },
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

    <a-modal v-model="flag1" title="绑定知识点" @ok="()=>{this.flag1=false}">
      <div class="box">
        <a-table :columns="columns2" :data-source="knowledgeList" style="background-color: white"
                 rowKey="id" :pagination="false" class="bindTable"
        >
          <span slot="customTitle"><a-icon type="smile" theme="twoTone"/>  知识点</span>
          <span slot="action" slot-scope="text, record">
          <a @click="showLevel(record.id,record.name)">绑定</a>
          </span>
        </a-table>
        <div class="footer1">
          <a-pagination :pageSize="1" :total="totalPage1" @change="changeBindPage" class="page1"
                        v-model="page1"/>
        </div>
      </div>
    </a-modal>

    <a-modal v-model="flag2" :title="kName" @ok="myBindKnowledge">
      <a-form :form="form3" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-form-item label="技能">
          <a-select style="width: 120px"
                    v-decorator="['skill',{rules:[{required: true,message:'不能为空'}]}]">
            <a-select-option value="记忆">
              记忆
            </a-select-option>
            <a-select-option value="理解">
              理解
            </a-select-option>
            <a-select-option value="运用">
              运用
            </a-select-option>
            <a-select-option value="分析">
              分析
            </a-select-option>
            <a-select-option value="评价">
              评价
            </a-select-option>
            <a-select-option value="创造">
              创造
            </a-select-option>

          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>

  </div>
</template>

<script>
import {
  editTestBank,
  getTestBank,
  addTest,
  deleteTest,
  searchTest,
  deleteTestGroup,
  bindKnowledge
} from "../../api/test";
import {getAllKnowledge} from "../../api/course";

const columns = [
  {
    dataIndex: 'title',
    key: 'title',
    slots: {title: 'customTitle'},
    scopedSlots: {customRender: 'title'},
  },
  {
    title: '类型',
    key: 'type',
    dataIndex: 'type',
    scopedSlots: {customRender: 'type'},
  },
  {
    title: '正确率',
    key: 'rate',
    dataIndex: 'rate',
    scopedSlots: {customRender: 'rate'},
  },
  {
    title: '预计耗时',
    key: 'consume',
    dataIndex: 'consume',
    scopedSlots: {customRender: 'consume'},
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: {customRender: 'action'},
  },
];

const columns2 = [
  {
    dataIndex: 'name',
    key: 'title',
    slots: {title: 'customTitle'},
    scopedSlots: {customRender: 'title'},
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: {customRender: 'action'},

  }
];


export default {
  name: "TestList",
  data() {
    return {
      bankTitle: '',
      questions: [],
      isPublic: 0,
      columns,
      columns2,
      msg: '',
      tid: -1,
      kid: -1,
      kName: '',
      flag1: false,
      flag2: false,
      knowledgeList: [],
      editBank: false,
      showAdd: false,
      testType: 0,
      num: 2,
      totalPage: 1,
      page1: 1,
      totalPage1: 1,
      choices: [],
      selectedRowKeys: [],
      current: 1,
      list: ['A', 'B', 'C', 'D', 'E', 'F'],
      form1: this.$form.createForm(this, {name: 'editTestBank'}),
      form2: this.$form.createForm(this, {name: 'addTest'}),
      form3: this.$form.createForm(this, {name: 'bind'}),
    }
  },
  mounted() {
    // console.log(this.$route.params);
    this.reset();
  },
  methods: {
    async changeBindPage(pageNumber) {
      if (pageNumber <= this.totalPage1) {
        let response = await getAllKnowledge(pageNumber)
        this.knowledgeList = response.content
        this.totalPage1 = response.totalPage
        this.page1 = pageNumber
      }
    },
    async showBind(id) {
      await this.changeBindPage(1)
      this.flag1 = true
      this.tid = id
    },
    showLevel(id, name) {
      this.kName = name
      this.flag2 = true
      this.kid = id
    },
    async myBindKnowledge(e) {
      e.preventDefault()
      this.form3.validateFields(async (err, values) => {
        if (!err) {
          let kList={
            knowledges:[
              {
                knowledgeId:this.kid,
                skillId:values.skill
              }
            ]
          }
          let response=await bindKnowledge(this.$store.getters.getTeacher.id,this.tid,kList)
          this.flag2 = false
          this.form3.resetFields()
          if (response.code == 0) {
            this.$message.success("绑定成功！")
          } else {
            this.$message.error("绑定失败")
          }
        }
      })
    },
    async reset() {
      let params = this.$route.params;
      let response = await getTestBank(params.bankId, this.$store.getters.getTeacher.id, 1);
      console.log(response)
      this.bankTitle = response.title
      this.questions = response.content
      this.isPublic = response.isPublic
      this.totalPage = response.totalPage
      this.current = 1
      this.choices = [];
      this.choices.push({ch: 'A'});
      this.choices.push({ch: 'B'});
    },
    async onSearch(value) {
      let response = await searchTest(this.$route.params.bankId, value);
      this.questions = response
      console.log(response);
    },
    back() {
      this.$router.push({name: 'testBank'})
    },
    detail(id) {
      this.$router.push({name: 'testInfo', params: {testId: id}})
    },
    //删除
    async confirm(id) {
      let response = await deleteTest(this.$store.getters.getTeacher.id, id);
      console.log(response)
      if (response.code == 0) {
        this.$message.success('删除成功！');
        await this.reset()
      } else {
        this.$message.error(response.msg);
      }
    },
    cancel(e) {
      console.log(e);
    },
    //编辑题库
    setForm() {
      this.$nextTick(() => {
        this.form1.setFieldsValue({
          title: this.bankTitle,
          isPublic: this.isPublic
        })
      })
    },
    edit(e) {
      e.preventDefault();
      this.form1.validateFields(async (err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          let response = await editTestBank(this.$route.params.bankId, this.$store.getters.getTeacher.id, values.title, values.isPublic);
          this.form1.resetFields();
          this.editBank = false;
          // console.log(response)
          if (response.code == 0) {
            this.$message.success('编辑成功！')
            await this.reset()
          } else {
            this.$message.error("编辑失败")
          }
        }
      });
    },
    showEdit() {
      this.editBank = true
      this.setForm()
    },
    cancel1() {
      this.form1.resetFields()
    },
    //添加题目
    showAddTest() {
      this.showAdd = true
    },
    addTest(e) {
      e.preventDefault()
      this.form2.validateFields(async (err, values) => {
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
            console.log(arr)
          }
          let response = await addTest(values, this.$store.getters.getTeacher.id, this.$route.params.bankId, arr);
          this.form2.resetFields();
          this.testType = 0;
          this.num = 2;
          this.choices = [];
          this.choices.push({ch: 'A'});
          this.choices.push({ch: 'B'});
          this.showAdd = false;
          if (response.code == 0) {
            this.$message.success("添加题目成功！");
            await this.reset()
          } else {
            this.$message.error("添加题目失败");
          }
        }
      });
    },
    cancel2() {
      this.form2.resetFields();
      this.testType = 0;
      this.num = 2;
      this.choices = [];
      this.choices.push({ch: 'A'});
      this.choices.push({ch: 'B'});
    },
    addChoice() {
      if (this.num == 6) {
        this.$message.warning("最多添加六个选项");
      } else {
        this.choices.push({ch: this.list[this.num]});
        this.num++;
      }
    },
    deleteChoice() {
      if (this.num == 2) {
        this.$message.warning("最少添加两个选项");
      } else {
        this.num--;
        this.choices.pop();
      }
    },
    //选择
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    async deleteGroup() {
      let response = await deleteTestGroup(this.$store.getters.getTeacher.id, this.selectedRowKeys)
      if (response.code == 0) {
        this.$message.success('删除成功！');
        await this.reset()
      } else {
        this.$message.error("删除失败")
      }
    },
    //分页
    async onChange(pageNumber) {
      console.log('Page: ', pageNumber);
      if (pageNumber <= this.totalPage) {
        let params = this.$route.params;
        let response = await getTestBank(params.bankId, this.$store.getters.getTeacher.id, pageNumber);
        this.questions = response.content
        this.totalPage = response.totalPage
      }
    }

  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0;
    },
  },
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
  size: 10px;
  color: #6a6868;
  margin-top: 5px;
}

.table {
  margin: 0 5px;
  height: 80%;
  overflow-y: scroll;
  background-color: white;
}

.choice p {
  font-weight: bold;
  color: #6a6868;
  float: left;
  margin-left: 40px;
  margin-bottom: 0;
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

#page {
  margin-right: 10px;
  margin-top: 10px;
  float: right;
}

.footer {
  height: 10%;
  background-color: white;
  margin: 0 5px;
}

.page1 {
  margin-right: 10px;
  margin-top: 10px;
  float: right;
}

.footer1 {
  height: 50px;
  background-color: white;
  margin: 0 5px;
}

.box {
  height: 350px;
}

.bindTable {
  height: 330px;
  overflow-y: scroll;
}


</style>