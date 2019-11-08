<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl1" :class="{fixed: isTabFixed}" class="tab-control1"></tab-control>
    <scroll class="content"
            ref="scroll"
            :probeType="3"
            @scroll="scrollContent"
            :pullUpLoad="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImgLoad.once="swiperImgLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
    import HomeSwiper from "./childComps/HomeSwiper";
    import RecommendView from "./childComps/RecommendView";
    import FeatureView from "./childComps/FeatureView";

    import NavBar from "components/common/navbar/NavBar";
    import TabControl from "components/content/tabControl/TabControl";
    import GoodsList from "components/content/goods/GoodsList";
    import Scroll from "components/common/scroll/Scroll";
    import BackTop from "components/content/backTop/BackTop";

    import {getHomeMutidata, getHomeGoods} from "network/home"; //请求发方法

    export default {
        name: "Home",
        data() {
            return {
                banners: [],
                recommends: [],
                goods: {
                    'pop': {page: 0, list: []},
                    'new': {page: 0, list: []},
                    'sell': {page: 0, list: []}
                },
                currentType: 'pop',
                isShowBackTop: false,
                tabOffsetTop: null,
                isTabFixed: false,
                saveY: 0

            }
        },
        computed: {
            showGoods() {
                return this.goods[this.currentType].list
            }
        },
        components: {
            HomeSwiper,
            RecommendView,
            FeatureView,
            NavBar,
            TabControl,
            GoodsList,
            Scroll,
            BackTop,
        },
        created() {  //这里最好只展示请求数据的方式，具体的数据操作在methods完成
            //1.请求多个数据
            this.getHomeMutidata()
            //2.请求首页tabcontrol页数据
            this.getHomeGoods('pop')
            this.getHomeGoods('new')
            this.getHomeGoods('sell')
        },
        mounted() {
        },
        activated() {
            // console.log('activated');
            this.$refs.scroll.scrollTo(0, this.saveY, 0)
            // this.$refs.scroll.refresh()
        },
        deactivated() {
            // console.log('deactivated');
            this.saveY = this.$refs.scroll.getScrollY()
        },
        // updated() {
        //     //1.所有的组件都有 $el属性，用于获取组件中的元素
        //     console.log(this.$refs.tabControl.$el.offsetTop);
        // },
        methods: {
            /*
            * 事件监听相关方法
            * */
            tabClick(index) {
                // console.log(index);
                switch (index) {
                    case 0:
                        this.currentType = 'pop'
                        break
                    case 1:
                        this.currentType = 'new'
                        break
                    case 2:
                        this.currentType = 'sell'
                        break
                }
                //以下两行代码解决了两个tabcontrol在各自显示的范围内保持 点击一致
                this.$refs.tabControl1.currentIndex = index;
                this.$refs.tabControl2.currentIndex = index;
            },


            /*
            * 请求相关数据的方法
            * */
            getHomeMutidata() { //请求数据封装
                getHomeMutidata().then(res => {
                    // console.log(res);
                    this.banners = res.data.banner.list;
                    this.recommends = res.data.recommend.list
                })
            },
            getHomeGoods(type) {
                const page = this.goods[type].page + 1;
                getHomeGoods(type, page).then(res => {
                    // console.log(res);
                    // for(let item of res.data.list) {
                    //     this.goods[type].list.push(item);
                    // }
                    // this.goods[type].list=this.goods[type].list.concat(res.data.list)
                    this.goods[type].list.push(...res.data.list)
                    this.goods[type].page += 1
                })
            },
            backClick() {
                this.$refs.scroll.scrollTo(0, 0, 500)
            },
            scrollContent(position) {
                // console.log(position);
                this.isShowBackTop = position.y < -1000

                //1.判断tabcontrol是否需要吸顶
                this.isTabFixed = position.y < -this.tabOffsetTop + 44
                // console.log(this.isTabFixed);
            },
            loadMore() {
                // console.log('拉到低啦');
                // console.log(this.currentType);
                this.getHomeGoods(this.currentType)
                // console.log(this.$refs.scroll.scroll);
                this.$refs.scroll.finishPullUp() //完成下拉加载更多后，需要再次下拉加载，必须先调用此方法
            },
            swiperImgLoad() {
                // console.log(this.$refs.tabControl2.$el.offsetTop);
                this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
                // console.log(this.tabOffsetTop);
            }
        }
    }
</script>

<style scoped>
  #home {
    padding-top: 44px;
  }

  .home-nav {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
    background: var(--color-tint); /*在css已经可以定义变量，所以直接使用*/
    color: #fff;
  }

  /*.tab-control {*/
  /*  !*position: sticky;  !*非常强的一个属性用于吸顶效果*!*/
  /*  top: 44px;*! !*当该元素与top的距离等于44px时自动吸顶*!*/
  /*  !*background: #fff;*!*/
  /*  !*z-index: 7;*!*/
  /*}*/

  .content {
    height: calc(100vh - 98px);
    overflow: hidden;
    /*overflow: hidden;*/
  }

  .tab-control1 {
    /*display: none;*/
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    z-index: 8;
  }

  .fixed {
    display: flex;
    top: 44px;
    background: #fff;
  }
</style>
