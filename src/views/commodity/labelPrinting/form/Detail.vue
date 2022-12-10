<template>
  <div>
    <div class="printClass" v-for="(label,labeIndex) in labelList" :key="labeIndex" :ref="label">
      <div style="width: 60mm;height: auto" v-for="(item,index) in label" :key="index">
        <div  class="scan" v-if="!item.labelVOS" :ref="'lessonTableImg'+index">
          <table>
            <tr>
              <td colspan="5" rowspan="5" class="img-scan"><!--:logoSrc="require(`@/assets/img/logo.png`)"-->
                <vue-qr
                  class="scanImg"
                  :text="'https://cb.gzfzdev.com/shoes/redirect/scanResult?qrCode=' + item.labelId"
                  :margin="0"
                  :logoScale="0.2"
                  :callback="texte"
                >
                </vue-qr>
              </td>
            </tr>
            <tr>
              <td style="text-align: left">CN(2.5)</td>
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
           <!-- <tr>
              <td colspan="5">
              <span style="padding: 0 2px 0 2px;font-size: 18px; font-weight: 700"
                    :style="'color: '+ item.labelColors[items].col" v-for="(items,index) in 4" :key="index"
              >{{item.labelColors[items-1].num}}</span>
              </td>
              <td colspan="2" style="vertical-align: bottom;font-size: 12px">{{item.productName}}</td>
            </tr>
            <tr>
              <td colspan="5">
              <span style="padding: 0 2px 0 2px;font-size: 18px;font-weight: 700"
                    :style="'color: '+ item.labelColors[items+3].col" v-for="(items,index) in 4" :key="index"
              >{{item.labelColors[items+3].num}}</span>
              </td>
              <td colspan="2" style="font-size: 12px">{{item.itemNo.split('/')[0]}}</td>
            </tr>
            <tr>
              <td colspan="5">
              <span style="padding: 0 2px 0 2px;font-size: 18px;font-weight: 700"
                    :style="'color: '+ item.labelColors[items+7].col" v-for="(items,index) in 4" :key="index"
              >{{item.labelColors[items+7].num}}</span>
              </td>
              <td colspan="2" style="vertical-align: top;font-size: 12px">{{item.itemNo.split('/')[1]}}</td>
            </tr>-->
            <tr>
              <td colspan="5">MADE IN CHINA</td>
              <td colspan="2">{{item.batchNo}}</td>
            </tr>
          </table>
        </div>
      </div>
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
      <el-button type="primary" @click="saveData('form')">导出</el-button>
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
        {text: '对照', name: 'contrastId'},
        {text: '系列', name: 'seriesName'},
        {text: '品名', name: 'productName'},
        {text: '订单号', name: 'batchNo'},
        {text: '颜色', name: 'color'},
        {text: '三包期', name: 'deadline'},
        {text: '楦型', name: 'lastShape'},
        {text: '图片', name: 'productPhoto'},
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
        {text: 'cn30', name: 'cnThirty'}
      ],
      form: {},
      labelList: {},
      multipleSelection: [],
      disPl: true,
      rules: {},

    };
  },
  watch: {
    index(newName, oldName){
      if(newName != oldName && newName <= this.arr.length-1){
        setTimeout(_ => {
          this.setarr(this.arr);
        }, 0);
      }else {
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
    texte(url,qid) {
      setTimeout(_ => {
        this.createImgs();
      }, 100);
    },
    setarr(arr) {
      this.arr = arr;
      if(this.index > this.arr.length -1) {
        this.index = 0;
      }
      let index=this.index||0;
      loadingInstance = this.$Loading.service({
        lock: true,
        text: '二维码码批量下载中，请稍后...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      this.codeNumber = this.arr[index].codeNumber;
      this.arr[index].codeId ? (this.codeId = this.arr[index].codeId) : this.$Message.warn('获取信息失败，请刷新重试');
      this.codeValue = this.initCodeVal + '?codeId=' + this.arr[index].codeId + '&codeNumber=' + this.arr[index].codeNumber;
      this.random = Math.random();
    },
    createImgs() {
      var that = this;
      if(that.index <= that.arr.length -1 && that.codeId){
        let shareContent = that.$refs.QrcodePage,
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
        html2Canvas(shareContent, opts)
          .then(function(canvas) {
            const qrContentImage = canvas.toDataURL('image/jpeg', 1.0);
            if(that.index <= that.arr.length -1 && that.codeId){
              that.qrcodeArr.push({
                url: qrContentImage,
                name: that.arr[that.index].codeNumber
              });
            }
            if (that.codeId){
              that.index ++;
            }
            if (that.qrcodeArr.length == that.arr.length) {
              that.packageImages()
              that.codeId = null
            }
          })
          .catch(function(reason) {
            console.log(reason);
          });
      }
    },
    packageImages() {
      let that = this;
      const zip = new JSZip();
      const cache = {};
      setTimeout(_ => {
        let arr = that.qrcodeArr;
        arr.forEach((item,index)=>{
          let fileName = item.name;
          zip.file(fileName + '.png', item.url.substring(22),{base64: true})
          cache[fileName] = item.url
        })
        zip.generateAsync({type:"blob"}).then(content => {
          FileSaver.saveAs(content, "二维码.zip")
        })
      },0)
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
        // 判断必填项
        if (valid) {
          if (this.multipleSelection.length > 0) {
            createLabel(this.multipleSelection).then(res => {
              if (res.flag) {
                that.labelList = res.data
                /* this.$emit('hideDialog', false)
                 this.$emit('uploadList')*/
              }
            })
          } else {
            this.$message({
              type: 'info',
              message: '请选中行'
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
