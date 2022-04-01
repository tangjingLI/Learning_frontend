<template>
  <div>
    <div class="top">
      <p>已发布试卷</p>
      <a-button @click="back">返回</a-button>
    </div>

    <div class="content">
      <a-table :columns="columns" :data-source="papers" style="background-color: white" :pagination="false"
               :rowKey="record=>record.id">
        <span slot="customTitle"><a-icon type="smile" theme="twoTone"/> 试卷名</span>

        <span slot="type" slot-scope="type">
          <a-tag v-if="type==0" color="green">public</a-tag>
          <a-tag v-else color="orange">private</a-tag>
        </span>

        <span slot="time" slot-scope="time">
          {{ time }} 分钟
        </span>

        <span slot="action" slot-scope="text, record">
          <a @click="getExamDetail(record.id)">查看试卷</a>
        </span>

      </a-table>
    </div>

    <div class="footer">
      <a-pagination show-quick-jumper :pageSize="1" :total="totalPage" @change="onChange" id="page" v-model="current"/>
    </div>
  </div>
</template>

<script>
import {getReleasedPaper} from "../../api/paper";

const columns = [
  {
    dataIndex: 'paperName',
    key: 'title',
    slots: {title: 'customTitle'},
    scopedSlots: {customRender: 'title'},
  },
  {
    title: '类型',
    key: 'type',
    dataIndex: 'isPublic',
    scopedSlots: {customRender: 'type'},
  },
  {
    title: '考试时长',
    key: 'time',
    dataIndex: 'examTime',
    scopedSlots: {customRender: 'time'},
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
      totalPage: 1,
      current: 1,
    }
  },
  methods: {
    back() {
      this.$router.push({name: 'control'})
    },
    getExamDetail(id) {
      this.$router.push({name: 'paperInfo', params: {paperId: id}})
    },
    //分页
    async onChange(pageNumber) {
      console.log('Page: ', pageNumber);
      if (pageNumber <= this.totalPage) {
        let response =await getReleasedPaper(this.$store.getters.getTeacher.id, pageNumber)
        this.papers = response.data.list
        this.totalPage = response.data.pages
      }
    }

  },
  async mounted() {
    let response =await getReleasedPaper(this.$store.getters.getTeacher.id, 1)
    console.log("released",response)
    this.papers = response.data.list
    // console.log(this.papers)
    this.totalPage = response.data.pages
    this.current = 1
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

.content {
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