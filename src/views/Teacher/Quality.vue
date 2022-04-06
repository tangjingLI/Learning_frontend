<template>
  <div>
    <div class="top">

      <h1>品行管理</h1>
      <a-popconfirm
          :disabled="!hasSelected"
          title="确定删除所选品行吗?"
          ok-text="Yes"
          cancel-text="No"
          @confirm=""
      >
        <a-button id="deleteAll" :disabled="!hasSelected" type="danger"
                  style=" margin-top: 5px;margin-right: 10px;float: right">
          删除品行
        </a-button>
      </a-popconfirm>
      <a-button id="add" @click=""
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
      >
        <span slot="customTitle" style="margin-left: 50px"><a-icon type="smile" theme="twoTone"/>  品行</span>
        <span slot="action" slot-scope="text, record">
          <a @click="">修改</a>
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


  </div>
</template>

<script>
import {getAllQuality, deleteQuality} from "../../api/course";

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
    }
  },
  methods: {
    async reset() {
      let response = await getAllQuality()
      this.qualityList = response.content

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
    async editQualityItem(e){

    }
  },
  mounted() {
    this.reset()
  },
  computed: {
    hasSelected() {
      return true;
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
  height: 90%;
  overflow-y: scroll;
  background-color: white;
}

</style>