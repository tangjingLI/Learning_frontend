<template>
  <div>
    <div class="left">
      <a-menu v-model="current" mode="horizontal">
        <a-menu-item key="bank">题库</a-menu-item>
        <!--        <a-menu-item key="knowledge">知识点</a-menu-item>-->
      </a-menu>

      <div v-if="current[0]=='bank'" style="height: 90%;overflow-y: scroll">
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
      <div v-if="paperFlag" class="flag">
        <div class="bar1">
          <a-button class="btn" @click="()=>{this.paperFlag=false;}">
            <a-icon type="left-circle"/>
            返回
          </a-button>
          <a-button class="btn" @click="showModel">
            <a-icon type="safety-certificate" theme="twoTone"/>
            生成试卷
          </a-button>
          <p>
            <a-icon type="rocket" theme="twoTone"/>
            总分
            <span style="font-size: 18px;color: #1C90F5;margin-left: 5px;margin-right: 10px">{{ totalScore }}</span>
          </p>
        </div>
        <div class="bar2">
          <a-input placeholder="请输入试卷名称" v-model="paperName"/>
          <span>
            设为公开？&ensp;
            <a-switch default-checked @change="changePublic"/>
          </span>
          <p>分值</p>
        </div>

        <div class="bar3">
          <a-empty v-if="this.questions.length==0" style="margin-top: 50px"/>

          <div v-for="(test,index) in questions" class="questions">
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

            <a-input-number class="score" :defaultValue="1" :min="1" @change="value=>changeScore(index,value)"/>

            <a-divider class="divider"/>
          </div>


        </div>
      </div>

      <div v-else class="flag">
        <div class="top1">
          <a-button class="btn" @click="back">
            <a-icon type="left-circle"/>
            取消
          </a-button>
          <a-button class="btn" @click="getPaper">
            <a-icon type="thunderbolt" theme="twoTone"/>
            预览试卷
          </a-button>
          <p>
            <a-icon type="rocket" theme="twoTone"/>
            已选题&ensp;
            <span style="color: #1C90F5;font-size: 18px">{{ testNum }}</span>
          </p>
        </div>

        <div class="top2">
          <p>题目</p>
          <a-button v-if="allFlag" class="all" @click="chooseAll">全选</a-button>
          <a-button v-else class="all" @click="cancelAll">取消全选</a-button>
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
          <a-pagination show-quick-jumper :pageSize="1" :total="totalPage1" @change="onChange1" id="page"
                        v-model="page1"/>
        </div>
      </div>
    </div>

    <a-modal v-model="flag1" title="选择课程" @ok="addPaperItem">
      <div class="block">
        <div class="table">
          <a-table :columns="columns" :data-source="courseList" style="background-color: white"
                   rowKey="id" :pagination="false" class="bindTable"
                   :customRow="customRow"   :row-class-name="rowClassName"
          >
            <span slot="customTitle"><a-icon type="smile" theme="twoTone"/>  课程</span>
          </a-table>
        </div>
        <div class="footer">
          <a-pagination :pageSize="1" :total="totalPage2" @change="onChange2" class="page"
                        v-model="page2"/>
        </div>
      </div>

    </a-modal>
  </div>

</template>

<script>
import {getTestBankList, getTestBank, getQuestionList} from "../../api/test";
import {addPaper} from "../../api/paper";
import {getAllCourses} from "../../api/course";

const columns = [
  {
    dataIndex: 'name',
    key: 'title',
    slots: {title: 'customTitle'},
    scopedSlots: {customRender: 'title'},
  }
]

