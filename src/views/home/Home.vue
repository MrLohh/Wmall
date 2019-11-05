<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import {getHomeMutidata} from "network/home"; //请求发方法
  export default {
        name: "Home",
      data() {
          return {
            banners: [],
              recommends: []
          }
      },
        components: {
            NavBar,
            HomeSwiper,
            RecommendView
        },
      created() {
            //1.请求多个数据
          getHomeMutidata().then(res => {
              // console.log(res);
              this.banners = res.data.banner.list;
              this.recommends = res.data.recommend.list
          })
      }
  }
</script>

<style scoped>
  .home-nav {
    background: var(--color-tint); /*在css已经可以定义变量，所以直接使用*/
    color: #fff;
  }
</style>
