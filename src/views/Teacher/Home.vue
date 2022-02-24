<template>
  <div class="home">
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <a-layout-sider v-model="collapsed" collapsible width="250px">
        <div class="logo">
          <p>源图</p>
        </div>
        <a-menu theme="dark" :default-selected-keys="['1']" mode="inline">
          <a-menu-item key="1">
            <a-icon type="pie-chart"/>
            <span>控制台</span>
          </a-menu-item>
          <a-menu-item key="2">
            <a-icon type="desktop"/>
            <span>
              <router-link to="/teacher/paper">试卷管理</router-link>
            </span>
          </a-menu-item>
          <a-sub-menu key="sub1">
            <span slot="title"><a-icon type="user"/><span>题库管理</span></span>
            <a-menu-item key="3">
              <router-link to="/teacher/exam/testBank">题库列表</router-link>
            </a-menu-item>
            <a-menu-item key="4">
              <router-link to="/teacher/exam/test">题目列表</router-link>
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub2">
            <span slot="title"><a-icon type="team"/><span>学习管理</span></span>
            <a-menu-item key="5">
              Team 1
            </a-menu-item>
            <a-menu-item key="8">
              Team 2
            </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #ffffff; padding: 0;height: 50px" class="top">

          <a-breadcrumb class="breadcrumb" separator=">" id="bread">
            <a-breadcrumb-item v-for="(item, index) in breadList" :key="item.name">
              <router-link
                  v-if="item.name != name && index != 1"
                  :to="{ path: item.path === '' ? '/' : item.path }"
              >{{ item.meta.title }}
              </router-link>
              <span v-else>{{ item.meta.title }}</span>
            </a-breadcrumb-item>
          </a-breadcrumb>

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
          <a-avatar style="backgroundColor:#4a9de7" icon="user" id="icon"/>

        </a-layout-header>
        <a-layout-content style="margin: 0 16px">
          <router-view></router-view>
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
      breadList: []
    };
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      this.breadList = []
      this.name = this.$route.name
      this.$route.matched.forEach(item => {
        this.breadList.push(item)
      })
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  }
};
</script>

<style scoped>
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


.top #icon {
  float: right;
  margin: 10px;
}

.top #phone {
  position: fixed;
  left: 85%;
  /*top: 10px;*/
  /*text-decoration:underline;*/
}

.top #bread {
  float: left;
  margin: 20px;
  font-weight: bold;
}

</style>