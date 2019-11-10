<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content"
            ref="scroll"
            @scroll="contentScroll"
            :probeType="3">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop" class="shop-info"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo"></detail-goods-info>
      <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comments" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommends" :goods="recommends"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
  </div>
</template>

<script>
    import DetailNavBar from "./childComps/DetailNavBar";
    import DetailSwiper from "./childComps/DetailSwiper";
    import DetailBaseInfo from "./childComps/DetailBaseInfo";
    import DetailShopInfo from "./childComps/DetailShopInfo";
    import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
    import DetailParamInfo from "./childComps/DetailParamInfo";
    import DetailCommentInfo from "./childComps/DetailCommentInfo";
    import DetailBottomBar from "./childComps/DetailBottomBar";

    import Scroll from "components/common/scroll/Scroll";
    import GoodsList from "components/content/goods/GoodsList";
    import BackTop from "components/content/backTop/BackTop";

    import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail";

    export default {
        name: "Detail",
        data() {
            return {
                iid: null,
                topImages: [], //详情页轮播区图片
                goods: {},
                shop: {},
                detailInfo: {},
                paramInfo: {},
                commentInfo: {},
                recommends: [],
                themeTops: [],
                currentIndex: null,
                isShowBackTop: false,
            }
        },
        components: {
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            DetailShopInfo,
            DetailGoodsInfo,
            DetailParamInfo,
            DetailCommentInfo,
            Scroll,
            GoodsList,
            DetailBottomBar,
            BackTop
        },
        methods: {
            titleClick(index) {
                // console.log(index);
                this.$refs.scroll.scrollTo(0, -this.themeTops[index], 300)
            },
            contentScroll(position) {
                // console.log(position);
                const positionY = -position.y;
                // console.log(positionY);
                for(let i = 0; i < 4; i++){
                    // console.log(i,'1');
                    // if(positionY > this.themeTops[i] && positionY < this.themeTops[i+1]){
                    //     // this.currentIndex = i;
                    //     console.log(i);
                    // }
                    // if(this.currentIndex !== i && ((i < 3 && positionY >= this.themeTops[i] && positionY < this.themeTops[i+1]) || (i === 3 && positionY >= this.themeTops[i]))){
                    //     this.currentIndex = i;
                    //     console.log(this.currentIndex);
                    //     this.$refs.nav.currentIndex = this.currentIndex;
                    // }
                    if(this.currentIndex !== i && (positionY >= this.themeTops[i] && positionY < this.themeTops[i+1])){
                        this.currentIndex = i;
                        this.$refs.nav.currentIndex = this.currentIndex;
                        // console.log(this.currentIndex);
                    }
                };
                this.isShowBackTop = position.y < -1000
            },
            backClick() {
                this.$refs.scroll.scrollTo(0, 0, 500)
            },
            addToCart() {
                const product = {};
                product.image = this.topImages[0]
                product.title = this.goods.title
                product.desc = this.goods.desc
                product.price = this.goods.realPrice
                product.iid = this.iid
                this.$store.dispatch('addCart', product)
            }
        },
        created() {
            //保存iid
            this.iid = this.$route.params.iid
            //根据iid请求详情页数据
            getDetail(this.iid).then(res => {
                // console.log(res);
                const data = res.result
                // console.log(data);
                this.topImages = data.itemInfo.topImages
                //获取具体商品信息
                this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
                //获取商店店铺信息
                this.shop = new Shop(data.shopInfo)
                //穿着 数据获取
                this.detailInfo = data.detailInfo
                //获取参数信息
                this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
                //获取评论信息
                if(data.rate.cRate !== 0){
                    this.commentInfo = data.rate.list[0]
                }

                //等数据传递过去并渲染完dom 执行下面这个回调
                //虽然dom渲染完毕，但是图片还可能未加载完毕
                //offsetTop值不对的原因，都是因为图片的问题
                // this.$nextTick(() => {
                //     this.themeToYs.push(0)
                //     this.themeToYs.push(this.$refs.params.$el.offsetTop-30)
                //     this.themeToYs.push(this.$refs.comments.$el.offsetTop)
                //     this.themeToYs.push(this.$refs.recommends.$el.offsetTop-50)
                //     console.log(this.themeToYs);
                // })
            })

            //请求详情页推荐数据
            getRecommend().then(res => {
                // console.log(res);
                this.recommends = res.data.list
            })
        },
        mounted() {
            // this.themeToYs.push(0)
            // this.themeToYs.push(this.$refs.params.$el.offsetTop)
            // this.themeToYs.push(this.$refs.comments.$el.offsetTop)
            // this.themeToYs.push(this.$refs.recommends.$el.offsetTop)
            // console.log(this.themeToYs);
        },
        updated() {
            setTimeout(() => {
                this.themeTops.push(0)
                this.themeTops.push(this.$refs.params.$el.offsetTop-30)
                this.themeTops.push(this.$refs.comments.$el.offsetTop)
                this.themeTops.push(this.$refs.recommends.$el.offsetTop-50)
                this.themeTops.push(Number.MAX_VALUE)
                // console.log(Number.MAX_VALUE);
                // console.log(this.themeTops);
            }, 300)
        }
    }
</script>

<style scoped>
  .detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .detail-nav {
    position: relative;
    background: #fff;
    z-index: 10;
  }
  .content {
    height: calc(100vh - 44px - 49px);
  }
  .shop-info {
    background: #fff;
  }
</style>