export default {
  name: "CreatePaper",
  data() {
    return {
      columns,
      current: ['bank'],
      banks: [],
      active: '',
      testNum: 0,
      tests: [],//题库题目
      paperFlag: false,
      allFlag: true,
      choose: [],//选中题目id
      questions: [],//选中题目
      paperName: '',
      scores: [],
      totalScore: 0,
      totalPage1: 1,
      totalPage2: 1,
      bankId: 1,
      isPublic: 0,
      flag1: false,
      courseId: -1,
      courseList: [],
      page1: 1,
      page2: 1,
    }
  },
  methods: {
    customRow(record, index) {
      return {
        on: {
          click: () => {
            this.courseId = record.id
            // console.log(this.courseId)
          }
        }
      }
    },
    rowClassName(record,index){
      // console.log(index,record.id === this.courseId)
      return record.id === this.courseId ? 'clickRowStyl' : ''
    },
    changePublic() {
      this.isPublic = this.isPublic === 0 ? 1 : 0;
    },
    //选择题库
    async handleClick(id) {
      let response = await getTestBank(id, 1, 1)
      // let res=await getQuestionList()
      console.log(response)
      this.tests = response.content
      this.bankId = id
      this.totalPage1 = response.totalPage
      this.page1 = 1
    },
    selected(value) {
      this.active = value;
      // console.log(this.active)
    },
    //返回
    back() {
      let id = this.$route.params.bankId
      this.$router.push({name: 'paperList', params: {bankId: id}})
    },
    //选择题目
    addItem(id) {
      if (this.testNum < 30) {
        this.choose.push(id);
        this.testNum++;
      } else {
        this.$message.warning("最多选择30个题目")
      }

      // console.log(this.choose)
    },
    deleteItem(id) {
      let index = this.choose.indexOf(id)
      this.choose.splice(index, 1);
      this.testNum--;
      // console.log(this.choose)

    },
    chooseAll() {
      for (let i = 0; i < this.tests.length; i++) {
        let item = this.tests[i].id
        if (this.choose.indexOf(item) == -1) {
          this.addItem(item)
        }
      }
      this.allFlag = false;
    },
    cancelAll() {
      for (let i = 0; i < this.tests.length; i++) {
        let item = this.tests[i].id
        if (this.choose.indexOf(item) != -1) {
          this.deleteItem(item)
        }
      }
      this.allFlag = true;
    },
    //预览试卷
    async getPaper() {
      this.paperFlag = true
      let id = this.$store.getters.getTeacher.id
      let response = await getQuestionList(this.$store.getters.getTeacher.id, this.choose)
      console.log(response)
      this.questions = response
      this.paperName = ''
      this.scores = []
      this.totalScore = 0
      for (let i = 0; i < this.questions.length; i++) {
        this.scores.push(1)
        this.totalScore++
      }
    },
    async showModel() {
      if (this.paperName == '') {
        this.$message.warning("请输入试卷名")
      } else if (this.testNum == 0) {
        this.$message.warning("请选择至少一个题目")
      } else {
        let response = await getAllCourses(this.$store.getters.getTeacher.id, 1)
        this.courseList = response.content
        this.totalPage2 = response.totalPage
        this.page2 = 1
        this.flag1 = true
      }
    },
    async addPaperItem() {
      let bankId = this.$route.params.bankId
      if (this.courseId == -1) {
        this.$message.warning("请选择课程")
      } else {
        let response = await addPaper(this.choose, this.scores, bankId, this.$store.getters.getTeacher.id, this.isPublic, this.paperName, this.courseId)
        if (response.code == 0) {
          this.$message.success("生成试卷成功")
        } else {
          this.$message.error("生成试卷失败")
        }
        this.courseId = -1
        this.back()
      }
    },
    changeScore(index, value) {
      this.totalScore -= this.scores[index]
      this.totalScore += value
      this.scores[index] = value
      // console.log(this.scores)
    },
    //分页
    async onChange1(pageNumber) {
      if (pageNumber <= this.totalPage1) {
        let response = await getTestBank(this.bankId, pageNumber)
        this.tests = response.res.questions
        this.totalPage1 = response.totalPage
        this.page1 = pageNumber
      }
    },
    async onChange2(pageNumber) {
      if (pageNumber <= this.totalPage2) {
        let response = await getAllCourses(this.$store.getters.getTeacher.id, pageNumber)
        this.courseList = response.content
        this.totalPage2 = response.totalPage
        this.page2 = pageNumber
      }
    },
    async reset() {
      let response = await getTestBankList(this.$store.getters.getTeacher.id);
      // console.log(response)
      this.banks = response
      if (this.banks.length != 0) {
        this.selected(this.banks[0].title)
        await this.handleClick(this.banks[0].id)
      }
    },

  },

  mounted() {
    this.reset()
  },
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

.flag {
  height: 100%;
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
  font-weight: bold;
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

.top1 p, .bar1 p {
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

.all {
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

*
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

.bar1 {
  height: 50px;
  background-color: white;
  /*margin-top: 5px;*/
}

.bar2 {
  height: 50px;
  width: 100%;
  background-color: #e4e9ef;
}

.bar2 input {
  width: 35%;
  margin-top: 10px;
  margin-left: 30px;
  float: left;
}

.bar2 span {
  margin-top: 15px;
  margin-left: 20px;
  float: left;
}

.bar2 p {
  float: right;
  font-size: 15px;
  margin-right: 40px;
  margin-top: 15px;
  letter-spacing: 2px;
  color: #6a6868;
  font-weight: bold;
  margin-bottom: 0;
}

.bar3 {
  height: 82%;
  overflow-y: scroll;
}

.score {
  float: right;
  width: 60px;
  margin-right: 10px;
  margin-top: 10px;
}

.block {
  height: 350px;
}

.table {
  height: 90%;
  overflow-y: scroll;
}

.page {
  margin-right: 10px;
  margin-top: 10px;
  float: right;
}

.footer {
  height: 50px;
  background-color: white;
  margin: 0 5px;
}

/deep/.clickRowStyl {
  background-color: rgba(0, 180, 237, 0.2)
}

/*.ant-table-tbody > .clickRowStyl:hover > td {*/
/*  background-color: #00b4ed*/
/*}*/

</style>