 //获取文件选择表单
 var file = document.querySelector('#file');
 //为选择文件表单添加onchanges事件，选择文件时触发
 file.onchange = function(){
   var formData = new FormData();
   //将用户选择的文件追加到form对象当中
   formData.append('file',this.files[0]);
   var xhr = new XMLHttpRequest();
   xhr.open('post','/file/image');
   xhr.send(formData);
   xhr.onload = function(){
     //如果请求成功
     if(xhr.status == 200){
       console.log(xhr.responseText);
     }
   }
 }