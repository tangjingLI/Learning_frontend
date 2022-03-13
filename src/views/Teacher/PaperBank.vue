<template>
  <div class="paperBank">
    <div class="top">

      <h1>试卷库列表</h1>

      <a-popconfirm
          :disabled="!hasSelected"
          title="确定删除所选试卷库吗?"
          ok-text="Yes"
          cancel-text="No"
          @confirm="deleteGroup"
      >
        <a-button id="deleteAll" :disabled="!hasSelected" type="danger"
                  style=" margin-top: 5px;margin-right: 10px;float: right">
          删除试卷库
        </a-button>
      </a-popconfirm>


      <a-button id="add" @click="showModal"
                style="  margin-top: 5px;background-color: #1C90F5;color: white;border: none;float: right;margin-right: 10px">
        <a-icon type="plus-circle"/>
        新建试卷库
      </a-button>

      <a-input-search placeholder="输入试卷库名" enter-button @search="onSearch" id="search"
                      style="width: 30%; float: right;margin-top: 5px;margin-right: 5px"/>
    </div>

    <div class="table">
      <a-table :columns="columns" :data-source="banks" style="background-color: white" :pagination="pagination"
               :rowKey="record=>record.papersInfo.id"
               :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      >
        <span slot="customTitle"><a-icon type="smile" theme="twoTone"/>  试卷库</span>

        <span slot="isPublic" slot-scope="isPublic">
          <a-tag v-if="isPublic==0" color="green">public</a-tag>
          <a-tag v-else color="orange">private</a-tag>
        </span>

        <span slot="action" slot-scope="text, record">
          <a @click="chooseBank(record.papersInfo.id)">查看</a>
          <a-divider type="vertical"/>
          <a-popconfirm
              title="确定删除该试卷库吗?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="confirm(record.papersInfo.id)"
              @cancel="cancel"
          >
            <a href="#">删除</a>
          </a-popconfirm>
        </span>

      </a-table>
    </div>
    <a-modal v-model="visible" title="新建题库" @ok="handleOk">
      <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-form-item label="试卷库名">
          <a-input
              v-decorator="['title', { rules: [
                  { required: true, message: '不能为空' },
                  {pattern:/^.{2,8}$/,message: '试卷库名长度为2-8位'}
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
import {
  getAllPaperBank,
  createPaperBank,
  deletePaperBank,
  deletePaperBankGroup,
} from "../../api/paper";

const columns = [
  {
    dataIndex: 'title',
    key: 'title',
    slots: {title: 'customTitle'},
    scopedSlots: {customRender: 'title'},
  },
  {
    title: '类型',
    key: 'isPublic',
    dataIndex: 'papersInfo.isPublic',
    scopedSlots: {customRender: 'isPublic'},
  },
  {
    title: '试卷数',
    key: 'num',
    dataIndex: 'papersInfo.num',
    scopedSlots: {customRender: 'num'},
  },
  {
    title: '创建者',
    key: 'creator',
    dataIndex: 'papersInfo.creator',
    scopedSlots: {customRender: 'creator'},
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: {customRender: 'action'},
  }
];


export default {
  name: "PaperBank",
  data() {
    return {
      banks: [],
      pagination: {
        pageSize: 7
      },
      columns,
      msg: '',
      visible: false,
      selectedRowKeys: [],
      formLayout: 'horizontal',
      form: this.$form.createForm(this, {name: 'newPaperBank'}),
    }
  },
  mounted() {
    let userId = this.$store.getters.getTeacher.id;
    let response = getAllPaperBank(userId);
    this.msg = response.msg;
    this.banks = response.res;
  },
  methods: {
    //查看
    chooseBank(id) {
      this.$router.push({name: 'paperList', params: {bankId: id}});
    },
    //搜索框
    onSearch(value) {
      console.log(value)
    },
    //删除
    confirm(id) {
      console.log("delete:"+id);
      let response=deletePaperBank(this.$store.getters.getTeacher.id,id)
      if(response.res){
        this.$message.success('删除成功！');
      }else {
        this.$message.error("删除失败")
      }
    },
    cancel(e) {
      console.log(e);
    },
    //新建题库
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      // console.log(e);
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          this.form.resetFields();
          this.visible = false;

          let aData = new Date();
          console.log(aData.getFullYear() + "-" + (aData.getMonth() + 1) + "-" + aData.getDate())
          let response = createPaperBank(values.title, this.$store.getters.getTeacher.id, aData)
          if (response.res) {
            this.$message.success("创建成功");
          } else {
            this.$message.error("创建失败")
          }
        }
      });
    },
    //选择
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    deleteGroup(){
      let response=deletePaperBankGroup(this.$store.getters.getTeacher.id,this.selectedRowKeys)
      if (response.res) {
        this.$message.success('删除成功！');
      } else {
        this.$message.error("删除失败")
      }
    },
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
  margin: 0 20px;
}

</style>