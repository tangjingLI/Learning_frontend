<template>
  <div>
    <div class="top">
      <h1>课程管理</h1>

      <a-popconfirm
          :disabled="!hasSelected"
          title="确定删除所选课程吗?"
          ok-text="Yes"
          cancel-text="No"
          @confirm="deleteGroup"
      >
        <a-button id="deleteAll" :disabled="!hasSelected" type="danger"
                  style=" margin-top: 5px;margin-right: 10px;float: right">
          删除课程
        </a-button>
      </a-popconfirm>

      <a-button id="add" @click="()=>{this.addCourseFlag=true}"
                style="  margin-top: 5px;background-color: #1C90F5;color: white;border: none;float: right;margin-right: 10px">
        <a-icon type="plus-circle"/>
        新建课程
      </a-button>
    </div>

    <div class="left">
      <div class="title">
        <h1>
          <a-icon type="snippets" theme="twoTone"/>
          课程分类
        </h1>
        <a-divider class="divider"/>
      </div>

      <div class="content1">
        <div v-for="type in types" class="box1">
          <a :class="{active :active==type.name}" class="type" @click="selected(type.name),handleClick(type.id)">
            <a-icon type="smile" theme="twoTone"/>
            {{ type.name }}
          </a>
          <a-popconfirm
              title="确定删除该课程分类吗?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="deleteType(type.id)"
              v-if="type.id!=-1"
          >
            <a-icon type="delete" class="delete"/>
          </a-popconfirm>
          <a-divider class="line"/>
        </div>
      </div>

      <div class="footer1">
        <a-divider class="divider"/>
        <a-button @click="()=>{this.addTypeFlag=true}">
          <a-icon type="plus-circle" theme="twoTone"/>
          新建课程分类
        </a-button>
      </div>

    </div>

    <div class="right">

      <div class="content2">
        <a-table :columns="columns" :data-source="courses" style="background-color: white" :pagination="false"
                 :rowKey="record=>record.id"
                 :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        >
          <span slot="customTitle"><a-icon type="smile" theme="twoTone"/>  课程名</span>

          <span slot="action" slot-scope="text, record">
          <a @click="getCourseDetail(record.id)">查看</a>
          <a-divider type="vertical"/>
          <a-popconfirm
              title="确定删除该课程吗?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="deleteCourseItem(record.id)"
          >
            <a href="#">删除</a>
          </a-popconfirm>
        </span>

        </a-table>

      </div>

      <div class="footer2">
        <a-pagination show-quick-jumper :pageSize="1" :total="totalPage" @change="onChange" id="page"
                      v-model="current"/>
      </div>

    </div>

    <a-modal v-model="addTypeFlag" title="添加课程分类" @ok="addType">
      <a-form :form="form1" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-form-item label="课程分类">
          <a-input
              v-decorator="['type', { rules: [
                  { required: true, message: '不能为空' },
                  {pattern:/^.{2,8}$/,message: '长度为2-8位'}
                  ] }]"
          />
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal v-model="addCourseFlag" title="添加课程" @ok="addCourseItem">
      <a-form :form="form2" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-form-item label="课程名">
          <a-input
              v-decorator="['name', { rules: [
                  { required: true, message: '不能为空' },
                  {pattern:/^.{2,8}$/,message: '长度为2-8位'}
                  ] }]"
          />

        </a-form-item>

        <a-form-item label="课程分类">
          <a-select style="width: 120px"
                    v-decorator="['type',{rules:[{required: true,message:'不能为空'}]}]">

            <a-select-option v-for="item in types" v-if="item.id!=-1" :value="item.id" :key="item.id">
              {{ item.name }}
            </a-select-option>

          </a-select>
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
      </a-form>

    </a-modal>


  </div>

</template>

<script>
import {
  getCourseType,
  getCoursesByType,
  getAllCourses,
  addCoursesType,
  addCourse,
  deleteCoursesType,
  deleteCourse,
  deleteCoursesGroup,
} from "../../api/course";

const columns = [
  {
    dataIndex: 'name',
    key: 'title',
    slots: {title: 'customTitle'},
    scopedSlots: {customRender: 'title'},
  },
  {
    title: '课程简介',
    key: 'brief',
    dataIndex: 'brief',
    ellipsis: true,
    scopedSlots: {customRender: 'brief'},
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: {customRender: 'action'},
  }
];

