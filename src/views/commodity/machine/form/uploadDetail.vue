<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'图片信息'">
            <div style="min-height: 28px">
              <el-upload
                class="upload-demo"
                accept=".7z,.zip,.rar,.bz"
                :action="fileUrl"
                :headers="headers"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-success="handleAvatarSuccess"
                :on-error="uploadError"
                :before-remove="beforeRemove"
                multiple
                name="imgS"
                :data="fileData"
                :limit="1"
                ref="upload"
                :on-change="handleUpload"
                :on-exceed="handleExceed"
                :file-list="fileList">
                <el-button>上传</el-button>
              </el-upload>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>import {
  getToken
} from '@/utils/auth'

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
      fileUrl: '',
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
    this.fileUrl = `${window.location.origin}/shoes/file/imgUpload`
    if (this.listInfo) {
      this.form = this.listInfo
    }
  },
  methods: {
    changeCompany(val) {
      this.companyList.forEach((item, index) => {
        if (val == item.companyName) {
          this.form.officialWebsite = item.officialWebsite
          this.form.telephone = item.telephone
        }
      })
    },
    handleUpload(file, fileList) {
      if (file.status == 'ready') {
        this.isUpload = true
      }
    },
    uploadError(res) {
      this.$message({
        message: '导入失败',
        type: 'warning'
      });
      this.fullscreenLoading = false
    },
    handleAvatarSuccess(res, file) {
      if (res.flag) {
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
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  }
}
</script>

<style>
</style>
