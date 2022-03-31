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
    </div>

    <div class="table">
      <a-table :columns="columns" :data-source="qualityList" style="background-color: white"
               rowKey="id" :pagination="false"
      >
        <span slot="customTitle" style="margin-left: 50px"><a-icon type="smile" theme="twoTone"/>  品行</span>

      </a-table>
    </div>


  </div>
</template>

<script>
const columns = [
  {
    dataIndex: 'title',
    key: 'title',
    slots: {title: 'customTitle'},
    scopedSlots: {customRender: 'title'},
  }
]

export default {
  name: "Quality",
  data() {
    return {
      columns,
      qualityList:[],
    }
  },
  methods: {},
  mounted() {
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