<template>
  <div class="testBank">
    <div class="top">

      <h1>题库列表</h1>
      <a-popconfirm
          :disabled="!hasSelected"
          title="确定删除所选题库吗?"
          ok-text="Yes"
          cancel-text="No"
          @confirm="deleteGroup"
      >
        <a-button id="deleteAll" :disabled="!hasSelected" type="danger"
                  style=" margin-top: 5px;margin-right: 10px;float: right">
          删除题库
        </a-button>
      </a-popconfirm>
      <a-button id="add" @click="showModal"
                style="  margin-top: 5px;background-color: #1C90F5;color: white;border: none;float: right;margin-right: 10px">
        <a-icon type="plus-circle"/>
        新建题库
      </a-button>

      <a-input-search placeholder="输入题库名" enter-button @search="onSearch" id="search"
                      style="width: 30%; float: right;margin-top: 5px;margin-right: 5px"/>
      <a-button @click="reset"
                style="padding-left:5px;padding-right:5px;float: right;margin-right: 10px;margin-top: 5px;background-color: white;color: #1C90F5;border: 1px solid #1C90F5;">
        重置
      </a-button>
    </div>


    <div class="table">
      <a-table :columns="columns" :data-source="banks" style="background-color: white"
               rowKey="id" :pagination="false"
               :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      >
        <span slot="customTitle"><a-icon type="smile" theme="twoTone"/>  题库</span>

        <span slot="isPublic" slot-scope="isPublic">
          <a-tag v-if="isPublic==0" color="green">public</a-tag>
          <a-tag v-else color="orange">private</a-tag>
        </span>

        <span slot="action" slot-scope="text, record">
          <a @click="chooseBank(record.id)">查看</a>
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
      <a-pagination show-quick-jumper :pageSize="1" :total="totalPage" @change="onChange" id="page" v-model="current"/>
    </div>

    <a-modal v-model="visible" title="新建题库" @ok="handleOk" @cancel="handleCancel">
      <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-form-item label="题库名">
          <a-input
              v-decorator="['title', { rules: [
                  { required: true, message: '不能为空' },
                  {pattern:/^.{2,8}$/,message: '题库名长度为2-8位'}
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
import {getAllTestBank, createTestBank, deleteTestBank, deleteTestBankGroup,searchBank} from "../../api/test";

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
    dataIndex: 'isPublic',
    scopedSlots: {customRender: 'isPublic'},
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: {customRender: 'action'},
  }
];


export default {
  name: "TestBank",
  data() {
    return {
      banks: [],
      columns,
      msg: '',
      selectedRowKeys: [],
      visible: false,
      totalPage: 1,
      formLayout: 'horizontal',
      current: 1,
      form: this.$form.createForm(this, {name: 'newTestBank'}),
    }
  },
  methods: {
    //查看
    chooseBank(id) {
      this.$router.push({name: 'testList', params: {bankId: id}});
    },
    //搜索框
    async onSearch(value) {
      let response=await searchBank(this.$store.getters.getTeacher.id,value)
      console.log(response)
      this.banks=response
    },
    //删除
    async confirm(id) {
      console.log("delete:" + id);
      let response = await deleteTestBank(id, this.$store.getters.getTeacher.id);
      console.log(response)
      if (response.code == 0) {
        this.$message.success('删除成功！')
        await this.reset()
      } else {
        this.$message.warning(response.msg)
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
      this.form.validateFields(async (err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          let response = await createTestBank(values.title, values.isPublic, this.$store.getters.getTeacher.id);
          this.form.resetFields();
          this.visible = false;
          if (response.code == 0) {
            // console.log(response)
            this.$message.success("新建题库成功！")
            await this.reset()
          } else {
            this.$message.error("添加失败");
          }
        }
      });
    },
    handleCancel() {
      this.form.resetFields()
    },
    //选择
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    async deleteGroup() {
      let response = await deleteTestBankGroup(this.$store.getters.getTeacher.id, this.selectedRowKeys)
      if (response.code == 0) {
        this.$message.success('删除成功！')
        await this.reset()
      } else {
        this.$message.error("删除失败")
      }
    },
    //分页
    async onChange(pageNumber) {
      console.log('Page: ', pageNumber);
      if (pageNumber <= this.totalPage) {
        let userId = this.$store.getters.getTeacher.id;
        let response = await getAllTestBank(userId, pageNumber);
        this.banks = response.content;
        this.totalPage = response.totalPage
      }
    },
    async reset() {
      let userId = this.$store.getters.getTeacher.id;
      let response = await getAllTestBank(userId, 1);
      console.log(response)
      this.banks = response.content;
      this.totalPage = response.totalPage
      this.current = 1
    }

  },

  mounted() {
    this.reset()
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