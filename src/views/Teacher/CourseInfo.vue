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

      <a-button id="edit" @click="showEditInfo"
                style=" margin-top: 5px;background-color: white;color: #1C90F5;border: 1px solid #1C90F5;margin-right: 10px;float: right;">
        <a-icon type="setting"/>
        编辑
      </a-button>
      <a-dropdown>
        <!--        <a-button id="add" @click=""-->
        <!--                  style="  margin-top: 5px;background-color: #1C90F5;color: white;border: none;float: right;margin-right: 10px">-->
        <!--          <a-icon type="plus-circle"/>-->
        <!--          添加-->
        <!--        </a-button>-->
        <a @click="e => e.preventDefault()" style="color: #1C90F5;margin-top: 10px;float: right;margin-right: 20px">
          添加
          <a-icon type="down"/>
        </a>

        <a-menu slot="overlay">
          <a-menu-item>
            <a @click="()=>{this.flag6=true}">章节</a>
          </a-menu-item>

          <a-menu-item>
            <a @click="()=>{this.flag1=true}">能力</a>
          </a-menu-item>

          <a-menu-item>
            <a @click="()=>{this.flag2=true}">知识点</a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>

    </div>

    <div class="box">
      <div class="info">
        <!--        <img src="picture" id="image" :onerror="defaultImg">-->
<!--        @click="toGetImg"-->
        <div class="bigImg-div"  @mouseenter="updateStyle" @mouseleave="hover=false">
          <img class="bigImg" :src=valueUrl :onerror="defaultImg" id="img">
          <span style="position:absolute;font-size: 18px;font-weight: bold;" :style="myStyle"
                v-if="hover">编辑</span>
        </div>
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
          <a-menu-item key="chapter" @click="getChapterList">
            <a-icon type="carry-out" theme="twoTone"/>
            目录
          </a-menu-item>
          <a-menu-item key="exam" @click="getPaperList(1)">
            <a-icon type="bug" theme="twoTone"/>
            试卷
          </a-menu-item>
          <a-menu-item key="ability" @click="getAbilityList(1)">
            <a-icon type="compass" theme="twoTone"/>
            能力
          </a-menu-item>
          <a-menu-item key="knowledge" @click="getKnowledgeList(1)">
            <a-icon type="environment" theme="twoTone"/>
            知识点
          </a-menu-item>
          <a-menu-item key="quality" @click="getQualityList(1)">
            <a-icon type="crown" theme="twoTone"/>
            品行
          </a-menu-item>
        </a-menu>

        <div v-if="current[0]==='chapter'" class="wrap">
          <a-empty v-if="chapterList.length==0" style="margin-top: 50px"/>
          <div v-for="chapter in chapterList">
            <div class="chapter" :class="{selected:chapter.id==chooseChapter}"
                 @click="selectChapter(chapter.id)">
              <p>
                <a-icon type="down"/>
                {{ chapter.name }}
              </p>

              <a-popconfirm
                  title="确定删除该章节吗?"
                  ok-text="Yes"
                  cancel-text="No"
                  @confirm="myDeleteChapter(chapter.id)"
              >
                <a-icon type="delete" class="delete"/>
              </a-popconfirm>

              <a-icon type="plus-circle" theme="twoTone" class="delete"
                      @click="showAddItem(chapter.id)"
                      style="margin-right: 25px"
              />

            </div>

            <div v-if="chapter.id==chooseChapter" v-for="item in itemList">
              <div class="itemBox">
                <p>
                  <a-icon type="file" theme="twoTone"/>&ensp;{{ item.name }}
                </p>
                <a-popconfirm
                    title="确定删除该资源吗?"
                    ok-text="Yes"
                    cancel-text="No"
                    @confirm="myDeleteItem(item.id,chapter.id)"
                >
                  <a-icon type="delete" class="delete"/>
                </a-popconfirm>
              </div>
            </div>
          </div>

        </div>

        <div v-if="current[0]==='exam'">
          <div class="table">
            <a-table :columns="columns2" :data-source="paperList" style="background-color: white" :pagination="false"
                     :rowKey="record=>record.id"
            >
              <span slot="customTitle"><a-icon type="smile" theme="twoTone"/>  试卷</span>
              <span slot="action" slot-scope="text, record">
                <a @click="getExamDetail(record.id)">查看</a>
              </span>

            </a-table>
          </div>
          <div class="footer">
            <a-pagination show-quick-jumper :pageSize="1" :total="totalPage1" @change="onChange1" class="page"
                          v-model="page1"/>
          </div>
        </div>

        <div v-if="current[0]==='ability'">
          <div class="table">
            <a-table :columns="columns3" :data-source="abilityList" style="background-color: white" :pagination="false"
                     :rowKey="record=>record.id"
            >
              <span slot="customTitle"><a-icon type="smile" theme="twoTone"/>  能力</span>
              <span slot="action" slot-scope="text, record">
                <a @click="getAbilityDetail(record.id)">查看</a>
                <a-divider type="vertical"/>

                <a @click="showEdit1(record.id,record.name)">修改</a>
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
          <div class="footer">
            <a-pagination show-quick-jumper :pageSize="1" :total="totalPage2" @change="onChange2" class="page"
                          v-model="page2"/>
          </div>

        </div>

        <div v-if="current[0]==='knowledge'">
          <div class="table">
            <a-table :columns="columns4" :data-source="knowledgeList" style="background-color: white"
                     :pagination="false"
                     :rowKey="record=>record.id"
            >
              <span slot="customTitle"><a-icon type="smile" theme="twoTone"/>  知识点</span>

              <span slot="action" slot-scope="text, record">
                <a @click="showEdit2(record.id,record.name)">修改</a>
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

          <div class="footer">
            <a-pagination show-quick-jumper :pageSize="1" :total="totalPage3" @change="onChange3" class="page"
                          v-model="page3"/>
          </div>

        </div>

        <div v-if="current[0]==='quality'">
          <div class="table">
            <a-table :columns="columns5" :data-source="qualityList" style="background-color: white" :pagination="false"
                     :rowKey="record=>record.id"
            >
              <span slot="customTitle"><a-icon type="smile" theme="twoTone"/>  品行</span>
              <span slot="action" slot-scope="text, record">
