<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imgLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
    import {Swiper, SwiperItem} from "components/common/swiper/index"

    export default {
        name: "HomeSwiper",
        props: {
            banners: {
                type: Array,
                default() {
                    return [];
                }
            }
        },
        data() {
            return {
                // isLoad: true
            }
        },
        components: {
            Swiper,
            SwiperItem,
        },
        methods: {
            imgLoad() {
                // if(this.isLoad) {
                    this.$emit('swiperImgLoad')
                    // this.isLoad = false
                // }
            }
        }
    }
</script>

<style scoped>

</style>
