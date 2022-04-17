<!--?response-content-type=application/octet-stream-->


<template>
  <div>
    <div v-for="chapter in chapters">
      <div class="chapter" @click="chooseChapter(chapter.id)" >

        <p>{{ chapter.name }}</p>
      </div>

      <div v-if="current==chapter.id" v-for="item in chapter.child">
        <p>{{item.name}}</p>
        <span><a>下载</a></span>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: -1,
      chapters: [
        {
          name: '111',
          id: 1,
          child: [
            {name: '1-1'},
            {name: '1-2'}
          ]
        },
        {
          name: '222',
          id: 2,
          child: [
            {name: '2-1'},
            {name: '2-2'}
          ]
        }
      ],
    }
  },
  methods: {
    chooseChapter(id){
      this.current=id
    }
  }
}
</script>

<style scoped>

</style>