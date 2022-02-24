<template>
  <div class="paper">
    <div>paper</div>
    <a-dropdown>
      <a class="ant-dropdown-link" @click="e => e.preventDefault()" id="phone">
        {{ this.$store.getters.getTeacher.phone }}
        <a-icon type="down"/>
      </a>
      <a-menu slot="overlay">
        <a-menu-item>
          <a href="javascript:;">1st menu item</a>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>
export default {
  name: "paper"
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: white;
}
</style>