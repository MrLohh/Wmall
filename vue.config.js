module.exports = {
    configureWebpack: {
        resolve: {
            alias: { //关于别名的配置
                // '@' : 'src'  //表示@就是src文件夹的别名
                'assets': '@/assets',
                'common': '@/common',
                'network': '@/network',
                'views': '@/views',
                'components': '@/components',
            }
        }
    }
}
