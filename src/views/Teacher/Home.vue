<template>
  <div class="home">
    <div id="top">

      <router-link to="/teacher/login">
        <button class="btn">login</button>
      </router-link>
      <router-view></router-view>

    </div>
  </div>
</template>

<script>

export default {
  name: 'Home'
}
</script>

<style scoped>
#top {
  /*border-style: dotted;*/
  text-align: right;
  height: 70px;
  width: 100%;
}

.btn {
  background: transparent;
  border: 3px solid #409eff;
  border-radius: 70px;
  text-decoration: none;
  text-transform: uppercase;
  color:#409eff;
  padding: 6px 12px;
  text-align: center;
  display: inline-block;
  font-size: 16px;
  font-weight: bolder;
  margin: 8px 8px;
  transition-duration: 0.4s;
  cursor: pointer;
}

.btn:hover {
  background-color: #409eff;
  color: white;
}
</style>
