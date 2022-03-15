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
        <div class="list">
          <div class="box" v-for="item in abilityList" @click="chooseAbility(item)">
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

        <div class="footer">
          <a-pagination simple :default-current="1" v-model="current3" :pageSize="1" :total="page3" @change="onChange3"
                        class="page"/>
        </div>
      </div>

      <div v-else-if="current[0]=='knowledge'" class="content">
        <div class="list">
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

        <div class="footer">
          <a-pagination simple :default-current="1" v-model="current4" :pageSize="1" :total="page4" @change="onChange4"
                        class="page"/>
        </div>
      </div>

      <div v-else class="content">
        <div class="list">
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
          <a-pagination simple :default-current="1" v-model="current5" :pageSize="1" :total="page5" @change="onChange5"
                        class="page"/>
        </div>
      </div>

    </div>

    <div class="right">
      <div class="top">
        <a-button class="btn" @click="()=>{this.addAbilityFlag=true}"
                  style="float: right;margin-right: 25px;margin-top: 5px;background-color: #1C90F5;color: white;border: none;">

          <a-icon type="plus-circle"/>
          添加能力
        </a-button>
        <a-button class="btn" @click="()=>{this.addKnowledgeFlag=true}"
                  style="float: right;margin-right: 25px;margin-top: 5px;background-color: #1C90F5;color: white;border: none;">

          <a-icon type="plus-circle"/>
          添加知识点
        </a-button>
        <a-button class="btn" @click="()=>{this.addQualityFlag=true}"
                  style="float: right;margin-right: 25px;margin-top: 5px;background-color: #1C90F5;color: white;border: none;">

          <a-icon type="plus-circle"/>
          添加品行
        </a-button>
      </div>

      <div class="bar">
        <p v-if="chooseItem!=null">{{ chooseItem.name }}</p>
      </div>

      <div class="info">
        <a-empty v-if="this.chooseItem==null" style="margin-top: 30px;margin-bottom: 0"/>
        <div v-else style="height: 100%;background-color: #e4e9ef;">
          <div class="box1">
            <div class="action">
              <a-button class="btn" @click="()=>{this.bindKnowledgeFlag=true}"
                        style="float: right;margin-right: 15px;margin-top: 5px;background-color: white;color: #1C90F5;border: 1px solid #1C90F5;">

                <a-icon type="plus-circle"/>
                绑定知识点
              </a-button>
              <a-popconfirm
                  :disabled="!hasSelected1"
                  title="确定解绑所选知识点吗?"
                  ok-text="Yes"
                  cancel-text="No"
                  @confirm="unbindKnowledgeItems"
              >
                <a-button :disabled="!hasSelected1" type="danger"
                          style=" margin-top: 5px;margin-right: 10px;float: right">
                  解绑知识点
                </a-button>
              </a-popconfirm>
            </div>
            <div class="table">
              <a-table :columns="columns1" :data-source="knowledgeArray" style="background-color: white"
                       :pagination="false"
                       :rowKey="record=>record.id"
                       :row-selection="{ selectedRowKeys: selectedRowKeys1, onChange: onSelectChange1 }"
              >
                <span slot="customTitle"><a-icon type="smile" theme="twoTone"/>  知识点</span>
              </a-table>
            </div>
            <div class="footer">
              <a-pagination simple :default-current="1" :pageSize="1" :total="page1" @change="onChange1" class="page"
                            v-model="current1"/>
            </div>

          </div>

          <div class="box2">
            <div class="action">
              <a-button class="btn" @click="()=>{this.bindQualityFlag=true}"
                        style="float: right;margin-right: 15px;margin-top: 5px;background-color: white;color: #1C90F5;border: 1px solid #1C90F5;">

                <a-icon type="plus-circle"/>
                绑定品行
              </a-button>
              <a-popconfirm
                  :disabled="!hasSelected2"
                  title="确定解绑所选品行吗?"
                  ok-text="Yes"
                  cancel-text="No"
                  @confirm="unbindQualityItems"
              >
                <a-button :disabled="!hasSelected2" type="danger"
                          style=" margin-top: 5px;margin-right: 10px;float: right">
                  解绑品行
                </a-button>
              </a-popconfirm>
            </div>
            <div class="table">
              <a-table :columns="columns2" :data-source="qualityArray" style="background-color: white"
                       :pagination="false"
                       :rowKey="record=>record.id"
                       :row-selection="{ selectedRowKeys: selectedRowKeys2, onChange: onSelectChange2 }"
              >
                <span slot="customTitle"><a-icon type="smile" theme="twoTone"/>  品行</span>
              </a-table>
            </div>
            <div class="footer">
              <a-pagination simple :default-current="1" :pageSize="1" :total="page2" @change="onChange2" class="page"
                            v-model="current2"/>
            </div>

          </div>
        </div>
      </div>
    </div>

    <a-modal v-model="addAbilityFlag" title="添加能力" @ok="addAbilityItem" @cancel="cancel1">
      <a-form :form="form1" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-form-item label="能力名称">
          <a-input
              v-decorator="['name', { rules: [
                  { required: true, message: '不能为空' },
                  {pattern:/^.{2,8}$/,message: '题库名长度为2-8位'}
                  ] }]"
          />
        </a-form-item>
        <a-form-item label="简介">
          <a-textarea
              :auto-size="{ minRows: 1, maxRows: 3 }"
              v-decorator="['brief', { rules: [
                  {pattern:/^.{0,30}$/,message: '长度为0-30位'}
                  ] }]"
          />
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal v-model="addKnowledgeFlag" title="添加知识点" @ok="addKnowledgeItem" @cancel="cancel2">
      <a-form :form="form2" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-form-item label="知识点名称">
          <a-input
              v-decorator="['name', { rules: [
                  { required: true, message: '不能为空' },
                  {pattern:/^.{2,8}$/,message: '题库名长度为2-8位'}
                  ] }]"
          />
        </a-form-item>
        <a-form-item label="技能水平">
          <a-select style="width: 120px"
                    v-decorator="['skill_level',{rules:[{required: true,message:'不能为空'}]}]">
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

    <a-modal v-model="addQualityFlag" title="添加品行" @ok="addQualityItem" @cancel="cancel3">
      <a-form :form="form3" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-form-item label="品行名称">
          <a-input
              v-decorator="['name', { rules: [
                  { required: true, message: '不能为空' },
                  {pattern:/^.{2,8}$/,message: '长度为2-8位'}
                  ] }]"
          />
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal v-model="bindKnowledgeFlag" title="绑定知识点" @ok="bindKnowledgeItems" @cancel="">
      <div class="add">
        <a-table :columns="columns1" :data-source="knowledgeArray" style="background-color: white"
                 :pagination="false"
                 :rowKey="record=>record.id"
                 :row-selection="{ selectedRowKeys: selectedRowKeys1, onChange: onSelectChange1 }"
        >
          <span slot="customTitle"><a-icon type="smile" theme="twoTone"/>  知识点</span>
        </a-table>
      </div>
      <div class="bottom">
        <a-pagination simple :default-current="1" :pageSize="1" :total="page4" @change="onChange2" class="page"
                      v-model="current3"/>
      </div>

    </a-modal>


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
  deleteQuality,
  getKnowledgeListByAbility,
  getQualityListByAbility,
  unbindKnowledge,
  unbindQuality,
  bindKnowledge,
  bindQuality
} from "../../api/course";

