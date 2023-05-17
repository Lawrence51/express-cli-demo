const express = require('express')
const router = express.Router();

/* GET home page. */
router.get('/event-source', function(req, res, next) {
  console.log('-------111------')
  res.render('eventsource', { title: 'eventsource' });
});

let song = [
  '我', '懒', '得', '写', '你', '谷', '搜', '到', '处', '皆', '只', '因', '你', 
  '太', '美', '浅', '唱', '动', '人', '说', '不', '出', '我', '试', '着', '多', 
  '看', '你', '一', '眼', '却', '发', '现', '我', '已', '沉', '溺', '于', '你', 
  '的', '镜', '头', '里', '只', '因', '你', '太', '美', '所', '以', '我', '多', 
  '看', '了', '一', '眼', '只', '因', '我', '太', '傻', '所', '以', '我', '放', 
  '不', '开', '你', '的', '手', '只', '因', '你', '太', '美', '所', '以', '我', 
  '做', '了', '个', '梦', '梦', '见', '你', '在', '微', '笑', '我', '在', '注', 
  '视', '只', '因', '你', '太', '美', '所', '以', '我', '放', '了', '你', '的', 
  '手', '所', '以', '我', '会', '微', '笑', '因', '为', '你', '太', '美', 'end'
];

router.all('/eventSource/test', (req, res)=> {
  res.writeHead(200, {
    // 开启 Server-sent events
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    // 保持连接
    'Connection': 'keep-alive',
    // 允许跨域
    'Access-Control-Allow-Origin': '*'
  });
  let index = 0;

  // 模拟每隔0.5s向前端推送一次
  setInterval(() => {
    const s = song[index];

    if (s) {
      res.write(`data: ${song[index]}\n\n`);
    } else {
      res.write('0');
    }
    index++;
  }, 500);
})

module.exports = router;