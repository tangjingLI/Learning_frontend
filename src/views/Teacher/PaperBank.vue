<template>
  <div>
    <div>试卷库列表</div>
    <ul>
      <li v-for="paper in paperBankList">{{paper.name}}</li>
    </ul>
  </div>
</template>

<script>
import {getAllPapers} from "../../api/paper";

export default {
  name: "PaperBank",
  data(){
    return{
      paperBankList:{}
    }
  },
  mounted() {
    this.paperBankList=getAllPapers(this.$store.getters.getTeacher.id);
    // console.log(this.paperBankList)
  }
}
</script>

<style scoped>

</style>