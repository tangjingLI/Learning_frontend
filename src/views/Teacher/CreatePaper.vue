<template>
  <div>
    <div class="left">
      <a-menu v-model="current" mode="horizontal">
        <a-menu-item key="bank">题库</a-menu-item>
        <a-menu-item key="knowledge">知识点</a-menu-item>
      </a-menu>

      <div v-if="current=='bank'" style="height: 90%;overflow-y: scroll">
        <a-list item-layout="horizontal" :data-source="banks">
          <a-list-item slot="renderItem" slot-scope="item, index" class="bankItem">
            <a-list-item-meta>
              <a slot="title" class="title" @click="selected(item.title);handleClick(item.id)"
                 :class="{active :active==item.title}">
                <a-icon type="smile" theme="twoTone"/> &ensp; {{ item.title }}</a>
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </div>
    </div>

    <div class="right">
      <div class="top1">
        <a-button class="btn" @click="back">
          <a-icon type="left-circle"/>
          取消
        </a-button>
        <p>
          <a-icon type="rocket" theme="twoTone"/>
          已选题&ensp;
          <span style="color: #1C90F5;font-size: 18px">{{ testNum }}</span>
        </p>
      </div>

      <div class="top2">
        <p>题目</p>
        <a-button id="all">全选</a-button>
      </div>

      <div class="content">
        <a-empty v-if="active==''" style="margin-top: 50px"/>

        <div v-for="test in tests" class="questions">
          <div class="box">
            <h1>
              {{ test.title }}
              <a-tag v-if="test.type==1" color="blue">单选</a-tag>
              <a-tag v-else-if="test.type==2" color="purple">多选</a-tag>
              <a-tag v-else color="pink">简答</a-tag>
            </h1>
            <p>{{ test.content }}</p>
            <p>
              正确率：{{ test.rate * 100 }}%
              <a-divider type="vertical"/>
              预计耗时：{{ test.consume }}分钟
            </p>
          </div>

          <button v-if="choose.indexOf(test.id)==-1" @click="addItem(test.id)" class="btn1">选择</button>
          <button v-else class="btn2" @click="deleteItem(test.id)">移除</button>
          <a-divider class="divider"/>
        </div>
      </div>

      <div class="footer">
        <a-pagination show-quick-jumper :default-current="2" :total="500" @change="onChange" id="page"/>
      </div>

    </div>
  </div>

</template>

<script>
import {getAllTestBank, getTestBank} from "../../api/test";

export default {
  name: "CreatePaper",
  data() {
    return {
      current: ['bank'],
      banks: [],
      active: '',
      testNum: 0,
      tests: [],
      choose: [],
    }
  },
  methods: {
    //选择题库
    handleClick(id) {
      let response = getTestBank(id)
      this.tests = response.res.questions

    },
    selected(value) {
      this.active = value;
      // console.log(this.active)
    },
    //分页
    onChange(pageNumber) {
      console.log('Page: ', pageNumber);
    },
    //返回
    back() {
      let id = this.$route.params.bankId
      this.$router.push({name: 'paperList', params: {bankId: id}})
    },
    //选择题目
    addItem(id) {
      this.choose.push(id)
      // console.log(this.choose)
    },
    deleteItem(id) {
      let index=this.choose.indexOf(id)
      this.choose.splice(index,1)
      // console.log(this.choose)

    }

  },
  mounted() {
    let response = getAllTestBank(this.$store.getters.getTeacher.id);
    this.banks = response.res;
    console.log(this.banks)
    if (this.banks.length != 0) {
      this.selected(this.banks[0].title)
      this.handleClick(this.banks[0].id)
    }
  }
}
</script>

<style scoped>

.left {
  width: 20%;
  float: left;
  background-color: white;
  height: 99%;
  margin-left: 15px;
  margin-top: 10px;
  box-shadow: 2px 2px 5px #bdbcbc;
}

.right {
  width: 76%;
  float: right;
  background-color: white;
  height: 99%;
  margin-right: 15px;
  margin-top: 10px;
  box-shadow: 2px 2px 5px #bdbcbc;
}

.title {
  margin-left: 30px;
  font-size: 13px;
  letter-spacing: 2px;
}

.bankItem {
  height: 40px;
}

.active {
  color: #1c90f5;
}

.top1 {
  height: 50px;
}

.btn {
  float: left;
  margin-top: 10px;
  background-color: white;
  color: #1C90F5;
  border: 1px solid #1C90F5;
  margin-left: 10px;
  height: 60%;
}

.top1 p {
  float: right;
  margin-right: 10px;
  margin-top: 10px;
  font-size: 15px;
  margin-bottom: 0;
}

.top2 {
  height: 50px;
  background-color: #e4e9ef;

}

.top2 p {
  float: left;
  margin-left: 30px;
  margin-top: 10px;
  margin-bottom: 0;
  /*padding-top: 10px;*/
  font-size: 18px;
  letter-spacing: 2px;
}

.top2 #all {
  float: right;
  margin-top: 10px;
  margin-right: 30px;
  background-color: white;
  color: #1C90F5;
  border: 1px solid #1C90F5;
  height: 60%;
}

.content {
  height: 72%;
  overflow-y: scroll;
}

.questions {
  /*border-bottom: 1px solid #a8c1ef;*/
}

.divider {
  margin: 0;
}

.box {
  float: left;
  width: 70%;
  margin-top: 0;
  padding: 0;
}

.box h1 {
  margin-top: 15px;
  margin-left: 15px;
  letter-spacing: 2px;
  font-size: 15px;
  color: #6a6868;
}

.box p {
  margin-left: 15px;
}

.btn1 {
  border-radius: 5px;
  padding: 5px 18px;
  float: right;
  margin-right: 10px;
  margin-top: 10px;
  color: white;
  background-color: #1C90F5;
  border: none;
}

.btn2 {
  border-radius: 5px;
  padding: 5px 18px;
  float: right;
  margin-right: 10px;
  margin-top: 10px;
  color: white;
  background-color: #939393;
  border: none;
}

.footer {
  height: 10%;
}

#page {
  margin-right: 10px;
  margin-top: 10px;
  float: right;
}

</style>