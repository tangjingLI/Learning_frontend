<template>
  <div>
    <div class="top">
      <p>题库回收站</p>
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
      <a-table :columns="columns" :data-source="banks" style="background-color: white" :pagination="false"
               rowKey="id">
        <span slot="customTitle"><a-icon type="smile" theme="twoTone"/>  题库</span>

        <span slot="isPublic" slot-scope="isPublic">
          <a-tag v-if="isPublic==0" color="green">public</a-tag>
          <a-tag v-else color="orange">private</a-tag>
        </span>

        <span slot="action" slot-scope="text, record">
          <a @click="restore(record.id)">恢复</a>
          <a-divider type="vertical"/>
          <a-popconfirm
              title="确定彻底删除该题库吗?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="confirm(record.id)"
          >
            <a href="#">删除</a>
          </a-popconfirm>
        </span>

      </a-table>
    </div>

    <div class="footer">
      <a-pagination show-quick-jumper :pageSize="1" :total="totalPage" @change="onChange" id="page" v-model="current"/>
    </div>
  </div>
</template>

<script>
import {getTestBankBin, restoreTestBank, dropTestBank} from "../../api/test";

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
  name: "TestBankBin",
  data() {
    return {
      columns,
      banks: [],
      totalPage: 1,
      current:1,
    }
  },
  methods: {
    back() {
      this.$router.push({name: 'control'})
    },
    async restore(id) {
      let response =await restoreTestBank(id, this.$store.getters.getTeacher.id)
      console.log(response)
      if (response.code == 0) {
        this.$message.success("恢复成功")
        await this.reset()
      } else {
        this.$message.error("恢复失败")
      }
    },
    async confirm(id) {
      let response =await dropTestBank(id, this.$store.getters.getTeacher.id)
      if (response.code == 0) {
        this.$message.success("删除成功")
        await this.reset()
      } else {
        this.$message.error("删除失败")
      }
    },
    deleteAll() {
      for (let i = 0; i < this.banks.length; i++) {
        this.confirm(this.banks[i].id)
      }
    },
    //分页
    async onChange(pageNumber) {
      console.log('Page: ', pageNumber);
      if (pageNumber <= this.totalPage) {
        let response =await getTestBankBin(this.$store.getters.getTeacher.id, pageNumber)
        this.banks = response.content
        this.totalPage = response.totalPage
      }
    },
    async reset(){
      let response =await getTestBankBin(this.$store.getters.getTeacher.id, 1)
      console.log(response)
      this.banks = response.content
      this.totalPage = response.totalPage
      this.current=1
    }
  },
  mounted() {
    this.reset()
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