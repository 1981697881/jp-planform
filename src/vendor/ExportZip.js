require('script-loader!file-saver');

import JSZip from 'jszip'

/**文件打包
 * arrImages:文件list:[{fileUrl:文件url,renameFileName:文件名}]
 * filename 压缩包名
 * */
export function filesToRar(arrImages, filename) {
  let _this = this;
  let zip = new JSZip();
  let cache = {};
  let promises = [];
  _this.title = '正在加载压缩文件';
  for (let item of arrImages) {
    const promise= _this.getImgArrayBuffer(item.fileUrl).then(data => {
      // 下载文件, 并存成ArrayBuffer对象(blob)
      zip.file(item.renameFileName, data, { binary: true }); // 逐个添加文件
      cache[item.renameFileName] = data;
    });
    promises.push(promise);
  }
  Promise.all(promises).then(() => {
    zip.generateAsync({ type: "blob" }).then(content => {
      _this.title = '正在压缩';
      // 生成二进制流
      FileSaver.saveAs(content, filename); // 利用file-saver保存文件 自定义文件名
      _this.title = '压缩完成';
    });
  }).catch(res=>{
    _this.$message.error('文件压缩失败');
  });
};
// 获取文件blob
export function getImgArrayBuffer(url){
  let _this=this;
  return new Promise((resolve, reject) => {
    // 通过请求获取文件blob格式
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url, true);
    xmlhttp.responseType = "blob";
    xmlhttp.onload = function () {
      if (this.status == 200) {
        resolve(this.response);
      }else{
        reject(this.status);
      }
    }
    xmlhttp.send();
  });
};