const columns1 = [
  {
    dataIndex: 'name',
    key: 'title',
    slots: {title: 'customTitle'},
    scopedSlots: {customRender: 'title'},
  },
  {
    title: '技能水平',
    key: 'skill_level',
    dataIndex: 'skill_level',
    scopedSlots: {customRender: 'skill_level'},
  },
]

const columns2 = [
  {
    dataIndex: 'name',
    key: 'title',
    slots: {title: 'customTitle'},
    scopedSlots: {customRender: 'title'},
  }
]

export default {
  name: "Knowledge",
  data() {
    return {
      current: ['ability'],
      abilityList: [],
      knowledgeList: [],
      qualityList: [],
      knowledgeArray: [],
      qualityArray: [],
      page1: 1,
      page2: 1,
      page3: 1,
      page4: 1,
      page5: 1,
      active: '',
      chooseItem: null,
      addAbilityFlag: false,
      addKnowledgeFlag: false,
      addQualityFlag: false,
      bindKnowledgeFlag: false,
      bindQualityFlag: false,
      columns1,
      columns2,
      //解绑
      selectedRowKeys1: [],
      selectedRowKeys2: [],
      //绑定
      selectedRowKeys3: [],
      selectedRowKeys4: [],
      current1: 1,
      current2: 1,
      current3: 1,
      current4: 1,
      current5: 1,
      form1: this.$form.createForm(this, {name: 'addAbility'}),
      form2: this.$form.createForm(this, {name: 'addKnowledge'}),
      form3: this.$form.createForm(this, {name: 'addQuality'}),
    }
  },
  methods: {
    //分页
    onChange1(pageNumber) {
      console.log('Page: ', pageNumber);
      if (pageNumber <= this.page1) {
        let res1 = getKnowledgeListByAbility(this.$store.getters.getTeacher.id, this.chooseItem.id, pageNumber)
        this.knowledgeArray = res1.knowledge
      }
    },
    onChange2(pageNumber) {
      console.log('Page: ', pageNumber);
      if (pageNumber <= this.page2) {
        let res2 = getQualityListByAbility(this.$store.getters.getTeacher.id, this.chooseItem.id, pageNumber)
        this.qualityArray = res2.qualities
      }
    },
    onChange3(pageNumber) {
      console.log('Page: ', pageNumber);
      if (pageNumber <= this.page3) {
        let response = getAbilityList(this.$store.getters.getTeacher.id, pageNumber)
        this.abilityList = response.abilities
      }
    },
    onChange4(pageNumber) {
      console.log('Page: ', pageNumber);
      if (pageNumber <= this.page4) {
        let response = getKnowledgeList(this.$store.getters.getTeacher.id, pageNumber)
        this.knowledgeList = response.knowledge
      }
    },
    onChange5(pageNumber) {
      console.log('Page: ', pageNumber);
      if (pageNumber <= this.page5) {
        let response = getQualityList(this.$store.getters.getTeacher.id, pageNumber)
        this.qualityList = response.qualities
      }
    },
    //选择
    chooseAbility(item) {
      this.active = item.id
      this.chooseItem = item

      let res1 = getKnowledgeListByAbility(this.$store.getters.getTeacher.id, item.id, 1)
      this.knowledgeArray = res1.knowledge
      this.page1 = res1.totalPage

      let res2 = getQualityListByAbility(this.$store.getters.getTeacher.id, item.id, 1)
      this.qualityArray = res2.qualities
      this.page2 = res2.totalPage

    },
    chooseKnowledge(id) {
      this.active = id

    },
    chooseQuality(id) {
      this.active = id

    },
    //添加
    addAbilityItem(e) {
      e.preventDefault();
      this.form1.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          let response = addQuality(this.$store.getters.getTeacher.id, values.name, values.brief)
          this.addAbilityFlag = false
          if (response.code == 0) {
            this.$message.success("添加成功！")
            this.reset3()
          } else {
            this.$message.error("添加失败");
          }
        }
      })
    },
    addKnowledgeItem(e) {
      e.preventDefault();
      this.form2.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values.skill_level)
          let response = addQuality(this.$store.getters.getTeacher.id, values.name, values.skill_level)
          this.addKnowledgeFlag = false

          if (response.code == 0) {
            this.$message.success("添加成功！")
            this.reset4()
          } else {
            this.$message.error("添加失败");
          }
        }
      })
    },
    addQualityItem(e) {
      e.preventDefault();
      this.form3.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          let response = addQuality(this.$store.getters.getTeacher.id, values.name)
          this.addQualityFlag = false

          if (response.code == 0) {
            this.$message.success("添加成功！")
            this.reset5()
          } else {
            this.$message.error("添加失败");
          }
        }
      })
    },
    cancel1() {
      this.form1.resetFields()
    },
    cancel2() {
      this.form2.resetFields()
    },
    cancel3() {
      this.form3.resetFields()
    },
    //删除
    deleteAbilityItem(id) {
      let response = deleteAbility(this.$store.getters.getTeacher.id, id)
      if (response.code == 0) {
        this.$message.success("删除成功！")
        this.chooseItem = null
        this.reset3()

      } else {
        this.$message.error("删除失败");
      }
    },
    deleteKnowledgeItem(id) {
      let response = deleteKnowledge(this.$store.getters.getTeacher.id, id)
      if (response.code == 0) {
        this.$message.success("删除成功！")
        this.reset4()

      } else {
        this.$message.error("删除失败");
      }
    },
    deleteQualityItem(id) {
      let response = deleteQuality(this.$store.getters.getTeacher.id, id)
      if (response.code == 0) {
        this.$message.success("删除成功！")
        this.reset5()

      } else {
        this.$message.error("删除失败");
      }
    },
    //刷新
    reset3() {
      let res1 = getAbilityList(this.$store.getters.getTeacher.id, 1)
      this.abilityList = res1.abilities
      this.page3 = res1.totalPage
      this.current3 = 1
    },
    reset4() {
      let res2 = getKnowledgeList(this.$store.getters.getTeacher.id, 1)
      this.knowledgeList = res2.knowledge
      this.page4 = res2.totalPage
      this.current4 = 1
    },
    reset5() {
      let res3 = getQualityList(this.$store.getters.getTeacher.id, 1)
      this.qualityList = res3.qualities
      this.page5 = res3.totalPage
      this.current5 = 1
    },
    reset1() {
      let res1 = getKnowledgeListByAbility(this.$store.getters.getTeacher.id, this.chooseItem.id, 1)
      this.knowledgeArray = res1.knowledge
      this.page1 = res1.totalPage
      this.current1 = 1
    },
    reset2() {
      let res2 = getQualityListByAbility(this.$store.getters.getTeacher.id, this.chooseItem.id, 1)
      this.qualityArray = res2.qualities
      this.page2 = res2.totalPage
      this.current2 = 1

    },
    //多选
    onSelectChange1(selectedRowKeys) {
      this.selectedRowKeys1 = selectedRowKeys;

    },
    onSelectChange2(selectedRowKeys) {
      this.selectedRowKeys2 = selectedRowKeys;
    },
    //绑定
    bindKnowledgeItems() {
      let response = bindKnowledge(this.$store.getters.getTeacher.id, this.chooseItem.id, this.selectedRowKeys1)
      this.bindKnowledgeFlag = false
      if (response.code == 0) {
        this.$message.success("绑定成功！")
        this.reset1()

      } else {
        this.$message.error("绑定失败");
      }
    },
    bindQualityItems() {
      let response = bindQuality(this.$store.getters.getTeacher.id, this.chooseItem.id, this.selectedRowKeys2)
      this.bindQualityFlag = false
      if (response.code == 0) {
        this.$message.success("绑定成功！")
        this.reset2()

      } else {
        this.$message.error("绑定失败");
      }
    },
    //解绑
    unbindKnowledgeItems() {
      let response = unbindKnowledge(this.$store.getters.getTeacher.id, this.chooseItem.id, this.selectedRowKeys1)
      if (response.code == 0) {
        this.$message.success("解绑成功！")
        this.selectedRowKeys1 = []
        this.reset1()

      } else {
        this.$message.error("解绑失败");
      }
    },
    unbindQualityItems() {
      let response = unbindQuality(this.$store.getters.getTeacher.id, this.chooseItem.id, this.selectedRowKeys2)
      if (response.code == 0) {
        this.$message.success("解绑成功！")
        this.selectedRowKeys2 = []
        this.reset2()

      } else {
        this.$message.error("解绑失败");
      }
    },

  },
  mounted() {
    let res1 = getAbilityList(this.$store.getters.getTeacher.id, 1)
    this.abilityList = res1.abilities
    this.page3 = res1.totalPage

    let res2 = getKnowledgeList(this.$store.getters.getTeacher.id, 1)
    this.knowledgeList = res2.knowledge
    this.page4 = res2.totalPage

    let res3 = getQualityList(this.$store.getters.getTeacher.id, 1)
    this.qualityList = res3.qualities
    this.page5 = res3.totalPage

  },
  computed: {
    hasSelected1() {
      return this.selectedRowKeys1.length > 0;
    },
    hasSelected2() {
      return this.selectedRowKeys2.length > 0;
    },
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
  margin-bottom: 0;
  box-shadow: 2px 2px 5px #bdbcbc;
}

