<template>
  <div>
    <div class="top">
      <a-button
          style=" float:left;margin-top: 5px;background-color: white;color: #1C90F5;border: 1px solid #1C90F5;margin-left: 10px;height: 70%;"
          @click="back">
        <a-icon type="left-circle"/>
        返回
      </a-button>
      <h1>{{ title }}</h1>

      <a-button @click="showBind1"
                style=" margin-top: 5px;background-color: white;color: #1C90F5;border: 1px solid #1C90F5;margin-right: 10px;float: right;">
        <a-icon type="setting"/>
        绑定知识点
      </a-button>

      <a-button @click="showBind2"
                style=" margin-top: 5px;background-color: white;color: #1C90F5;border: 1px solid #1C90F5;margin-right: 10px;float: right;">
        <a-icon type="setting"/>
        绑定品行
      </a-button>
    </div>

    <div class="content">
      <a-menu v-model="current" mode="horizontal">
        <a-menu-item key="knowledge" @click="getKnowledgeList(1)">
          <a-icon type="environment" theme="twoTone"/>
          知识点
        </a-menu-item>
        <a-menu-item key="quality" @click="getQualityList(1)">
          <a-icon type="crown" theme="twoTone"/>
          品行
        </a-menu-item>
      </a-menu>

      <div v-if="current[0]==='knowledge'" class="block">
        <div class="table">
          <a-table :columns="columns1" :data-source="knowledgeList" style="background-color: white"
                   :pagination="false"
                   :rowKey="record=>record.id"
          >
            <span slot="customTitle"><a-icon type="smile" theme="twoTone"/>  知识点</span>

            <span slot="action" slot-scope="text, record">
                <a-popconfirm
                    title="确定解绑该知识点吗?"
                    ok-text="Yes"
                    cancel-text="No"
                    @confirm="deleteKnowledgeItem(record.id)"
                >
                 <a href="#">解绑</a>
              </a-popconfirm>
              </span>
          </a-table>
        </div>
        <div class="footer">
          <a-pagination :pageSize="1" :total="totalPage1" @change="onChange1" class="page"
                        v-model="page1"/>
        </div>
      </div>

      <div v-else class="block">
        <div class="table">
          <a-table :columns="columns2" :data-source="qualityList" style="background-color: white" :pagination="false"
                   :rowKey="record=>record.id"
          >
            <span slot="customTitle"><a-icon type="smile" theme="twoTone"/>  品行</span>

            <span slot="action" slot-scope="text, record">
                <a-popconfirm
                title="确定解绑该品行吗?"
                ok-text="Yes"
                cancel-text="No"
                @confirm="deleteQualityItem(record.id)"
                >
                 <a href="#"> 解绑</a>
              </a-popconfirm>
              </span>
          </a-table>
        </div>

        <div class="footer">
          <a-pagination :pageSize="1" :total="totalPage2" @change="onChange2" class="page"
                        v-model="page2"/>
        </div>
      </div>
    </div>

    <a-modal v-model="flag1" title="绑定知识点" @ok="confirm1">
      <div class="box">
        <a-table :columns="columns2" :data-source="allKnowledge" style="background-color: white"
                 rowKey="id" :pagination="false" class="bindTable"
        >
          <span slot="customTitle"><a-icon type="smile" theme="twoTone"/>  知识点</span>
          <span slot="action" slot-scope="text, record">
          <a @click="chooseSkill(record.id,record.name)">绑定</a>
          </span>
        </a-table>
        <div class="footer">
          <a-pagination :pageSize="1" :total="totalPage3" @change="onChange3" class="page"
                        v-model="page3"/>
        </div>
      </div>


    </a-modal>

    <a-modal v-model="flag2" title="绑定品行" @ok="confirm2">
      <div class="box">
        <a-table :columns="columns2" :data-source="allQuality" style="background-color: white"
                 rowKey="id" :pagination="false" class="bindTable"
        >
          <span slot="customTitle"><a-icon type="smile" theme="twoTone"/>  品行</span>
          <span slot="action" slot-scope="text, record">
          <a @click="bindQualityItem(record.id,record.name)">绑定</a>
        </span>
        </a-table>
        <div class="footer">
          <a-pagination :pageSize="1" :total="totalPage4" @change="onChange4" class="page"
                        v-model="page4"/>
        </div>
      </div>

    </a-modal>

    <a-modal v-model="flag3" :title="knowledgeName" @ok="bindKnowledgeItem">
      <a-form :form="form1" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-form-item label="技能">
          <a-select style="width: 120px"
                    v-decorator="['skill',{rules:[{required: true,message:'不能为空'}]}]">
            <a-select-option value="记忆">
              记忆
            </a-select-option>
            <a-select-option value="理解">
              理解
            </a-select-option>
            <a-select-option value="运用">
              运用
            </a-select-option>
            <a-select-option value="分析">
              分析
            </a-select-option>
            <a-select-option value="评价">
              评价
            </a-select-option>
            <a-select-option value="创造">
              创造
            </a-select-option>

          </a-select>
        </a-form-item>
      </a-form>

    </a-modal>

  </div>
</template>

