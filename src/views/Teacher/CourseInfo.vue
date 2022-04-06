<template>
  <div>
    <div class="top">
      <a-button
          style=" float:left;margin-top: 5px;background-color: white;color: #1C90F5;border: 1px solid #1C90F5;margin-left: 10px;height: 70%;"
          @click="back">
        <a-icon type="left-circle"/>
        返回
      </a-button>
      <!--      <h1> {{ course.name }} </h1>-->
      <h1>{{ title }}</h1>
      <a-button id="edit"
                style=" margin-top: 5px;background-color: white;color: #1C90F5;border: 1px solid #1C90F5;margin-right: 10px;float: right;">
        <a-icon type="setting"/>
        编辑
      </a-button>
    </div>

    <div class="box">
      <div class="info">
        <img src="../../assets/course.jpg" id="image">
        <div class="brief">
          <p>
          <span style="font-weight: bold">
            课程简介：
          </span>
            {{ brief }}
          </p>
        </div>


      </div>
      <div class="content">
        <a-menu v-model="current" mode="horizontal">
          <a-menu-item key="chapter">
            <a-icon type="carry-out" theme="twoTone"/>
            目录
          </a-menu-item>
          <a-menu-item key="exam">
            <a-icon type="bug" theme="twoTone"/>
            试卷
          </a-menu-item>
          <a-menu-item key="ability" @click="getAbilityList">
            <a-icon type="compass" theme="twoTone"/>
            能力
          </a-menu-item>
          <a-menu-item key="knowledge" @click="getKnowledgeList">
            <a-icon type="environment" theme="twoTone"/>
            知识点
          </a-menu-item>
          <a-menu-item key="quality" @click="getQualityList">
            <a-icon type="crown" theme="twoTone"/>
            品行
          </a-menu-item>
        </a-menu>

        <div v-if="current[0]==='chapter'">
        </div>

        <div v-else-if="current[0]==='exam'">
          <div class="table">
            <a-table :columns="columns2" :data-source="paperList" style="background-color: white" :pagination="false"
                     :rowKey="record=>record.id"
            >
              <span slot="customTitle"><a-icon type="smile" theme="twoTone"/>  试卷</span>

            </a-table>
          </div>
        </div>

        <div v-else-if="current[0]==='ability'">
          <div class="table">
            <a-table :columns="columns3" :data-source="abilityList" style="background-color: white" :pagination="false"
                     :rowKey="record=>record.id"
            >
              <span slot="customTitle"><a-icon type="smile" theme="twoTone"/>  能力</span>
              <span slot="action" slot-scope="text, record">
                <a @click="">修改</a>
                <a-divider type="vertical"/>
                <a-popconfirm
                    title="确定删除该能力吗?"
                    ok-text="Yes"
                    cancel-text="No"
                    @confirm="deleteAbilityItem(record.id)"
                >
                 <a href="#">删除</a>
              </a-popconfirm>
              </span>


            </a-table>
          </div>

        </div>

        <div v-else-if="current[0]==='knowledge'">
          <div class="table">
            <a-table :columns="columns4" :data-source="knowledgeList" style="background-color: white"
                     :pagination="false"
                     :rowKey="record=>record.id"
            >
              <span slot="customTitle"><a-icon type="smile" theme="twoTone"/>  知识点</span>

              <span slot="action" slot-scope="text, record">
                <a @click="">修改</a>
                <a-divider type="vertical"/>
                <a-popconfirm
                    title="确定删除该知识点吗?"
                    ok-text="Yes"
                    cancel-text="No"
                    @confirm="deleteKnowledgeItem(record.id)"
                >
                 <a href="#">删除</a>
              </a-popconfirm>
              </span>


            </a-table>
          </div>

        </div>

        <div v-else>
          <div class="table">
            <a-table :columns="columns5" :data-source="qualityList" style="background-color: white" :pagination="false"
                     :rowKey="record=>record.id"
            >
              <span slot="customTitle"><a-icon type="smile" theme="twoTone"/>  品行</span>
              <span slot="action" slot-scope="text, record">
                <a @click="">修改</a>
                <a-divider type="vertical"/>
                <a-popconfirm
                    title="确定删除该品行吗?"
                    ok-text="Yes"
                    cancel-text="No"
                    @confirm="deleteQualityItem(record.id)"
                >
                 <a href="#">删除</a>
              </a-popconfirm>
              </span>
            </a-table>
          </div>

        </div>

      </div>

    </div>
  </div>
</template>

<script>
import {getCourseDetail, getAbility, getKnowledge, getQuality} from "../../api/course";

const columns1 = [
  {
    dataIndex: 'title',
    key: 'title',
    slots: {title: 'customTitle'},
    scopedSlots: {customRender: 'title'},
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: {customRender: 'action'},
  }
];

const columns2 = [
  {
    dataIndex: 'title',
    key: 'title',
    slots: {title: 'customTitle'},
    scopedSlots: {customRender: 'title'},
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: {customRender: 'action'},
  }
];

const columns3 = [
  {
    dataIndex: 'title',
    key: 'title',
    slots: {title: 'customTitle'},
    scopedSlots: {customRender: 'title'},
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: {customRender: 'action'},
  }
];

const columns4 = [
  {
    dataIndex: 'title',
    key: 'title',
    slots: {title: 'customTitle'},
    scopedSlots: {customRender: 'title'},
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: {customRender: 'action'},
  }
];

const columns5 = [
  {
    dataIndex: 'name',
    key: 'title',
    slots: {title: 'customTitle'},
    scopedSlots: {customRender: 'title'},
    width: 150,
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: {customRender: 'action'},
    width: 150,

  }
];

export default {
  name: "CourseInfo",
  data() {
    return {
      current: ['chapter'],
      title: "c++",
      brief: "这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介",
      chapterList: [],
      paperList: [],
      abilityList: [],
      knowledgeList: [],
      qualityList: [],
      columns1,
      columns2,
      columns3,
      columns4,
      columns5,

    }
  },
  methods: {
    async reset() {
      // let response = await getCourseDetail(this.$store.getters.getTeacher.id, this.$route.params.courseId)
    },
    back() {
      this.$router.push('/teacher/courseList')
    },
    //查看能力
    async getAbilityList() {
      let response = await getAbility(this.$route.params.courseId, 1)
    },
    //删除能力
    async deleteAbilityItem(id) {

    },
    //查看知识点
    async getKnowledgeList() {
      let response = await getKnowledge(this.$route.params.courseId, 1)
    },
    //删除知识点
    async deleteKnowledgeItem(id) {

    },
    //查看品行
    async getQualityList() {
      let response = await getQuality(this.$route.params.courseId, 1)
      this.qualityList = response
    },
    //删除品行
    async deleteQualityItem(id) {

    }
  },
  mounted() {
    this.reset()
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
  background-color: white;
  margin-top: 10px;
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

.box {
  margin: 10px 10px;
  height: 90%;
  background-color: white;
}

.info {
  height: 25%;
}

.brief {
  float: left;
  width: 65%;
}


.info p {
  float: left;
  margin-top: 30px;
  margin-left: 30px;
  font-size: 15px;
}

#image {
  height: 120px;
  width: 230px;
  float: left;
  margin-left: 30px;
  margin-top: 10px;
}

.content {
  height: 75%;
}

.action {
  height: 40px;
}

.table {
  height: 300px;
  overflow-y: scroll;
}

</style>