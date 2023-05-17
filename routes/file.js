const formidable = require('formidable');
var express = require('express');
const sd=require('silly-datetime');//格式化时间字符串
var router = express.Router();
const path = require('path');
const fs = require('fs');

/* GET home page. */
router.post('/image', function(req, res, next) {
  //创建formidable表单解析对象
	const form = new formidable.IncomingForm();
  //保留上传文件的后缀名字
	form.keepExtensions = true;
  //设置上传文件的保存路径
  console.log('__dirname--', __dirname)
	form.uploadDir = path.join('/node-uploads');
	//解析客户端传递过来的formData对象
	form.parse(req,(err,fields,files)=>{
		//req:请求对象，err错误对象，filelds：普通请求参数的内容
		//files：文件的内容
    console.log('-----1', err,  files.file);
    if(err){
      res.send('上传失败');
    }

    var oldpath ='/node-uploads/' + files.file.newFilename;
    var name ='/node-uploads/' + files.file.originalFilename;
    fs.rename(oldpath,name,function(err){
        if(err){
            console.log('改名失败', err)
        }
    })

		res.send('上传成功');
	})
});

module.exports = router;