<!--                <a @click="">修改</a>-->
                <!--                <a-divider type="vertical"/>-->
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
          <div class="footer">
            <a-pagination show-quick-jumper :pageSize="1" :total="totalPage4" @change="onChange4" class="page"
                          v-model="page4"/>
          </div>
        </div>

      </div>
    </div>

    <a-modal v-model="flag1" title="添加能力" @ok="addAbilityItem">
      <a-form :form="form1" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-form-item label="能力名称">
          <a-input
              v-decorator="['title', { rules: [
                  { required: true, message: '不能为空' },
                  {pattern:/^.{2,8}$/,message: '能力名称长度为2-8位'}
                  ] }]"
          />
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal v-model="flag2" title="添加知识点" @ok="addKnowledgeItem">
      <a-form :form="form2" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-form-item label="知识点名称">
          <a-input
              v-decorator="['title', { rules: [
                  { required: true, message: '不能为空' },
                  {pattern:/^.{2,8}$/,message: '能力名称长度为2-8位'}
                  ] }]"
          />
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal v-model="flag3" title="修改能力" @ok="editAbilityItem">
      <a-form :form="form3" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-form-item label="能力名称">
          <a-input
              v-decorator="['title', { rules: [
                  { required: true, message: '不能为空' },
                  {pattern:/^.{2,8}$/,message: '能力名称长度为2-8位'}
                  ] }]"
          />
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal v-model="flag4" title="修改知识点" @ok="editKnowledgeItem">
      <a-form :form="form3" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-form-item label="知识点名称">
          <a-input
              v-decorator="['title', { rules: [
                  { required: true, message: '不能为空' },
                  {pattern:/^.{2,8}$/,message: '能力名称长度为2-8位'}
                  ] }]"
          />
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal v-model="flag5" title="编辑课程" @ok="editCourseInfo">
      <a-form :form="form5" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-form-item label="课程名">
          <a-input
              v-decorator="['title', { rules: [
                  { required: true, message: '不能为空' },
                  {pattern:/^.{2,8}$/,message: '长度为2-8位'}
                  ] }]"
          />

        </a-form-item>

        <a-form-item label="简介">
          <a-textarea
              :auto-size="{ minRows: 1, maxRows: 3 }"
              v-decorator="['brief', { rules: [
                  {required: true,message:'不能为空'},
                  {pattern:/^.{1,30}$/,message: '长度为1-30位'}
                  ] }]"
          />
        </a-form-item>

        <a-form-item label="封面URL">
          <a-input
              v-decorator="['url', { rules: [
                  ] }]"
          />

        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal v-model="flag6" title="添加章节" @ok="myAddChapter">
      <a-form :form="form1" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-form-item label="章节名称">
          <a-input
              v-decorator="['title', { rules: [
                  { required: true, message: '不能为空' },
                  {pattern:/^.{2,8}$/,message: '章节名称长度为2-8位'}
                  ] }]"
          />
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal v-model="flag7" title="添加资源" @ok="myAddItem">
      <a-form :form="form1" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-form-item label="资源名称">
          <a-input
              v-decorator="['title', { rules: [
                  { required: true, message: '不能为空' },
                  {pattern:/^.{2,8}$/,message: '名称长度为2-8位'}
                  ] }]"
          />
        </a-form-item>

        <a-form-item label="资源链接">
          <a-input
              v-decorator="['url', { rules: [
                  { required: true, message: '不能为空' },
                  ] }]"
          />
        </a-form-item>
      </a-form>
    </a-modal>


  </div>
