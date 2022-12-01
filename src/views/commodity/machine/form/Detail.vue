<!--
<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'系列'" prop="select">
            <el-cascader
              placeholder="请选择"
              v-model="form.select"
              :options="goodsList"
              :props="{ value:'id',label:'seriesName' }"
              clearable></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'品名'" prop="seriesName">
            <el-input v-model="form.seriesName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center;">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>

<script>import {addCommodity, specificationForm} from '@/api/commodity/index'

export default {
  props: {
    listInfo: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      form: {
        level: '1',
        seriesName: null,
        parentId: 0,
        select: []
      },
      goodsList: [
      ],
      rules: {
        seriesName: [
          {required: true, message: '请输入', trigger: 'blur'}
        ],
        select: [
          {required: true, message: '请选择', trigger: 'change'}
        ],
      }
    }
  },
  mounted() {
    this.formatList()
    if (this.listInfo) {
      this.form = this.listInfo
      console.log(this.form)
      this.form.select = this.listInfo.parentIdList.split(',')
      this.form.select = this.form.select.map(item => {
        return +item
      })
    }
  },
  methods: {
    formatList() {
      specificationForm({id: 1}).then(res => {
        if (res.flag) {
          this.goodsList = res.data
        }
      })
    },
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          this.form.parentId = this.form.select[this.form.select.length-1]
          this.form.parentIdList = this.form.select.join(',')
          addCommodity(this.form).then(res => {
            this.$emit('hideDialog', false)
            this.$emit('uploadList')
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
-->
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
    </el-form>
    <div slot="footer" style="text-align:center;">
      <el-button type="primary" @click="submitUpload('form')">保存</el-button>
    </div>
  </div>
</template>

<script>
import {
  getToken
} from '@/utils/auth'
import {getCompanyList} from '@/api/basic/index'
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
        this.$emit('hideDialog', false)
        this.$emit('uploadList')
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
