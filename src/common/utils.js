export function debounce(fn, delay) {
  let timer = null;
  return function () {
    let selt = this;
    let args = arguments;
    timer && clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(selt, args);
    }, delay || 1000);
  }
}
