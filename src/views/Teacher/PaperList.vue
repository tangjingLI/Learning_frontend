<template>
  <div class="paper">
    <div class="top">
      <a-button
          style=" float:left;margin-top: 5px;background-color: white;color: #1C90F5;border: 1px solid #1C90F5;margin-left: 10px;height: 70%"
          @click="back">
        <a-icon type="left-circle" />
        返回
      </a-button>
      <h1> {{ bankTitle }}</h1>
<!--      <a-tag v-if="isPublic==0" color="green" style="margin-left: 5px;margin-top: 8px">public</a-tag>-->
<!--      <a-tag v-else color="orange" style="margin-left: 5px;margin-top: 8px">private</a-tag>-->
      <a-popconfirm
          :disabled="!hasSelected"
          title="确定删除所选试卷吗?"
          ok-text="Yes"
          cancel-text="No"
          @confirm="deleteGroup"
      >
        <a-button id="deleteAll" :disabled="!hasSelected" type="danger"
                  style=" margin-top: 5px;margin-right: 10px;float: right">
          删除试卷
        </a-button>
      </a-popconfirm>

      <a-button id="edit"
                style=" margin-top: 5px;background-color: white;color: #1C90F5;border: 1px solid #1C90F5;margin-right: 10px;float: right">
        <a-icon type="setting"/>
        编辑试卷库
      </a-button>


      <a-button id="add" @click="addPaper"
                style="  margin-top: 5px;background-color: #1C90F5;color: white;border: none;float: right;margin-right: 5px">
        <a-icon type="plus-circle"/>
        添加试卷
      </a-button>

      <a-input-search placeholder="输入试卷名" enter-button @search="onSearch" id="search"
                      style="width: 30%; float: right;margin-top: 5px;margin-right: 5px"/>
    </div>

    <div class="table">
      <a-table :columns="columns" :data-source="papers" style="background-color: white" :pagination="pagination"
               :rowKey="record=>record.paperInfo.id"
               :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      >
        <span slot="customTitle"><a-icon type="smile" theme="twoTone"/> 试卷</span>

        <span slot="status" slot-scope="status">
          <a-tag v-if="status==1" color="blue">已发布</a-tag>
          <a-tag v-else color="pink">未发布</a-tag>
        </span>

        <span slot="action" slot-scope="text, record">
          <a @click="detail(record.paperInfo.id)">查看</a>
          <a-divider type="vertical"/>
          <a-popconfirm
              title="确定删除该题库吗?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="confirm(record.paperInfo.id)"
              @cancel="cancel"
          >
            <a href="#">删除</a>
          </a-popconfirm>
        </span>

      </a-table>
    </div>
  </div>

</template>

<script>
import {getPaperBank,deletePaper,deletePaperGroup} from "../../api/paper";

const columns = [
  {
    dataIndex: 'title',
    key: 'title',
    slots: {title: 'customTitle'},
    scopedSlots: {customRender: 'title'},
  },
  {
    title: '状态',
    key: 'status',
    dataIndex: 'paperInfo.status',
    scopedSlots: {customRender: 'status'},
  },
  {
    title: '创建者',
    key: 'creator',
    dataIndex: 'paperInfo.creator',
    scopedSlots: {customRender: 'creator'},
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: {customRender: 'action'},
  }
];


export default {
  name: "paper",
  data() {
    return {
      bankTitle: '',
      columns,
      msg: '',
      pagination: {
        pageSize: 7
      },
      papers: [],
      choose:[],
      selectedRowKeys: [],
    }
  },
  mounted() {
    let params = this.$route.params;
    let response = getPaperBank(params.bankId);
    this.papers = response.res;
    this.bankTitle=response.bankTitle;
  },
  methods: {
    onSearch(value) {
      console.log(value);
    },
    back() {
      this.$router.push({name: 'paperBank'})
    },
    detail(id) {
      this.$router.push({name: 'paperInfo', params: {paperId: id}})
    },
    //删除
    confirm(id) {
      let response=deletePaper(this.$store.getters.getTeacher.id,id)
      if (response.res) {
        console.log("删除试卷："+id)
        this.$message.success('删除成功！');
      } else {
        this.$message.error("删除失败")
      }
    },
    cancel(e) {
      console.log(e);
    },
    //添加试卷
    addPaper(){
      let id=this.$route.params.bankId
      this.$router.push({name:'createPaper',params:{bankId:id}})
    },
    //选择
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    deleteGroup(){
      let response=deletePaperGroup(this.$store.getters.getTeacher.id,this.selectedRowKeys)
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






