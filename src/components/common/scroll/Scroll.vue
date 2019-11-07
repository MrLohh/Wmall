<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
    import BScroll from 'better-scroll'

    export default {
        name: "Scroll",
        data() {
            return {
                scroll: null
            }
        },
        props: {
            probeType: {
                type: Number,
                default: 0
            },
            pullUpLoad: {
                type: Boolean,
                default: false
            }
        },
        components: {
            BScroll
        },
        methods: {
            scrollTo(x, y, time = 300) {
                this.scroll.scrollTo(x, y, time)
            },
            finishPullUp() {
                this.scroll.finishPullUp()//完成下拉加载更多后，需要再次下拉加载，必须先调用此方法
            }
        },
        mounted() {
            //1.创建scroll对象
            this.scroll = new BScroll(this.$refs.wrapper, {
                click: true,
                probeType: this.probeType, //开启滚动距离监听
                pullUpLoad: this.pullUpLoad //开启上拉刷新监听
            })
            //2.监听滚动的位置
            this.scroll.on('scroll', position => {
                // console.log(position);
                this.$emit('scroll', position) //导出position
            })
            //3.监听上拉事件
            this.scroll.on('pullingUp', () => {
                // console.log('拉到底啦');
                this.$emit('pullingUp')
            })
        }
    }
</script>

<style scoped>

</style>
