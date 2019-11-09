<template>
  <nav-bar>
    <div slot="left" class="back" @click="backClick">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="center">
      <div v-for="(title, index) in titles"
           class="title"
           :class="{active: currentIndex === index}"
           @click="titleClick(index)">
        {{title}}
      </div>
    </div>
  </nav-bar>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
    export default {
        name: "DetailNavBar",
        data() {
          return {
              titles: ['商品','参数','评论','推荐'],
              currentIndex: 0
          }
        },
        methods: {
            titleClick(index) {
                this.currentIndex = index;
                this.$emit('titleClick', index)
            },
            backClick() {
                this.$router.back()
            }
        },
        components: {
            NavBar
        }
    }
</script>

<style scoped>
  .center {
    display: flex;
    text-align: center;
    font-size: 14px;
  }
  .title {
    flex: 1;
  }
  .active {
    color: var(--color-high-text);
  }
  .back {
    margin-top: 7px;
  }
</style>
