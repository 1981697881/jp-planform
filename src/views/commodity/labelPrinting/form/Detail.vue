<template>
  <div>
    <div class="printClass" v-for="(label,labeIndex) in labelList" :key="labeIndex" :ref="'packgeImg'+labeIndex">
      <template v-for="(val, key) in label">
        <div style="width: 60mm;height: auto" v-for="(item,index) in val" :key="index">
          <div class="scan" v-if="!item.labelVOS && val.length>0" :ref="'lessonTableImg'+labeIndex+key">
            <table>
              <tr>
                <td colspan="5" rowspan="5" class="img-scan"><!--:logoSrc="require(`@/assets/img/logo.png`)"-->
                  <vue-qr
                    class="scanImg"
                    :text="'https://cb.gzfzdev.com/shoes/redirect/scanResult?qrCode=' + item.labelId"
                    :margin="0"
                    :logoScale="0.2"
                  >
                  </vue-qr>
                </td>
              </tr>
              <tr>
                <td style="text-align: left">CN({{item.lastShape}})</td>
                <td style="font-size: 18px;font-weight: 700">{{item.cnSize}}</td>
              </tr>
              <tr>
                <td style="text-align: left">EUR</td>
                <td style="font-size: 18px;font-weight: 700">{{item.eurSize}}</td>
              </tr>
              <tr>
                <td style="text-align: left">US(M's)</td>
                <td style="font-size: 18px;font-weight: 700">{{item.usmSize}}</td>
              </tr>
              <tr>
                <td style="text-align: left">US(W's)</td>
                <td style="font-size: 18px;font-weight: 700">{{item.uswSize}}</td>
              </tr>
              <tr>
                <td colspan="5">
                <span
                  style="padding: 0 2px 0 2px;font-size: 18px; font-weight: 700"
                  :style="'color: '+ item.labelColors[items-1].col"
                  v-for="(items,index) in 4"
                  :key="index"
                >{{item.labelColors[items-1].num}}</span>
                </td>
                <td colspan="2" style="vertical-align: bottom;font-size: 12px">{{item.productName}}</td>
              </tr>
              <tr>
                <td colspan="5">
                <span style="padding: 0 2px 0 2px;font-size: 18px;font-weight: 700"
                      :style="'color: '+ item.labelColors[items+3].col" v-for="(items,indexs) in 4" :key="indexs"
                >{{item.labelColors[items+3].num}}</span>
                </td>
                <td colspan="2" style="font-size: 12px">{{item.itemNo.split('/')[0]}}</td>
              </tr>
              <tr>
                <td colspan="5">
                <span style="padding: 0 2px 0 2px;font-size: 18px;font-weight: 700"
                      :style="'color: '+ item.labelColors[items+7].col" v-for="(items,indexs) in 4" :key="indexs"
                >{{item.labelColors[items+7].num}}</span>
                </td>
                <td colspan="2" style="vertical-align: top;font-size: 12px">{{item.itemNo.split('/')[1]}}</td>
              </tr>
              <tr>
                <td colspan="5">MADE IN CHINA</td>
                <td colspan="2">{{item.batchNo}}</td>
              </tr>
            </table>
          </div>
        </div>
      </template>
    </div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-table
            class="list-main"
            height="400px"
            :data="list"
            border
            size="mini"
            @selection-change="handleSelectionChange"
            :highlight-current-row="true">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              v-for="(t,i) in columns"
              :key="i"
              align="center"
              :prop="t.name"
              :label="t.text"
              v-if="t.default!=undefined?t.default:true"
              :width="t.width?t.width:''"
            ></el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center;">
      <el-button type="primary" @click="saveData('form')" v-loading.fullscreen.lock="fullscreenLoading">??????</el-button>
    </div>
  </div>
</template>

<script>import {temporaryLabels} from '@/api/basic/index'
import {createLabel} from '@/api/commodity/index'
import JSZip from 'jszip'
import FileSaver from 'file-saver'
import html2Canvas from 'html2canvas'
import Canvas2Image from 'Canvas2Image'
import vueQr from 'vue-qr'

let loadingInstance = ''
export default {
  components: {
    vueQr
  },
  props: {
    listInfo: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      list: [],
      visible: null,
      columns: [
        {text: '????????????', name: 'printStatus'},
        {text: '??????', name: 'contrastId'},
        {text: '??????', name: 'seriesName'},
        {text: '??????', name: 'productName'},
        {text: '?????????', name: 'batchNo'},
        {text: '??????', name: 'color'},
        {text: '?????????', name: 'deadline'},
        {text: '??????', name: 'lastShape'},
        {text: '??????', name: 'productPhoto'},
        {text: 'cn1', name: 'cnOne'},
        {text: 'cn2', name: 'cnTwo'},
        {text: 'cn3', name: 'cnThree'},
        {text: 'cn4', name: 'cnFour'},
        {text: 'cn5', name: 'cnFive'},
        {text: 'cn6', name: 'cnSix'},
        {text: 'cn7', name: 'cnSeven'},
        {text: 'cn8', name: 'cnEight'},
        {text: 'cn9', name: 'cnNine'},
        {text: 'cn10', name: 'cnTen'},
        {text: 'cn11', name: 'cnEleven'},
        {text: 'cn12', name: 'cnTwelve'},
        {text: 'cn13', name: 'cnThirteen'},
        {text: 'cn14', name: 'cnFourteen'},
        {text: 'cn15', name: 'cnFifteen'},
        {text: 'cn16', name: 'cnSixteen'},
        {text: 'cn17', name: 'cnSeventeen'},
        {text: 'cn18', name: 'cnEight'},
        {text: 'cn19', name: 'cnNine'},
        {text: 'cn20', name: 'cnTwenty'},
        {text: 'cn21', name: 'cnTwentyOne'},
        {text: 'cn22', name: 'cnTwentyTwo'},
        {text: 'cn23', name: 'cnTwentyThree'},
        {text: 'cn24', name: 'cnTwentyFour'},
        {text: 'cn25', name: 'cnTwentyFive'},
        {text: 'cn26', name: 'cnTwentySix'},
        {text: 'cn27', name: 'cnTwentySeven'},
        {text: 'cn28', name: 'cnTwentyEight'},
        {text: 'cn29', name: 'cnTwentyNine'},
        {text: 'cn30', name: 'cnThirty'},
        {text: '????????????', name: 'allCount'}
      ],
      form: {},
      labelList: {},
      multipleSelection: [],
      disPl: true,
      fullscreenLoading: false,
      rules: {},
      arr: [],
      qrcodeArr: [],
      random: '1',
      codeId: '',
      index: 0
    };
  },
  watch: {
    index(newName, oldName) {
      if (newName != oldName && newName <= this.arr.length - 1) {
        setTimeout(_ => {
          this.setarr(this.arr);
        }, 0)
      } else {
        this.$nextTick(_ => {
          loadingInstance.close();
        });
      }
    }
  },
  mounted() {
    if (this.listInfo) {
      this.form = this.listInfo
      this.formatList({excelName: this.listInfo.excelName})
    }
  },
  methods: {
    texte(url, qid) {
      setTimeout(_ => {
        this.createImgs()
      }, 100)
    },
    setarr(arr) {
      this.arr = arr
      if (this.index > this.arr.length - 1) {
        this.index = 0
      }
      let index = this.index || 0;
      loadingInstance = this.$Loading.service({
        lock: true,
        text: '???????????????????????????????????????...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      this.codeNumber = this.arr[index].codeNumber;
      this.arr[index].codeId ? (this.codeId = this.arr[index].codeId) : this.$Message.warn('????????????????????????????????????');
      this.codeValue = this.initCodeVal + '?codeId=' + this.arr[index].codeId + '&codeNumber=' + this.arr[index].codeNumber;
      this.random = Math.random();
    },
    async createImgs(){
      var that = this
      that.qrcodeArr = []
      var number = 0;
      for(var item=0;item<that.labelList.length;item++){
        var labelArr = []
        for (var i in that.labelList[item]) {
          if(that.labelList[item][i].length>0){
            var cnArr = []
            for(var label=0;label<that.labelList[item][i].length;label++){
              let labels=that.labelList[item][i][label];
              let shareContent = that.$refs['lessonTableImg' + item + i][0],
                width = shareContent.offsetWidth,
                height = shareContent.offsetHeight,
                canvas = document.createElement('canvas'),
                scale = 1;
              canvas.width = width * scale;
              canvas.height = height * scale;
              canvas.style.width = (shareContent.clientWidth * scale) / 100 + 'rem';
              canvas.style.height = (shareContent.clientHeight * scale) / 100 + 'rem';
              canvas.getContext('2d').scale(scale, scale);
              let opts = {
                scale: scale,
                canvas: canvas,
                logging: false,
                width: width,
                height: height,
                useCORS: true
              };
              console.log(11111111)
              await that.paintingImg(shareContent, opts).then((val) => {
                console.log(1234567890)
                cnArr.push({
                  url: val,
                  order: labels.batchNo,
                  name: labels.productName + '-' +labels.productName+'-'+labels.cnSize
                })
              })
              that.codeId = null
            }
            labelArr.push({
              name: i,
              cnArr: cnArr
            })
          }
        }
        that.qrcodeArr.push({
          arr: labelArr
        });
      }
      /*that.labelList.forEach((item, index) => {
        var labelArr = []
        for (var i in item) {
          if(item[i].length>0){
           var cnArr = []
            item[i].forEach((label, labelIndex) => {
              let shareContent = that.$refs['lessonTableImg' + index + i][0],
                width = shareContent.offsetWidth,
                height = shareContent.offsetHeight,
                canvas = document.createElement('canvas'),
                scale = 1;
              canvas.width = width * scale;
              canvas.height = height * scale;
              canvas.style.width = (shareContent.clientWidth * scale) / 100 + 'rem';
              canvas.style.height = (shareContent.clientHeight * scale) / 100 + 'rem';
              canvas.getContext('2d').scale(scale, scale);
              let opts = {
                scale: scale,
                canvas: canvas,
                logging: false,
                width: width,
                height: height,
                useCORS: true
              };
              console.log(11111111)
              await that.paintingImg(shareContent, opts).then((val) => {
                console.log(1234567890)
                cnArr.push({
                  url: val,
                  order: label.batchNo,
                  name: label.productName + '-' +label.productName+'-'+label.cnSize
                })
              })
              that.codeId = null
            })
            console.log(cnArr)
            labelArr.push({
              name: i,
              cnArr: cnArr
            })
          }
        }
        that.qrcodeArr.push({
          arr: labelArr
        });
      })*/
      that.packageImages()
    },
    async paintingImg(shareContent, opts){
      return new Promise(async(resolve, reject) => {
        try {
          const canvas  = await html2Canvas(shareContent, opts)
          const qrContentImage = canvas.toDataURL('image/png', 1.0)
          resolve(qrContentImage);
        } catch (error) {
          reject(error);
        }
      })
    },
    packageImages() {
      let that = this
      const zip = new JSZip();
      const cache = {};
      setTimeout(_ => {
        let arr = that.qrcodeArr;
        arr.forEach((item, index) => {
          var image = zip.folder(item['arr'][0]['cnArr'][0]['order']+'-'+index)
          item['arr'].forEach((pack)=>{
            var file = image.folder(pack['name'])
            pack['cnArr'].forEach((cnSize,cnIndex)=>{
              let fileName = cnSize.name;
              file.file(fileName +'-'+cnIndex+ '.png', cnSize.url.substring(22), {base64: true})
              cache[fileName] = cnSize.url
            })
          })
        });
         zip.generateAsync({type: "blob"}).then(content => {
           FileSaver.saveAs(content, this.form.excelName+".zip")
           that.fullscreenLoading = false;
           that.$message({
             type: 'success',
             message: '????????????'
           })
           that.$emit('hideDialog', false)
           that.$emit('uploadList')
         })
      }, 0)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    formatList(val) {
      temporaryLabels(val).then(res => {
        if (res.flag) {
          this.list = res.data
        }
      })
    },
    saveData(form) {
      const that = this
      this.$refs[form].validate((valid) => {
        // ???????????????
        if (valid) {
          if (this.multipleSelection.length > 0) {
            createLabel(this.multipleSelection).then(res => {
              if (res.flag) {
                that.labelList = res.data
                that.fullscreenLoading = true;
                that.texte()
                /* this.$emit('hideDialog', false)
                 this.$emit('uploadList')*/
              }
            })
          } else {
            this.$message({
              type: 'info',
              message: '????????????'
            })
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style>
  .printClass {
    width: 0;
    height: 0;
    position: relative;
    z-index: 999;
    overflow: hidden;
  }

  .scan {
    width: 60mm;
    padding: 1mm;
    font-weight: 500;
    font-size: 14px;
  }

  .scan table {
    border-collapse: collapse;
  }

  .scan table, th, td {
    text-align: center;
  }

  .img-scan {
    width: 100px;
    height: 70px;
  }

  .scanImg {
    height: 22mm;
    width: 22mm;
  }
</style>
