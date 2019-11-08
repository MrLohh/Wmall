<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop" class="shop-info"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo"></detail-goods-info>
    </scroll>
  </div>
</template>

<script>
    import DetailNavBar from "./childComps/DetailNavBar";
    import DetailSwiper from "./childComps/DetailSwiper";
    import DetailBaseInfo from "./childComps/DetailBaseInfo";
    import DetailShopInfo from "./childComps/DetailShopInfo";
    import DetailGoodsInfo from "./childComps/DetailGoodsInfo";

    import Scroll from "components/common/scroll/Scroll";

    import {getDetail,Goods,Shop} from "network/detail";

    export default {
        name: "Detail",
        data() {
            return {
                iid: null,
                topImages: [], //详情页轮播区图片
                goods: {},
                shop: {},
                detailInfo: {}
            }
        },
        components: {
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            DetailShopInfo,
            DetailGoodsInfo,
            Scroll
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
            })
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
    height: calc(100vh - 44px);
  }
  .shop-info {
    background: #fff;
  }
</style>
