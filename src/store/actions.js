export default {
  addCart(context, payload) {
    // let oldProduce = null
    // for(let item of state.cartList){
    //   if(item.iid === payload.iid) {
    //     oldProduce = item
    //   }
    // }
    //查找之前数组中是否有该商品
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

    if (oldProduct) {
      // oldProduce.count++
      context.commit('addCounter', oldProduct)
    } else {
      payload.count = 1
      // context.state.cartList.push(payload)
      context.commit('addToCart', payload)
    }
  }
}
