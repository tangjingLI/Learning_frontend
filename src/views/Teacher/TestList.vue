<template>
  <div class="test">
    <div class="top">
      <a-button
          style=" float:left;margin-top: 5px;background-color: white;color: #1C90F5;border: 1px solid #1C90F5;margin-left: 10px;height: 70%"
      @click="back">
        返回
      </a-button>
      <h1> {{ bankTitle }}</h1>
      <a-tag v-if="isPublic==0" color="green" style="margin-left: 5px;margin-top: 8px">public</a-tag>
      <a-tag v-else color="orange" style="margin-left: 5px;margin-top: 8px">private</a-tag>
      <a-button id="edit"
                style=" margin-top: 5px;background-color: white;color: #1C90F5;border: 1px solid #1C90F5;margin-right: 10px;float: right">
        <a-icon type="setting"/>
        编辑题库
      </a-button>


      <a-button id="add"
                style="  margin-top: 5px;background-color: #1C90F5;color: white;border: none;float: right;margin-right: 5px">
        <a-icon type="plus-circle"/>
        添加题目
      </a-button>

      <a-input-search placeholder="输入题目内容" enter-button @search="onSearch" id="search"
                      style="width: 30%; float: right;margin-top: 5px;margin-right: 5px"/>
    </div>

    <div class="table">
      <a-table :columns="columns" :data-source="questions" style="background-color: white" :pagination="pagination" rowKey="id">
        <span slot="customTitle"><a-icon type="smile" theme="twoTone" /> 题目</span>

        <span slot="type" slot-scope="type">
          <a-tag v-if="type==1" color="blue">单选</a-tag>
          <a-tag v-else-if="type==2" color="purple">多选</a-tag>
          <a-tag v-else color="pink">简答</a-tag>
        </span>

        <span slot="action" slot-scope="text, record">
          <a>查看</a>
          <a-divider type="vertical"/>
          <a>删除</a>
          <a-divider type="vertical"/>
          <a>移动</a>
        </span>

      </a-table>
    </div>
  </div>
</template>

<script>
import {getTestBank} from "../../api/test";

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
    title: '操作',
    key: 'action',
    scopedSlots: {customRender: 'action'},
  }
];


export default {
  name: "TestList",
  data() {
    return {
      bankTitle: '',
      questions: [],
      isPublic: 0,
      columns,
      msg:'',
      pagination: {
        pageSize: 7
      }
    }
  },
  mounted() {
    // console.log(this.$route.params);
    let params = this.$route.params;
    let response = getTestBank(params.bankId);
    this.bankTitle = response.res.bankTitle;
    this.questions = response.res.questions;
    this.isPublic = response.isPublic;
  },
  methods: {
    onSearch(value) {
      console.log(value);
    },
    back(){
      this.$router.push({name:'testBank'})
    }
  }
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