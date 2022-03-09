<template>
  <div>
    <div class="top">
      <p>题目回收站</p>
      <a-button @click="back" id="back">返回</a-button>
      <a-popconfirm
          title="确定彻底删除所有题库？"
          ok-text="Yes"
          cancel-text="No"
          @confirm="deleteAll"
      >
        <a-button id="all">全部删除</a-button>
      </a-popconfirm>
    </div>

    <div class="content">
      <a-table :columns="columns" :data-source="questions" style="background-color: white" :pagination="pagination"
               rowKey="id">
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
          <a @click="restore(record.id)">恢复</a>
          <a-divider type="vertical"/>
          <a-popconfirm
              title="确定删除该题库吗?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="confirm(record.id)"
          >
            <a href="#">删除</a>
          </a-popconfirm>
        </span>

      </a-table>

    </div>
  </div>
</template>

<script>
import {getTestBin, restoreTest, dropTest} from "../../api/test";

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
  name: "TestBin",
  data() {
    return {
      columns,
      questions: [],
      pagination: {
        pageSize: 7
      },
    }
  },
  methods: {
    back() {
      this.$router.push({name: 'control'})
    },
    confirm(id) {
      let response = dropTest(id, this.$store.getters.getTeacher.id)
      if (response.code==0) {
        this.$message.success("删除成功")
      } else {
        this.$message.error("删除失败")
      }
    },
    restore(id) {
      let response = restoreTest(id, this.$store.getters.getTeacher.id)
      if (response.code==0) {
        this.$message.success("恢复成功")
      } else {
        this.$message.error("恢复失败")
      }
    },
    deleteAll() {
      for (let i = 0; i < this.questions.length; i++) {
        this.confirm(this.questions[i].id)
      }
    }
  },
  mounted() {
    let response = getTestBin(this.$store.getters.getTeacher.id)
    this.questions = response.questions
  }
}
</script>

<style scoped>
.top {
  height: 40px;
  background-color: white;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
}

.top p {
  float: left;
  margin-left: 15px;
  letter-spacing: 2px;
  font-weight: bold;
  font-size: 15px;
  color: #6a6868;
  margin-top: 5px;
}

.top button {
  margin-top: 5px;
  background-color: white;
  color: #1C90F5;
  border: 1px solid #1C90F5;
  margin-right: 10px;
  float: right;
}

#back {
  margin-top: 5px;
  background-color: white;
  color: #1C90F5;
  border: 1px solid #1C90F5;
  margin-right: 10px;
  float: right;
}

#all {
  margin-top: 5px;
  background-color: #ea5454;
  color: white;
  border: none;
  margin-right: 10px;
  float: right;
}
</style>