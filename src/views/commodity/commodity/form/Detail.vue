<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'模板信息'" >
            <div style="min-height: 28px">
              <el-upload
                class="upload-demo"
                accept=".doc,.docx,.pdf,.xls,.xlsx"
                :action="fileUrl"
                :headers="headers"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-success="handleAvatarSuccess"
                :on-error="uploadError"
                :before-remove="beforeRemove"
                multiple
                name="temporaryLabel"
                :data="fileData"
                :limit="1"
                ref="upload"
                :auto-upload="false"
                :on-change="handleUpload"
                :on-exceed="handleExceed"
                :file-list="fileList">
                <el-button>上传</el-button>
              </el-upload>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'公司名称'" prop="companyName">
            <el-select style="width: 100%" v-model="form.companyName" @change="changeCompany" placeholder="请选择">
              <el-option
                v-for="(item, index) in companyList"
                :key="index"
                :label="item.companyName"
                :value="item.companyName">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'官网'">
            <el-input v-model="form.officialWebsite" readOnly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'电话'" >
            <el-input v-model="form.telephone" readOnly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-table
            class="list-main"
            height="200px"
            :data="list"
            border
            size="mini"
            :highlight-current-row="true">
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
      <el-button type="primary" @click="submitUpload('form')">上传</el-button>
      <el-button type="primary" @click="saveData('form')">导入</el-button>
    </div>
  </div>
</template>

<script>
import {
  getToken
} from '@/utils/auth'
import { getCompanyList, inputTemporaryLabel } from '@/api/basic/index'
export default {
  props: {
    listInfo: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      fileData: {},
      headers: {
        'authorization': getToken('jprx'),
      },
      fullscreenLoading: false,
      isUpload: null,
      companyList: [],
      fileUrl: this.$store.state.user.url + '/shoes/temporaryLabel/inputTemporaryLabel',
      visible: null,
      form: {
        companyName: null,
        officialWebsite: null,
        telephone: null
      },
      list: [],
      columns: [
        { text: '对照', name: 'contrastId' },
        { text: '系列', name: 'seriesName' },
        { text: '品名', name: 'productName' },
        { text: '订单号', name: 'batchNo' },
        { text: '颜色', name: 'color' },
        { text: '三包期', name: 'deadline' },
        { text: '楦型', name: 'lastShape' },
        { text: '图片', name: 'productPhoto' },
        { text: 'cn1', name: 'cnOne' },
        { text: 'cn2', name: 'cnTwo' },
        { text: 'cn3', name: 'cnThree' },
        { text: 'cn4', name: 'cnFour' },
        { text: 'cn5', name: 'cnFive' },
        { text: 'cn6', name: 'cnSix' },
        { text: 'cn7', name: 'cnSeven' },
        { text: 'cn8', name: 'cnEight' },
        { text: 'cn9', name: 'cnNine' },
        { text: 'cn10', name: 'cnTen' },
        { text: 'cn11', name: 'cnEleven' },
        { text: 'cn12', name: 'cnTwelve' },
        { text: 'cn13', name: 'cnThirteen' },
        { text: 'cn14', name: 'cnFourteen' },
        { text: 'cn15', name: 'cnFifteen' },
        { text: 'cn16', name: 'cnSixteen' },
        { text: 'cn17', name: 'cnSeventeen' },
        { text: 'cn18', name: 'cnEight' },
        { text: 'cn19', name: 'cnNine' },
        { text: 'cn20', name: 'cnTwenty' },
        { text: 'cn21', name: 'cnTwentyOne' },
        { text: 'cn22', name: 'cnTwentyTwo' },
        { text: 'cn23', name: 'cnTwentyThree' },
        { text: 'cn24', name: 'cnTwentyFour' },
        { text: 'cn25', name: 'cnTwentyFive' },
        { text: 'cn26', name: 'cnTwentySix' },
        { text: 'cn27', name: 'cnTwentySeven' },
        { text: 'cn28', name: 'cnTwentyEight' },
        { text: 'cn29', name: 'cnTwentyNine' },
        { text: 'cn30', name: 'cnThirty' }
      ],
      fileList: [],
      disPl: true,
      rules: {
        companyName: [
          {required: true, message: '请选择', trigger: 'change'}
        ]
      },
    };
  },
  mounted() {
    this.formatList()
    if (this.listInfo) {
      this.form = this.listInfo
    }
  },
  methods: {
    changeCompany(val){
      this.companyList.forEach((item,index)=>{
        if(val == item.companyName){
          this.form.officialWebsite = item.officialWebsite
          this.form.telephone = item.telephone
        }
      })
    },
    handleUpload(file, fileList) {
      if (file.status=='ready') {
        this.isUpload = true
      }
    },
    formatList() {
      const data = {
        pageNum: 1,
        pageSize: 1000
      };
      getCompanyList(data, {}).then(res => {
        if (res.flag) {
          this.companyList = res.data.records
        }
      })
    },
    submitUpload(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          this.fileData.company = `{"companyName": "${this.form.companyName}","officialWebsite": "${this.form.officialWebsite}","telephone": "${this.form.telephone}"}`
          if(this.isUpload){
            this.fullscreenLoading = true
            this.$refs.upload.submit()
          } else {
            this.$message({
              message: '请选择文件',
              type: 'warning'
            });
          }
        } else {
          return false
        }
      })
    },
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          inputTemporaryLabel(this.list).then(res => {
            this.$emit('hideDialog', false)
            this.$emit('uploadList')
          })
        } else {
          return false
        }
      })
    },
    uploadError(res) {
      this.$message({
        message: '导入失败',
        type: 'warning'
      });
      this.fullscreenLoading = false
    },
    handleAvatarSuccess(res, file) {
      if(res.flag) {
        this.$message({
          message: res.msg,
          type: 'success'
        });
        this.fullscreenLoading = false
       /* this.$emit('hideDialog', false)
        this.$emit('uploadList')*/
      } else {
        this.$message({
          message: res.msg,
          type: 'warning'
        });
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    }
  }
}
</script>

<style>
</style>
