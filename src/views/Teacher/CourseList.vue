<template>
  <div>
    <div class="top">
      <h1>课程管理</h1>

      <a-popconfirm
          :disabled="!hasSelected"
          title="确定删除所选课程吗?"
          ok-text="Yes"
          cancel-text="No"
          @confirm=""
      >
        <a-button id="deleteAll" :disabled="!hasSelected" type="danger"
                  style=" margin-top: 5px;margin-right: 10px;float: right">
          删除课程
        </a-button>
      </a-popconfirm>

      <a-button id="add" @click=""
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
        <div v-for="type in types" class="type">
          <p><a-icon type="smile" theme="twoTone"/>  {{type}}</p>
          <a-divider class="divider"/>
        </div>
      </div>

      <div class="footer1">
        <a-divider class="divider"/>
        <a-button>
          <a-icon type="plus-circle" theme="twoTone"/>
          新建课程分类
        </a-button>
      </div>

    </div>

    <div class="right">

      <div class="content2">
        <a-table :columns="columns" :data-source="courses" style="background-color: white" :pagination="pagination"
                 :rowKey="record=>record.papersInfo.id"
                 :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        >
          <span slot="customTitle"><a-icon type="smile" theme="twoTone"/>  课程名</span>

          <span slot="action" slot-scope="text, record">
          <a @click="">查看</a>
          <a-divider type="vertical"/>
          <a-popconfirm
              title="确定删除该课程吗?"
              ok-text="Yes"
              cancel-text="No"
              @confirm=""
          >
            <a href="#">删除</a>
          </a-popconfirm>
        </span>

        </a-table>

      </div>

      <div class="footer2">
        <a-pagination show-quick-jumper :default-current="2" :total="500" @change="onChange" id="page"/>
      </div>

    </div>
  </div>

</template>

<script>
import {getCourseType} from "../../api/course";

const columns = [
  {
    dataIndex: 'title',
    key: 'title',
    slots: {title: 'customTitle'},
    scopedSlots: {customRender: 'title'},
  },
  {
    title: '课程简介',
    key: 'content',
    dataIndex: 'content',
    scopedSlots: {customRender: 'content'},
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
      pagination: {
        pageSize: 7
      },
    }
  },
  methods: {
    //选择
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0;
    },
  },
  mounted() {
    let response = getCourseType(this.$store.getters.getTeacher.id)
    this.types = response.res
    this.types.unshift("所有课程")
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

.type p{
  font-size: 13px;
  margin-left: 20px;
  margin-top: 10px;
  letter-spacing: 2px;
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
  height: 90%;
}

#page {
  margin-right: 10px;
  margin-top: 10px;
  float: right;
}


</style>