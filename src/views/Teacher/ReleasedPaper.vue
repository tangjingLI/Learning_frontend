<template>
  <div>
    <div class="top">
      <p>已发布试卷</p>
      <a-button @click="back">返回</a-button>
    </div>

    <div class="content">
      <a-table :columns="columns" :data-source="papers" style="background-color: white" :pagination="pagination"
               :rowKey="record=>record.id">
        <span slot="customTitle"><a-icon type="smile" theme="twoTone"/> 试卷名</span>

        <span slot="action" slot-scope="text, record">
          <a @click="getExamDetail(record.id)">查看试卷</a>
        </span>

      </a-table>

    </div>
  </div>
</template>

<script>
import {getReleasedPaper} from "../../api/paper";

const columns = [
  {
    dataIndex: 'title',
    key: 'title',
    slots: {title: 'customTitle'},
    scopedSlots: {customRender: 'title'},
  },
  {
    title: '考试名',
    key: 'name',
    dataIndex: 'name',
    scopedSlots: {customRender: 'name'},
  },
  {
    title: '平均分',
    key: 'averageScore',
    dataIndex: 'averageScore',
    scopedSlots: {customRender: 'averageScore'},
  },
  {
    title: '最高分',
    key: 'maxScore',
    dataIndex: 'maxScore',
    scopedSlots: {customRender: 'maxScore'},
  },
  {
    title: '最低分',
    key: 'minScore',
    dataIndex: 'minScore',
    scopedSlots: {customRender: 'minScore'},
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: {customRender: 'action'},
  }
];


export default {
  name: "ReleasedPaper",
  data() {
    return {
      papers: [],
      columns,
      pagination: {
        pageSize: 7
      },
    }
  },
  methods: {
    back() {
      this.$router.push({name: 'control'})
    },
    getExamDetail(id) {
      this.$router.push({name: 'paperInfo', params: {paperId: id}})
    }

  },
  mounted() {
    let response = getReleasedPaper(this.$store.getters.getTeacher.id)
    this.papers = response.res
    console.log(this.papers)
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

</style>