</template>

<script>
import {
  getCourseDetail,
  getAbility,
  getKnowledge,
  getQuality,
  deleteAbility,
  deleteKnowledge,
  deleteQuality,
  addAbility,
  addKnowledge,
  editAbility,
  editKnowledge,
  editCourse,
  uploadPicture,
  editPicture,
  getChapter,
  getItem,
  deleteChapter,
  deleteItem,
  addChapter,
  addItem
} from "../../api/course";
import {getPaperByCourse} from "../../api/paper";

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
    dataIndex: 'paperName',
    key: 'title',
    slots: {title: 'customTitle'},
    scopedSlots: {customRender: 'title'},
  },
  {
    title: '简介',
    key: 'brief',
    dataIndex: 'remark',
    ellipsis: true,
    scopedSlots: {customRender: 'brief'},
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: {customRender: 'action'},
  }
];

const columns3 = [
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

const columns4 = [
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

const columns5 = [
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

let inputElement = null

export default {
  name: "CourseInfo",
  data() {
    return {
      hover: false,
      valueUrl: '',
      kid: -1,
      aid: -1,
      current: ['chapter'],
      title: '',
      brief: '',
      chapterList: [],
      paperList: [],
      abilityList: [],
      knowledgeList: [],
      qualityList: [],
      itemList: [],
      chooseChapter: -1,
      picture: '',
      columns1,
      columns2,
      columns3,
      columns4,
      columns5,
      form1: this.$form.createForm(this, {name: 'newAbility'}),
      form2: this.$form.createForm(this, {name: 'newKnowledge'}),
      form3: this.$form.createForm(this, {name: 'edit'}),
      form5: this.$form.createForm(this, {name: 'info'}),
      flag1: false,
      flag2: false,
      flag3: false,
      flag4: false,
      flag5: false,
      flag6: false,
      flag7: false,
      page1: 1,
      page2: 1,
      page3: 1,
      page4: 1,
      totalPage1: 1,
      totalPage2: 1,
      totalPage3: 1,
      totalPage4: 1,
      myStyle: {},
      myFile: {},
      fileName: '未选择文件',
      selectedChapter: -1,
    }
  },
  methods: {
    //删除章节 &小节
    async myDeleteChapter(id) {
      let response = await deleteChapter(this.$store.getters.getTeacher.id, id)
      if (response.code == 0) {
        this.$message.success("删除成功！")
        await this.getChapterList()
      } else {
        this.$message.error("删除失败");
      }
    },
    async myDeleteItem(id, pid) {
      let response = await deleteItem(this.$store.getters.getTeacher.id, id)
      if (response.code == 0) {
        this.$message.success("删除成功！")
        await this.getItemList(pid)
      } else {
        this.$message.error("删除失败");
      }
    },
    async selectChapter(id) {
      if (this.chooseChapter == id) {
        this.chooseChapter = -1
      } else {
        this.chooseChapter = id
        await this.getItemList(id)
      }
    },
    showFile() {
      document.getElementById('chooseFile').click()
    },
    //文件
    changeFile() {
      this.myFile = document.querySelector('input[type=file]').files[0]
      this.fileName = this.myFile.name
      // console.log(this.myFile)
    },
    uploadFile() {
      this.flag6 = false
      this.fileName = '未选择文件'
      // let response=
    },
    showEditInfo() {
      this.flag5 = true
      this.$nextTick(() => {
        this.form5.setFieldsValue({
          title: this.title,
          brief: this.brief
        })
      })
    },
    async editCourseInfo(e) {
      e.preventDefault()
      this.form5.validateFields(async (err, values) => {
        if (!err) {
          let response = await editCourse(this.$route.params.courseId, this.$store.getters.getTeacher.id, values.title, values.brief,values.url)
          this.flag5 = false
          if (response.code == 0) {
            this.$message.success('编辑成功！')
            await this.reset()

          } else {
            this.$message.error("编辑失败")
          }
        }
      })
    },
    //分页
    async onChange1(pageNumber) {
      if (pageNumber <= this.totalPage1) {
        await this.getPaperList(pageNumber)
      }
    },
    async onChange2(pageNumber) {
      if (pageNumber <= this.totalPage2) {
        await this.getAbilityList(pageNumber)
      }
    },
    async onChange3(pageNumber) {
      if (pageNumber <= this.totalPage3) {
        await this.getKnowledgeList(pageNumber)
      }
    },
    async onChange4(pageNumber) {
      if (pageNumber <= this.totalPage4) {
        await this.getQualityList(pageNumber)
      }
    },
    getAbilityDetail(id) {
      this.$router.push({name: 'ability', params: {abilityId: id}})
    },
    async reset() {
      let response = await getCourseDetail(this.$store.getters.getTeacher.id, this.$route.params.courseId)
      this.title = response.name
      this.brief = response.brief
      this.picture = response.picture
      await this.getChapterList()
    },
    back() {
      this.$router.push('/teacher/courseList')
    },
//查看章节
    async getChapterList() {
      let response = await getChapter(this.$route.params.courseId)
      this.chapterList = response
    },
    //查看小节
    async getItemList(cid) {
      let response = await getItem(cid)
      this.itemList = response
    },
    //
//查看试卷
    async getPaperList(pageNum) {
      let response = await getPaperByCourse(this.$route.params.courseId, pageNum)
      this.paperList = response.data.list
      this.totalPage1 = response.data.pages
      this.page1 = pageNum
    },
    getExamDetail(id) {
      this.$router.push({name: 'paperInfo', params: {paperId: id}})
    },
//查看能力
    async getAbilityList(page) {
      let response = await getAbility(this.$route.params.courseId, page)
      this.abilityList = response.content
      this.totalPage2 = response.totalPage
      this.page2 = page
    },
//删除能力
    async deleteAbilityItem(id) {
      let response = await deleteAbility(id)
      if (response.code == 0) {
        this.$message.success('删除成功！')
        await this.getAbilityList(this.page2)
      } else {
        this.$message.error("删除失败")
      }
    },
//添加能力
    async addAbilityItem(e) {
      e.preventDefault()
      this.form1.validateFields(async (err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          let response = await addAbility(this.$route.params.courseId, values.title)
          this.flag1 = false
          this.form1.resetFields()
          if (response.code == 0) {
            this.$message.success("添加成功！")
            await this.getAbilityList(this.page2)
          } else {
            this.$message.error("添加失败");
          }
        }
      })
    },
    //添加章节
    async myAddChapter(e) {
      e.preventDefault()
      this.form1.validateFields(async (err, values) => {
        if (!err) {
          let response = await addChapter(this.$store.getters.getTeacher.id, this.$route.params.courseId, values.title)
          this.flag6 = false
          this.form1.resetFields()
          if (response.code == 0) {
            this.$message.success("添加成功！")
            await this.getChapterList()
          } else {
            this.$message.error("添加失败");
          }
        }
      })
    },
    //添加小节
    showAddItem(id) {
      this.flag7 = true
      this.selectedChapter = id
    },
    async myAddItem(e) {
      e.preventDefault()
      this.form1.validateFields(async (err, values) => {
        if (!err) {
          let response = await addItem(this.$store.getters.getTeacher.id, this.$route.params.courseId, values.title, this.selectedChapter, values.url)
          this.flag7 = false
          this.form1.resetFields()
          if (response.code == 0) {
            this.$message.success("添加成功！")
            await this.getItemList(this.selectedChapter)
          } else {
            this.$message.error("添加失败");
          }
        }
      })
    },
//查看知识点
    async getKnowledgeList(page) {
      let response = await getKnowledge(this.$route.params.courseId, page)
      this.knowledgeList = response.content
      this.totalPage3 = response.totalPage
      this.page3 = page
    },
//删除知识点
    async deleteKnowledgeItem(id) {
      let response = await deleteKnowledge(id)
      if (response.code == 0) {
        this.$message.success('删除成功！')
        await this.getKnowledgeList(this.page3)
      } else {
        this.$message.error("删除失败")
      }
    },
//添加知识点
    async addKnowledgeItem(e) {
      e.preventDefault()
      this.form2.validateFields(async (err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          this.flag2 = false
          this.form2.resetFields()
          let response = await addKnowledge(this.$route.params.courseId, values.title)
          this.flag2 = false
          this.form2.resetFields()
          if (response.code == 0) {
            this.$message.success("添加成功！")
            await this.getKnowledgeList(this.page3)
          } else {
            this.$message.error("添加失败");
          }
        }
      })

    },
//查看品行
    async getQualityList(page) {
      let response = await getQuality(this.$route.params.courseId, page)
      this.qualityList = response.content
      this.totalPage4 = response.totalPage
      this.page4 = page
    },
//删除品行
    async deleteQualityItem(id) {
      let response = await deleteQuality(id)
      if (response.code == 0) {
        this.$message.success('删除成功！')
        await this.getQualityList(this.page4)
      } else {
        this.$message.error("删除失败")
      }
    },
    //修改能力
    showEdit1(id, name) {
      this.flag3 = true
      this.aid = id
      this.$nextTick(() => {
        this.form3.setFieldsValue({
          title: name
        })
      })
    },
    showEdit2(id, name) {
      this.flag4 = true
      this.kid = id
      this.$nextTick(() => {
        this.form3.setFieldsValue({
          title: name
        })
      })
    },
    editAbilityItem(e) {
      e.preventDefault();
      this.form3.validateFields(async (err, values) => {
        if (!err) {
          let response = await editAbility(this.aid, this.$route.params.courseId, values.title)
          this.flag3 = false
          if (response.code == 0) {
            this.$message.success('编辑成功！')
            await this.getAbilityList(this.page2)
          } else {
            this.$message.error("编辑失败")
          }
        }
      })
    },
    //修改知识点
    editKnowledgeItem(e) {
      e.preventDefault();
      this.form3.validateFields(async (err, values) => {
        if (!err) {
          let response = await editKnowledge(this.kid, this.$route.params.courseId, values.title)
          this.flag4 = false
          if (response.code == 0) {
            this.$message.success('编辑成功！')
            await this.getKnowledgeList(this.page3)
          } else {
            this.$message.error("编辑失败")
          }
        }
      })
    },
    //图片
    toGetImg() {
      if (inputElement === null) {
        // 生成文件上传的控件
        inputElement = document.createElement('input')
        inputElement.setAttribute('type', 'file')
        inputElement.style.display = 'none'

        if (window.addEventListener) {
          inputElement.addEventListener('change', this.uploadImage, false)
        } else {
          inputElement.attachEvent('onchange', this.uploadImage)
        }

        document.body.appendChild(inputElement)
      }
      inputElement.click()
    },
    async uploadImage(el) {
      if (el && el.target && el.target.files && el.target.files.length > 0) {
        // console.log(el)
        const imgFile = el.target.files[0]
        const isLt2M = imgFile.size / 1024 / 1024 < 2
        const size = imgFile.size / 1024 / 1024
        // console.log(size)
        // 判断上传文件的大小
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        } else if (imgFile.type.indexOf('image') === -1) { //如果不是图片格式
          // this.$dialog.toast({ mes: '请选择图片文件' });
          this.$message.error('请选择图片文件');
        } else {
          const that = this;
          const reader = new FileReader(); // 创建读取文件对象
          reader.readAsDataURL(el.target.files[0]); // 发起异步请求，读取文件
          reader.onload =async function (){ // 文件读取完成后
            // 读取完成后，将结果赋值给img的src
            that.valueUrl = this.result;
            // console.log(this.result);
            // 数据传到后台
            console.log(imgFile)
            this.myFile = imgFile
            let res1 =await uploadPicture(imgFile)
            if (res1.code == 0) {
              // let res2=
              that.$message.success("上传成功")
            } else {
              that.$message.error("上传失败")
            }
          }
        }
      }
      await this.reset()
    },
    updateStyle() {
      // this.hover = true
      let po = document.getElementById('img').getBoundingClientRect()
      // console.log("hi", po)
      this.myStyle = {top: po.y + 50 + 'px', left: po.x + 90 + 'px'}
    }
  },
  beforeDestroy() {
    if (inputElement) {
      if (window.addEventListener) {
        inputElement.removeEventListener('change', this.onGetLocalFile, false)
      } else {
        inputElement.detachEvent('onchange', this.onGetLocalFile)
      }
      document.body.removeChild(inputElement)
      inputElement = null
      // console.log('inputElement destroy')
    }
  },
  mounted() {
    this.reset()
  }
  ,
  computed: {

    defaultImg() {
      return 'this.src="' + require('../../assets/course.jpg') + '"'
    }
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

.page {
  margin-right: 10px;
  margin-top: 5px;
  float: right;
}

.footer {
  height: 10%;
  background-color: white;
  margin: 0 5px;
}

#image {
  height: 120px;
  width: 230px;
  float: left;
  margin-left: 30px;
  margin-top: 10px;
}

.alert-box-item {
  overflow: hidden;
}

.bigImg-div {
  height: 120px;
  width: 220px;
  /*border-radius: 100%;*/
  overflow: hidden;
  border: 1px solid #ddd;
  float: left;
  margin-left: 30px;
  margin-top: 10px;
}

.bigImg {
  display: block;
  height: 120px;
  width: 220px;
  overflow: hidden;
  /*border-radius: 100%;*/
}

/*.bigImg:hover {*/
/*  opacity: 0.4;*/
/*}*/

.uploadBox {
  height: 100px;
  text-align: center;
}

#chooseFile {
  display: none;
}

.uploadBox button {
  color: #1C90F5;
  border: 1px solid #1C90F5;
}

.uploadBox p {
  font-size: 15px;
  margin-top: 20px;
}

.wrap {
  height: 340px;
  overflow-y: scroll;
  margin-bottom: 0;
}

.chapter {
  height: 50px;
  margin: 0 15px;
  border-bottom: #f1f1f1 1px solid;
  padding-top: 15px;
  padding-left: 30px;
  padding-right: 25px;
}

.chapter p {
  font-size: 13px;
  float: left;
}

.selected {
  background-color: rgba(101, 195, 224, 0.2);
}

.itemBox {
  height: 45px;
  margin: 0 10px;
  border-bottom: #f1f1f1 1px solid;
  padding-top: 15px;
  padding-left: 50px;
  padding-right: 45px;
}

.itemBox p {
  font-size: 13px;
  float: left;
}

.delete {
  float: right;
}

</style>