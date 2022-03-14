<template>
  <div class="knowledge">
    <div class="left">
      <a-menu v-model="current" mode="horizontal" @click="()=>{this.active='';this.chooseItem=null}">
        <a-menu-item key="ability">能力</a-menu-item>
        <a-menu-item key="knowledge">知识点</a-menu-item>
        <a-menu-item key="quality">品行</a-menu-item>
      </a-menu>

      <div v-if="current[0]=='ability'" class="content">
        <a-empty v-if="this.abilityList.length==0" style="margin-top: 30px"/>
        <div class="box" v-for="item in abilityList" @click="chooseAbility(item.id)">
          <a-popconfirm
              title="确定删除该能力吗?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="deleteAbilityItem(item.id)"
          >
            <a-icon type="delete" class="deleteItem"/>
          </a-popconfirm>
          <p class="item" :class="{active :active==item.id}">
            <a-icon type="smile" theme="twoTone"/>
            {{ item.name }}
          </p>
          <p class="brief">{{ item.brief }}</p>
          <a-divider class="divider"/>
        </div>

      </div>

      <div v-else-if="current[0]=='knowledge'" class="content">
        <div class="box" v-for="item in knowledgeList" @click="chooseKnowledge(item.id)">
          <a-popconfirm
              title="确定删除该知识点吗?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="deleteKnowledgeItem(item.id)"
          >
            <a-icon type="delete" class="deleteItem"/>
          </a-popconfirm>
          <p class="item" :class="{active :active==item.id}">
            <a-icon type="smile" theme="twoTone"/>
            {{ item.name }}
          </p>
          <p class="skill">技能水平： {{ item.skill_level }}</p>
          <a-divider class="divider"/>
        </div>
      </div>

      <div v-else class="content">
        <div class="box" v-for="item in qualityList" @click="chooseQuality(item.id)">
          <a-popconfirm
              title="确定删除该品行吗?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="deleteQualityItem(item.id)"
          >
            <a-icon type="delete" class="deleteItem"/>
          </a-popconfirm>
          <p class="item" :class="{active :active==item.id}">
            <a-icon type="smile" theme="twoTone"/>
            {{ item.name }}
          </p>
          <a-divider class="divider"/>
        </div>
      </div>

      <div class="footer">
        <a-pagination simple :default-current="1" :pageSize="1" :total="page" @change="onChange" id="page"/>
      </div>

    </div>

    <div class="right">
      <div class="top">
        <a-button class="btn">
          <a-icon type="plus-circle"/>
          添加技能
        </a-button>
        <a-button class="btn">
          <a-icon type="plus-circle"/>
          添加知识点
        </a-button>
        <a-button class="btn">
          <a-icon type="plus-circle"/>
          添加品行
        </a-button>
      </div>

      <div class="bar">
        <p></p>
      </div>

      <div class="info">
        <a-empty v-if="this.chooseItem==null" style="margin-top: 30px"/>
      </div>

    </div>

  </div>
</template>

<script>
import {
  getAbilityList,
  getKnowledgeList,
  getQualityList,
  addAbility,
  addKnowledge,
  addQuality,
  deleteAbility,
  deleteKnowledge,
  deleteQuality
} from "../../api/course";

export default {
  name: "Knowledge",
  data() {
    return {
      current: ['ability'],
      abilityList: [],
      knowledgeList: [],
      qualityList: [],
      totalPage: [],
      active: '',
      chooseItem: null,
    }
  },
  methods: {
    //分页
    onChange(pageNumber) {
      console.log('Page: ', pageNumber);
      if (pageNumber <= this.totalPage) {
        if (this.current[0] == 'ability') {
          let response = getAbilityList(this.$store.getters.getTeacher.id, pageNumber)
          this.abilityList = response.abilities

        } else if (this.current[0] == 'knowledge') {
          let response = getKnowledgeList(this.$store.getters.getTeacher.id, pageNumber)
          this.knowledgeList = response.knowledge

        } else {
          let response = getQualityList(this.$store.getters.getTeacher.id, pageNumber)
          this.qualityList = response.qualities

        }
      }
    },
    //选择
    chooseAbility(id) {
      this.active = id
    },
    chooseKnowledge(id) {
      this.active = id

    },
    chooseQuality(id) {
      this.active = id

    },
    //添加
    addAbilityItem() {

    },
    addKnowledgeItem() {

    },
    addQualityItem() {

    },
    //删除
    deleteAbilityItem(id) {

    },
    deleteKnowledgeItem(id) {

    },
    deleteQualityItem(id) {

    },
  },
  mounted() {
    let res1 = getAbilityList(this.$store.getters.getTeacher.id, 1)
    this.abilityList = res1.abilities
    this.totalPage.push(res1.totalPage)

    let res2 = getKnowledgeList(this.$store.getters.getTeacher.id, 1)
    this.knowledgeList = res2.knowledge
    this.totalPage.push(res2.totalPage)

    let res3 = getQualityList(this.$store.getters.getTeacher.id, 1)
    this.qualityList = res3.qualities
    this.totalPage.push(res3.totalPage)

  },
  computed: {
    page: {
      get: function () {
        if (this.current[0] == 'ability') {
          return this.totalPage[0]
        } else if (this.current[0] == 'knowledge') {
          return this.totalPage[1]
        } else {
          return this.totalPage[2]
        }
      },
    }
  }
}
</script>

<style scoped>
.divider {
  margin: 0;
}

.left {
  width: 30%;
  float: left;
  background-color: white;
  height: 99%;
  margin-left: 15px;
  margin-top: 10px;
  box-shadow: 2px 2px 5px #bdbcbc;
}

.content {
  height: 80%;
  overflow-y: scroll;
}

.box {
  padding-top: 5px;
}

.item {
  margin-left: 35px;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 15px;
  letter-spacing: 2px;
  font-weight: bold;
}

.brief, .skill {
  margin-left: 35px;
  font-size: 13px;
  width: 75%;
}

.footer {
  height: 10%;
}

#page {
  margin-right: 10px;
  margin-top: 10px;
  float: right;
}

.deleteItem {
  margin-top: 10px;
  margin-right: 15px;
  float: right;
  font-size: 15px;
}

.right {
  width: 66%;
  float: right;
  background-color: white;
  height: 99%;
  margin-right: 15px;
  margin-top: 10px;
  box-shadow: 2px 2px 5px #bdbcbc;
}

.top {
  height: 40px;
}

.btn {
  float: right;
  margin-right: 25px;
  margin-top: 10px;
  background-color: #1C90F5;
  color: white;
  border: none;
}

.bar {
  background-color: #e4e9ef;
  height: 40px;
}

.active {
  color: #1c90f5;
  font-weight: bold;
}
</style>