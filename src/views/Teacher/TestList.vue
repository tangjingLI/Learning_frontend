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
                style="float: right;margin-right: 10px;margin-top: 5px;background-color: white;color: #1C90F5;border: 1px solid #1C90F5;">
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
              title="确定删除该题库吗?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="confirm(record.id)"
              @cancel="cancel"
          >
            <a href="#">删除</a>
          </a-popconfirm>
        </span>

      </a-table>
    </div>

    <div class="footer">
      <a-pagination show-quick-jumper :pageSize="1" :total="totalPage" @change="onChange" id="page"/>
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

        <div v-if="testType==1||testType==2" v-for="item in choices" class="choice">
          <a-form-item>
            <p>选项{{ item.ch }}&emsp;</p>
            <a-input style="float: left;width: 240px"
                     v-decorator="[item.ch, { rules: [
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

  </div>
</template>

<script>
import {editTestBank, getTestBank, addTest, deleteTest, searchTest, deleteTestGroup} from "../../api/test";

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


export default {
  name: "TestList",
  data() {
    return {
      bankTitle: '',
      questions: [],
      isPublic: 0,
      columns,
      msg: '',
      editBank: false,
      showAdd: false,
      testType: 0,
      num: 2,
      totalPage: 1,
      choices: [],
      selectedRowKeys: [],
      list: ['A', 'B', 'C', 'D', 'E', 'F'],
      form1: this.$form.createForm(this, {name: 'editTestBank'}),
      form2: this.$form.createForm(this, {name: 'addTest'}),
    }
  },
  mounted() {
    // console.log(this.$route.params);
    this.reset();

    this.choices.push({ch: 'A'});
    this.choices.push({ch: 'B'});
  },
  methods: {
    reset() {
      let params = this.$route.params;
      let response = getTestBank(params.bankId, this.$store.getters.getTeacher.id, 1);
      this.bankTitle = response.res.bankTitle;
      this.questions = response.res.questions;
      this.isPublic = response.isPublic;
      this.totalPage = response.totalPage
    },
    onSearch(value) {
      let response = searchTest(value);
      this.bankTitle = response.res.bankTitle;
      this.questions = response.res.questions;
      this.isPublic = response.isPublic;
      // console.log(value);
    },
    back() {
      this.$router.push({name: 'testBank'})
    },
    detail(id) {
      this.$router.push({name: 'testInfo', params: {testId: id}})
    },
    //删除
    confirm(id) {
      let response = deleteTest(this.$store.getters.getTeacher.id, id);
      if (response.code == 0) {
        this.$message.success('删除成功！');
      } else {
        this.$message.error("删除失败");
      }
    },
    cancel(e) {
      console.log(e);
    },
    //编辑题库
    edit(e) {
      e.preventDefault();
      this.form1.validateFields((err, values) => {
        if (!err) {
          if (values.title == this.bankTitle) {
            this.form1.resetFields();
            this.editBank = false;
          } else {
            console.log('Received values of form: ', values);
            let response = editTestBank(this.$route.params.bankId, this.$store.getters.getTeacher.id, values.title, values.isPublic);
            this.form1.resetFields();
            this.editBank = false;
            this.$message.success("编辑题库成功！");
          }
        }
      });
    },
    showEdit() {
      this.editBank = true;
    },
    cancel1() {
      this.form1.resetFields();
    },
    //添加题目
    showAddTest() {
      this.showAdd = true;
    },
    addTest(e) {
      e.preventDefault();
      this.form2.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          let response = addTest(values, this.$store.getters.getTeacher.id, this.$route.params.bankId, this.num);
          this.form2.resetFields();
          this.testType = 0;
          this.num = 2;
          this.choices = [];
          this.choices.push({ch: 'A'});
          this.choices.push({ch: 'B'});
          this.showAdd = false;
          if (response.code == 0) {
            this.$message.success("添加题目成功！");
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
    deleteGroup() {
      let response = deleteTestGroup(this.$store.getters.getTeacher.id, this.selectedRowKeys)
      if (response.code == 0) {
        this.$message.success('删除成功！');
      } else {
        this.$message.error("删除失败")
      }
    },
    //分页
    onChange(pageNumber) {
      console.log('Page: ', pageNumber);
      if (pageNumber <= this.totalPage) {
        let params = this.$route.params;
        let response = getTestBank(params.bankId, this.$store.getters.getTeacher.id, pageNumber);
        this.questions = response.res.questions;
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

</style>