<template>
  <div class="paper">
    <div class="top">
      <a-button
          style=" float:left;margin-top: 5px;background-color: white;color: #1C90F5;border: 1px solid #1C90F5;margin-left: 10px;height: 70%"
          @click="back">
        <a-icon type="left-circle"/>
        返回
      </a-button>
      <h1> {{ bankTitle }}</h1>
      <!--      <a-tag v-if="isPublic==0" color="green" style="margin-left: 5px;margin-top: 8px">public</a-tag>-->
      <!--      <a-tag v-else color="orange" style="margin-left: 5px;margin-top: 8px">private</a-tag>-->
      <a-popconfirm
          :disabled="!hasSelected"
          title="确定删除所选试卷吗?"
          ok-text="Yes"
          cancel-text="No"
          @confirm="deleteGroup"
      >
        <a-button id="deleteAll" :disabled="!hasSelected" type="danger"
                  style=" margin-top: 5px;margin-right: 10px;float: right">
          删除试卷
        </a-button>
      </a-popconfirm>

      <a-button id="edit" @click="showEdit"
                style=" margin-top: 5px;background-color: white;color: #1C90F5;border: 1px solid #1C90F5;margin-right: 10px;float: right">
        <a-icon type="setting"/>
        编辑试卷库
      </a-button>


      <a-button id="add" @click="addPaper"
                style="  margin-top: 5px;background-color: #1C90F5;color: white;border: none;float: right;margin-right: 5px">
        <a-icon type="plus-circle"/>
        添加试卷
      </a-button>

      <a-input-search placeholder="输入试卷名" enter-button @search="onSearch" id="search"
                      style="width: 30%; float: right;margin-top: 5px;margin-right: 5px"/>
      <a-button @click="reset"
                style="padding-left:5px;padding-right:5px;float: right;margin-right: 10px;margin-top: 5px;background-color: white;color: #1C90F5;border: 1px solid #1C90F5;">
        重置
      </a-button>
    </div>

    <div class="table">
      <a-table :columns="columns" :data-source="papers" style="background-color: white" :pagination="false"
               :rowKey="record=>record.id"
               :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      >
        <span slot="customTitle"><a-icon type="smile" theme="twoTone"/> 试卷</span>

        <span slot="status" slot-scope="status">
          <a-tag v-if="status==1" color="blue">已发布</a-tag>
          <a-tag v-else color="pink">未发布</a-tag>
        </span>

        <span slot="type" slot-scope="type">
          <a-tag v-if="type==1" color="blue">单选</a-tag>
          <a-tag v-else-if="type==2" color="purple">多选</a-tag>
          <a-tag v-else color="pink">简答</a-tag>
        </span>

        <span slot="action" slot-scope="text, record">
          <a @click="detail(record.id)">查看</a>
          <a-divider type="vertical"/>
          <a-popconfirm
              title="确定删除该题库吗?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="confirm(record.id)"
              @cancel="cancel"
          >
            <a href="#">删除</a>
          </a-popconfirm>
        </span>

      </a-table>
    </div>

    <div class="footer">
      <a-pagination show-quick-jumper :pageSize="1" :total="totalPage" @change="onChange" id="page" v-model="current"/>
    </div>


    <a-modal v-model="visible" title="编辑试卷库" @ok="handleOk">
      <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-form-item label="试卷库名">
          <a-input
              v-decorator="['title', { rules: [
                  { required: true, message: '不能为空' },
                  {pattern:/^.{2,8}$/,message: '试卷库名长度为2-8位'}
                  ] }]"
          />
        </a-form-item>
        <a-form-item label="状态">
          <a-radio-group name="radioGroup"
                         v-decorator="['isPublic',{rules:[{required: true,message:'不能为空'}]}]">
            <a-radio :value="0">
              public
            </a-radio>
            <a-radio :value="1">
              private
            </a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>

</template>

<script>
import {getPaperBank, deletePaper, deletePaperGroup, getPaperByName, editPaperBank} from "../../api/paper";

const columns = [
  {
    dataIndex: 'paperName',
    key: 'title',
    slots: {title: 'customTitle'},
    scopedSlots: {customRender: 'title'},
  },
  {
    title: '状态',
    key: 'status',
    dataIndex: 'status',
    scopedSlots: {customRender: 'status'},
  },
  {
    title: '类型',
    key: 'type',
    dataIndex: 'isPublic',
    scopedSlots: {customRender: 'type'},
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: {customRender: 'action'},
  }
];


export default {
  name: "paper",
  data() {
    return {
      bankTitle: '',
      columns,
      msg: '',
      totalPage: 1,
      papers: [],
      choose: [],
      selectedRowKeys: [],
      current: 1,
      isPublic:0,
      form: this.$form.createForm(this, {name: 'editPaperBank'}),
      visible:false,
    }
  },
  mounted() {
    this.reset()
  },
  methods: {
    //编辑试卷库
    handleOk(e){
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          let response = await editPaperBank(this.$route.params.bankId, values.title, values.isPublic)
          this.visible = false;
          console.log(response)
          if (response.code == 0) {
            this.$message.success('编辑成功！')
            await this.reset()
          } else {
            this.$message.error("编辑失败")
          }
        }
      });

    },
    setForm(){
      this.$nextTick(() => {
        this.form.setFieldsValue({
          title: this.bankTitle,
          isPublic: this.isPublic
        })
      })
    },
    showEdit(){
      this.visible=true
      this.setForm()
    },
    async reset() {
      let params = this.$route.params;
      let response = await getPaperBank(params.bankId, 1)
      console.log("bankList", response)
      this.papers = response.data.list;
      this.bankTitle = response.data.papersName;
      this.totalPage = response.data.pages
      this.isPublic=response.data.isPublic
      this.current = 1
    },
    async onSearch(value) {
      let params = this.$route.params;
      let response = await getPaperByName(params.bankId, 1,value)
      console.log("search",response)
      this.papers = response.data.list;
      this.bankTitle = response.bankTitle;
      this.totalPage = response.data.pages
      this.current = 1
    },
    back() {
      this.$router.push({name: 'paperBank'})
    },
    detail(id) {
      this.$router.push({name: 'paperInfo', params: {paperId: id}})
    },
    //删除
    async confirm(id) {
      let response = await deletePaper(this.$store.getters.getTeacher.id, id)
      if (response.code == 0) {
        console.log("删除试卷：" + id)
        this.$message.success('删除成功！')
        await this.reset()
      } else {
        this.$message.error("删除失败")
      }
    },
    cancel(e) {
      console.log(e);
    },
    //添加试卷
    addPaper() {
      let id = this.$route.params.bankId
      this.$router.push({name: 'createPaper', params: {bankId: id}})
    },
    //选择
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    async deleteGroup() {
      let response = await deletePaperGroup(this.$store.getters.getTeacher.id, this.selectedRowKeys)
      if (response.code==0) {
        this.$message.success('删除成功！')
        await this.reset()
      } else {
        this.$message.error("删除失败")
      }
    },
    //分页
    async onChange(pageNumber) {
      console.log('Page: ', pageNumber);
      if (pageNumber <= this.totalPage) {
        let params = this.$route.params;
        let response = await getPaperBank(params.bankId, 1);
        this.papers = response.res;
        this.totalPage = response.totalPage
      }
    }

  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0;
    },
  },

}
</script>

<style scoped>
body {
  background-color: #939393;
}

.top {
  height: 40px;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: white;
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

.table {
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






