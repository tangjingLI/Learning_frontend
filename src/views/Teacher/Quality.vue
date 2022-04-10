<template>
  <div>
    <div class="top">

      <h1>品行管理</h1>
      <a-popconfirm
          :disabled="!hasSelected"
          title="确定删除所选品行吗?"
          ok-text="Yes"
          cancel-text="No"
          @confirm="deleteGroup"
      >
        <a-button id="deleteAll" :disabled="!hasSelected" type="danger"
                  style=" margin-top: 5px;margin-right: 10px;float: right">
          删除品行
        </a-button>
      </a-popconfirm>
      <a-button id="add" @click="()=>{this.flag1=true}"
                style="  margin-top: 5px;background-color: #1C90F5;color: white;border: none;float: right;margin-right: 10px">
        <a-icon type="plus-circle"/>
        添加品行
      </a-button>

      <a-input-search placeholder="输入品行名" enter-button @search="onSearch" id="search"
                      style="width: 30%; float: right;margin-top: 5px;margin-right: 5px"/>
      <a-button @click="reset"
                style="padding-left:5px;padding-right:5px;float: right;margin-right: 10px;margin-top: 5px;background-color: white;color: #1C90F5;border: 1px solid #1C90F5;">
        重置
      </a-button>
    </div>

    <div class="table">
      <a-table :columns="columns" :data-source="qualityList" style="background-color: white"
               rowKey="id" :pagination="false"
               :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      >
        <span slot="customTitle" style="margin-left: 50px"><a-icon type="smile" theme="twoTone"/>  品行</span>
        <span slot="action" slot-scope="text, record">
          <a @click="showEdit(record.id,record.name)">修改</a>
          <a-divider type="vertical"/>
          <a-popconfirm
              title="确定删除该品行吗?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="deleteQualityItem(record.id)"
          >
            <a href="#">删除</a>
          </a-popconfirm>
        </span>

      </a-table>
    </div>

    <div class="footer">
      <a-pagination show-quick-jumper :pageSize="1" :total="totalPage" @change="onChange" id="page" v-model="current"/>
    </div>

    <a-modal v-model="flag1" title="添加品行" @ok="addQualityItem">
      <a-form :form="form1" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-form-item label="品行名称">
          <a-input
              v-decorator="['title', { rules: [
                  { required: true, message: '不能为空' },
                  {pattern:/^.{2,8}$/,message: '能力名称长度为2-8位'}
                  ] }]"
          />
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal v-model="flag2" title="修改品行" @ok="editQualityItem">
      <a-form :form="form1" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-form-item label="品行名称">
          <a-input
              v-decorator="['title', { rules: [
                  { required: true, message: '不能为空' },
                  {pattern:/^.{2,8}$/,message: '能力名称长度为2-8位'}
                  ] }]"
          />
        </a-form-item>
      </a-form>
    </a-modal>

  </div>
</template>

<script>
import {getAllQuality, deleteQuality, addQuality, deleteQualityGroup, editQuality} from "../../api/course";

const columns = [
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
]

export default {
  name: "Quality",
  data() {
    return {
      columns,
      qualityList: [],
      flag1: false,
      flag2: false,
      qid: -1,
      selectedRowKeys: [],
      totalPage: 1,
      current: 1,
      form1: this.$form.createForm(this, {name: 'newQuality'}),
    }
  },
  methods: {
    async onChange(pageNumber) {
      if (pageNumber <= this.totalPage) {
        let response = await getAllQuality(pageNumber)
        this.qualityList = response.content
        this.totalPage = response.totalPage
        this.current = pageNumber
      }
    },
    //选择
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    async reset() {
      let response = await getAllQuality(1)
      this.qualityList = response.content
      this.totalPage = response.totalPage
      this.current = 1
    },
    async onSearch(value) {

    },
    async deleteQualityItem(id) {
      let response = await deleteQuality(id)
      if (response.code == 0) {
        this.$message.success('删除成功！')
        await this.reset()
      } else {
        this.$message.error("删除失败")
      }
    },
    showEdit(id, name) {
      this.flag2 = true
      this.qid = id
      this.$nextTick(() => {
        this.form1.setFieldsValue({
          title: name
        })
      })
    },
    editQualityItem(e) {
      e.preventDefault();
      this.form1.validateFields(async (err, values) => {
        if (!err) {
          let response=await editQuality(this.qid,values.title)
          this.flag2=false
          if (response.code == 0) {
            this.$message.success('编辑成功！')
            await this.reset()
          } else {
            this.$message.error("编辑失败")
          }
        }
      })
    },
    //添加品行
    async addQualityItem(e) {
      e.preventDefault()
      this.form1.validateFields(async (err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          this.flag1 = false
          this.form1.resetFields()
          let response = await addQuality(values.title)
          this.flag3 = false
          this.form1.resetFields()
          if (response.code == 0) {
            this.$message.success("添加成功！")
            await this.reset()
          } else {
            this.$message.error("添加失败");
          }
        }
      })
    },
    //批量删除
    async deleteGroup() {
      let response = await deleteQualityGroup(this.selectedRowKeys)
      if (response.code == 200) {
        this.$message.success('删除成功！')
        await this.reset()
      } else {
        this.$message.error("删除失败")
      }
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