export default {
  name: "Course",
  data() {
    return {
      columns,
      selectedRowKeys: [],
      types: [],
      courses: [],
      totalPage: 1,
      bankId: -1,
      addTypeFlag: false,
      addCourseFlag: false,
      active: '所有课程',
      current: 1,
      form1: this.$form.createForm(this, {name: 'addType'}),
      form2: this.$form.createForm(this, {name: 'addTCourse'}),
    }
  },
  methods: {
    //查看课程
    getCourseDetail(id) {
      this.$router.push({name: 'courseInfo', params: {courseId: id}})
    },
    //选择
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
    },
    //分页
    async onChange(pageNumber) {
      if (pageNumber <= this.totalPage) {
        let response;
        if (this.bankId != -1) {
          response = await getCoursesByType(this.$store.getters.getTeacher.id, this.bankId, pageNumber)
        } else {
          response = await getAllCourses(this.$store.getters.getTeacher.id, pageNumber)
        }
        this.courses = response.courses
        this.totalPage = response.totalPage
      }
    },
    //选择课程分类
    async handleClick(id) {
      let response;
      if (id != -1) {
        response = await getCoursesByType(this.$store.getters.getTeacher.id, id, 1)
      } else {
        response = await getAllCourses(this.$store.getters.getTeacher.id, 1)
      }
      this.courses = response.content
      this.bankId = id
      this.totalPage = response.totalPage
    },
    selected(value) {
      this.active = value;
      // console.log(this.active)
    },
    //添加课程分类
    addType(e) {
      e.preventDefault();
      this.form1.validateFields(async (err, values) => {
        if (!err) {
          this.addTypeFlag = false
          console.log("addType", values)
          let response = await addCoursesType(this.$store.getters.getTeacher.id, values.type)
          this.form1.resetFields();
          console.log("addRes", response)
          if (response.code == 0) {
            this.$message.success("添加成功！")
            await this.reset()
          } else {
            this.$message.error("添加失败")
          }
        }
      })
    },
    //删除课程分类
    async deleteType(id) {
      let response = await deleteCoursesType(this.$store.getters.getTeacher.id, id)
      if (response.code == 0) {
        this.$message.success("删除成功！")
        await this.reset()
      } else {
        this.$message.error("删除失败");
      }
    },
    //添加课程
    addCourseItem(e) {
      e.preventDefault();
      this.form2.validateFields(async (err, values) => {
        if (!err) {
          this.addCourseFlag = false

          let aData = new Date();
          let course = {
            name: values.name,
            classifyId: values.type,
            brief: values.brief,
            userId: this.$store.getters.getTeacher.id,
            createTime: aData.getFullYear() + "-" + (aData.getMonth() + 1) + "-" + aData.getDate()
          }
          console.log(course)
          let response = await addCourse(course)
          this.form2.resetFields();
          if (response.code == 0) {
            this.$message.success("添加成功！")
            await this.reset()
          } else {
            this.$message.error("添加失败");
          }
        }
      })
    },
    //删除课程
    async deleteCourseItem(id) {
      let response = await deleteCourse(this.$store.getters.getTeacher.id, id)
      // console.log("delete",response)
      if (response.code == 0) {
        this.$message.success("删除成功！")
        await this.reset()
      } else {
        this.$message.error("删除失败");
      }
    },
    async deleteGroup() {
      let response = await deleteCoursesGroup(this.$store.getters.getTeacher.id, this.selectedRowKeys)
      // console.log(this.selectedRowKeys)
      if (response.code == 200) {
        this.$message.success("删除成功！")
        await this.reset()
      } else {
        this.$message.error("删除失败");
      }
    },
    async reset() {
      let response = await getCourseType(this.$store.getters.getTeacher.id)
      // console.log("types",response)
      this.types = response
      this.types.unshift({id: -1, name: "所有课程"})
      let res = await getAllCourses(this.$store.getters.getTeacher.id, 1)
      // console.log("all", res)
      this.courses = res.content
      this.totalPage = res.totalPage
      this.current = 1
      this.selectedRowKeys = []
    },

  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0;
    },
  },
  mounted() {
    this.reset()
  }
}
</script>


<style scoped>
.divider {
  margin: 0;
}

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

.left {
  width: 20%;
  float: left;
  background-color: white;
  height: 90%;
  margin-left: 15px;
  margin-top: 10px;
  box-shadow: 2px 2px 5px #bdbcbc;
}

.title h1 {
  float: left;
  margin-left: 30px;
  letter-spacing: 1px;
  font-weight: bold;
  font-size: 15px;
  margin-top: 10px;
  margin-bottom: 15px;
}

.content1 {
  height: 80%;
  overflow-y: scroll;
}

.box1 {
  padding-top: 10px;
}

.line {
  margin-bottom: 0;
  margin-top: 10px;
}

.type {
  margin-left: 30px;
  margin-top: 20px;
  font-size: 13px;
  letter-spacing: 2px;
  color: black;
}

.delete {
  float: right;
  margin-right: 10px;
  margin-top: 5px;
}

.footer1 {
  text-align: center;
}

.footer1 button {
  margin-top: 10px;
}

.right {
  width: 76%;
  float: right;
  background-color: white;
  height: 90%;
  margin-right: 10px;
  margin-top: 10px;
  box-shadow: 2px 2px 5px #bdbcbc;
}

.content2 {
  height: 88%;
  overflow-y: scroll;
}

#page {
  margin-right: 10px;
  margin-top: 15px;
  float: right;
}

.active {
  color: #1c90f5;
  font-weight: bold;
}


</style>