<script>
import {
  bindKnowledge,
  bindQuality, deleteKnowledge, deleteQuality,
  getAbilityInfo,
  getAllQuality,
  getKnowledge,
  getKnowledgeByAbility,
  getQualityByAbility
} from "../../api/course";

const columns1 = [
  {
    dataIndex: 'name',
    key: 'title',
    slots: {title: 'customTitle'},
    scopedSlots: {customRender: 'title'},
  },
  {
    title: '技能',
    key: 'skill',
    dataIndex: 'skillId',
    scopedSlots: {customRender: 'skill'},
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: {customRender: 'action'},

  }
];

const columns2 = [
  {
    dataIndex: 'name',
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

export default {
  name: "Ability",
  data() {
    return {
      title: '',
      columns1,
      columns2,
      courseId: -1,
      knowledgeList: [],
      qualityList: [],
      current: ['knowledge'],
      flag1: false,
      flag2: false,
      flag3: false,
      knowledgeName: '',
      knowledgeId: -1,
      allQuality: [],
      allKnowledge: [],
      totalPage1: 1,
      totalPage2: 1,
      totalPage3: 1,
      totalPage4: 1,
      page1: 1,
      page2: 1,
      page3: 1,
      page4: 1,
      form1: this.$form.createForm(this, {name: 'skill'}),
    }
  },
  methods: {
    //换页
    async onChange1(pageNumber) {
      if (pageNumber <= this.totalPage1) {
        await this.getKnowledgeList(pageNumber)
      }
    },
    async onChange2(pageNumber) {
      if (pageNumber <= this.totalPage1) {
        await this.getQualityList(pageNumber)
      }
    },
    async onChange3(pageNumber) {
      if (pageNumber <= this.totalPage1) {
        let response = await getKnowledge(this.courseId, pageNumber)
        this.allKnowledge = response.content
        this.totalPage3 = response.totalPage
        this.page3 = pageNumber
      }
    },
    async onChange4(pageNumber) {
      if (pageNumber <= this.totalPage1) {
        let response = await getAllQuality(pageNumber)
        this.allQuality = response.content
        this.totalPage4 = response.totalPage
        this.page4 = pageNumber
      }
    },
    //绑定
    async showBind1() {
      this.flag1 = true
      let response = await getKnowledge(this.courseId, 1)
      this.allKnowledge = response.content
      this.totalPage3 = response.totalPage
      this.page3 = 1
    },
    async showBind2() {
      this.flag2 = true
      let response = await getAllQuality(1)
      this.allQuality = response.content
      this.totalPage4 = response.totalPage
      this.page4 = 1
    },
    chooseSkill(id, name) {
      this.flag3 = true
      this.knowledgeName = name
      this.knowledgeId = id
    },
    confirm1() {
      this.flag1 = false
    },
    confirm2() {
      this.flag2 = false
    },
    async bindKnowledgeItem(e) {
      e.preventDefault()
      this.form1.validateFields(async (err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          let response = await bindKnowledge(this.$route.params.abilityId, this.knowledgeId, values.skill, this.knowledgeName, this.courseId)
          this.flag3 = false
          this.form1.resetFields()
          if (response.code == 0) {
            this.$message.success("绑定成功！")
            await this.getKnowledgeList(this.page1)
          } else {
            this.$message.error("绑定失败")
          }
        }
      })
    },
    async bindQualityItem(id, name) {
      let response = await bindQuality(this.$route.params.abilityId, id, this.courseId, name)
      if (response.code == 0) {
        this.$message.success("绑定成功！")
        await this.getQualityList(this.page2)
      } else {
        this.$message.error("绑定失败")
      }
    },
    async reset() {
      let res = await getAbilityInfo(this.$route.params.abilityId)
      this.courseId = res.courseId
      this.title = res.name
      await this.getKnowledgeList(1)
    },
    back() {
      this.$router.push({name: 'courseInfo', params: {courseId: this.courseId}})
    },
    async getKnowledgeList(page) {
      let response = await getKnowledgeByAbility(this.$route.params.abilityId, page)
      this.knowledgeList = response.content
      this.totalPage1 = response.totalPage
      this.page1 = page
    },
    async getQualityList(page) {
      let response = await getQualityByAbility(this.$route.params.abilityId, page)
      this.qualityList = response.content
      this.totalPage2 = response.totalPage
      this.page2 = page
    },
    //解绑
    async deleteKnowledgeItem(id) {
      let response = await deleteKnowledge(id)
      if (response.code == 0) {
        this.$message.success('解绑成功！')
        await this.getKnowledgeList(this.page3)
      } else {
        this.$message.error("解绑失败")
      }
    },
    async deleteQualityItem(id) {
      let response = await deleteQuality(id)
      if (response.code == 0) {
        this.$message.success('解绑成功！')
        await this.getQualityList(this.page4)
      } else {
        this.$message.error("解绑失败")
      }
    },
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
  margin-top: 10px;
  margin-bottom: 15px;
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
  height: 350px;
}

.bindTable {
  height: 330px;
  overflow-y: scroll;
}

.content {
  height: 90%;
  background-color: white;
}

.table {
  height: 420px;
  overflow-y: scroll;
  margin: 0 5px;

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


</style>