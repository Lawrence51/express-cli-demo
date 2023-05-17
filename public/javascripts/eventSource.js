// 建立连接
const source = new EventSource('http://localhost:3002/event/eventSource/test');
let str = '';
// 接收信息
source.onmessage = function (e) {
  if (e.data === 'end') {
    // 判断end，关闭连接
    source.close()
  }

  str += e.data
  // 实时输出字符串
  console.log(str)
};