.content {
  height: 90%;
  margin-bottom: 0;
}

.list {
  height: 90%;
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
  margin-bottom: 0;
}

.page {
  margin-right: 10px;
  margin-top: 10px;
  float: right;
  margin-bottom: 0;
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
  margin-bottom: 0;
  box-shadow: 2px 2px 5px #bdbcbc;
}

.top {
  height: 40px;
}

.bar {
  background-color: #e4e9ef;
  height: 40px;
}

.bar p {
  float: left;
  margin-left: 15px;
  letter-spacing: 2px;
  font-weight: bold;
  size: 10px;
  color: #6a6868;
  margin-top: 10px;
  margin-bottom: 0;
}

.info {
  height: 81%;
}

.box1 {
  float: left;
  height: 100%;
  width: 55%;
  /*border: 2px solid #bdbcbc;*/
  background-color: white;
}

.box2 {
  float: right;
  height: 100%;
  width: 44%;
  /*border: 2px solid #bdbcbc;*/
  background-color: white;
}

.action {
  height: 10%;
}

.table {
  height: 80%;
  overflow-y: scroll;
}

.active {
  color: #1c90f5;
  font-weight: bold;
}

.add {
  height: 320px;
  overflow-y: scroll;
}

.bottom {
  height: 30px;
}
</style>