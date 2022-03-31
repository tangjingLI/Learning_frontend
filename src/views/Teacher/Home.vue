<template>
  <div class="home">
    <a-layout id="components-layout-demo-side" style="min-height: 100vh;">
      <a-layout-sider v-model="collapsed" collapsible width="250px">
        <div class="logo">
          <p>源图</p>
        </div>
        <a-menu theme="dark" :default-selected-keys="['1']" mode="inline">
          <a-menu-item key="1" @click="()=>{this.$router.push('/teacher')}">
            <a-icon type="home"/>
            <span>
              <router-link to="/teacher">控制台</router-link>
            </span>
          </a-menu-item>
          <a-menu-item key="2" @click="()=>{this.$router.push('/teacher/testBank')}">
            <a-icon type="coffee" />
            <span>
              <router-link to="/teacher/testBank">题库管理</router-link>
            </span>
          </a-menu-item>
          <a-menu-item key="3" @click="()=>{this.$router.push('/teacher/paperBank')}">
            <a-icon type="experiment" />
            <span>
              <router-link to="/teacher/paperBank">试卷管理</router-link>
            </span>
          </a-menu-item>
          <a-menu-item key="4" @click="()=>{this.$router.push('/teacher/courseList')}">
            <a-icon type="rocket" />
            <span>
              <router-link to="/teacher/courseList">课程管理</router-link>
            </span>
          </a-menu-item>
          <a-menu-item key="5" @click="()=>{this.$router.push('/teacher/quality')}">
            <a-icon type="crown" />
            <span>
              <router-link to="/teacher/courseList">品行管理</router-link>
            </span>
          </a-menu-item>
          <a-menu-item key="6" @click="()=>{this.$router.push('/teacher/knowledge')}">
            <a-icon type="crown" />
            <span>
              <router-link to="/teacher/courseList">能力管理</router-link>
            </span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #ffffff; padding: 0;height: 50px" class="top">

          <!--          <a-breadcrumb class="breadcrumb" separator=">" id="bread">-->
          <!--            <a-breadcrumb-item v-for="(item, index) in breadList" :key="index">-->
          <!--              <span>-->
          <!--                <router-link v-if="item.url" :to="item.url">{{ item.name }}</router-link>-->
          <!--                <span v-else>{{ item.name }}</span>-->
          <!--                {{ item.name }}-->
          <!--              </span>-->
          <!--            </a-breadcrumb-item>-->
          <!--          </a-breadcrumb>-->
          <h1 id="label">个性化学习过程管理与推荐系统</h1>

          <a-avatar style="backgroundColor:#1C90F5" icon="user" id="icon"/>

          <a-dropdown>
            <a class="ant-dropdown-link" @click="e => e.preventDefault()" id="phone" style="color: #000000">
              {{ this.$store.getters.getTeacher.phone }}
              <a-icon type="down"/>
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <router-link to="/logout">退出登录</router-link>
              </a-menu-item>
            </a-menu>
          </a-dropdown>

        </a-layout-header>
        <a-layout-content style="margin:0;">
          <router-view style="height: 580px;"></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>

  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      collapsed: false,
      name: '',
      // breadList: [],
    };
  },
  created() {
    // this.getBreadcrumb()
  },
  methods: {
    // getBreadcrumb() {
    //   this.breadList = []
    //   this.name = this.$route.name
    //   this.$route.matched.forEach(item => {
    //     this.breadList.push(item)
    //   })
    // }
    // getBreadcrumb() {
    //   let matched = this.$route.matched
    //   // matched 里面的很多数据我们并不需要，放进去如果后面增加的数据键值对不一致会导致错误
    //   matched = matched.map((item) => {
    //     // console.log(item)
    //     return {name: item.name}
    //   })
    //   this.$store.commit("saveBreadList", matched)
    // },
  },
  watch: {
    // $route() {
    //   this.getBreadcrumb()
    // }
  },
  computed: {
    // breadList() {
    //   window.sessionStorage.setItem('breadList', JSON.stringify(this.$store.getters.getBread));
    //   return this.$store.getters.getBread;
    // }
  },
};
</script>

<style scoped>

body{
  overflow-y: hidden;
}

#components-layout-demo-side .logo {
  height: 50px;
  width: 100%;
  background: rgba(179, 177, 177, 0.2);
  color: white;
}

.logo p {
  position: relative;
  top: 30%;
  margin-left: 15px;
  font-size: 20px;
}

a {
  color: white;
}

/*a #go {*/
/*  color: #939393;*/
/*}*/


.top #icon {
  float: right;
  margin: 10px;
}

.top #phone {
  float: right;
  /*position: fixed;*/
  /*left: 85%;*/
  /*top: 10px;*/
  /*text-decoration:underline;*/
}

/*.top #bread {*/
/*  float: left;*/
/*  margin: 20px;*/
/*  font-weight: bold;*/
/*}*/

.top #label {
  float: left;
  margin-left: 15px;
  letter-spacing: 2px;
  font-weight: bold;
  size: 30px;
}

</style>