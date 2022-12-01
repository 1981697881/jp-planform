<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'公司名称'">
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
        <el-col :span="12">
          <el-form-item :label="'官网'">
            <el-input v-model="form.officialWebsite" readOnly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'电话'" >
            <el-input v-model="form.telephone" readOnly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'颜色'" prop="color">
            <el-input v-model="form.color"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'产品'" prop="select">
            <el-cascader
              style="width: 100%"
              placeholder="请选择"
              v-model="form.select"
              :options="goodsList"
              :props="{value:'seriesName',label:'seriesName' }"
              clearable></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'批号'" prop="batchNo">
            <el-input v-model="form.batchNo"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!--<el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'规格'" >
            <el-table class="list-main" height="200px" :data="list" border size="mini" :highlight-current-row="true">
              <el-table-column prop="date" label="序号" type="index" align="center" sortable></el-table-column>
              <el-table-column prop="integral" label="尺码" align="size" />
              <el-table-column prop="integral" label="颜色" align="color" />
              <el-table-column prop="volume" label="数量" align="center">
                <template slot-scope="scope">
                  <el-input type="text" v-model="scope.row.createCount"/>
                </template>
              </el-table-column>
              <el-table-column prop="imageArr" label="图片" align="center">
                <template slot-scope="scope">
                  <el-upload
                    :action="fileUrl"
                    list-type="picture-card"
                    accept="image/jpeg,image/jpg,image/png,image/gif"
                    :headers="headers"
                    :limit="1"
                    name="imgS"
                    :on-success="uploadSuccess"
                    :on-error="uploadError"
                    :class="{hide:hideUpload}"
                    :on-preview="handlePictureCardPreview"
                    :on-change="handleChange"
                    :file-list="fileList"
                    :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible" append-to-body size="tiny">
                    <img width="100%" :src="dialogImageUrl" alt="">
                  </el-dialog>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-col>
      </el-row>-->
    </el-form>
    <div slot="footer" style="text-align:center">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>

<script>import {deleteImg, getCompanyList} from '@/api/basic/index'
import {createLabel,specificationForm} from '@/api/commodity/index'
import {
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
      fileList: [],
      goodsList: [],
      companyList: [],
      headers: {
        'authorization': getToken('jprx'),
      },
      columns: [
        { text: '尺码', name: 'size' },
        { text: '颜色', name: 'color' },
        { text: '数量', name: 'createCount' },
        { text: '图片', name: 'productPhoto' }
      ],
      list: [{}],
      options: [{
        value: '215',
        label: '215'
      }, {
        value: '220',
        label: '220'
      }, {
        value: '225',
        label: '225'
      }, {
        value: '230',
        label: '230'
      }, {
        value: '235',
        label: '235'
      }, {
        value: '240',
        label: '240'
      }, {
        value: '245',
        label: '245'
      }, {
        value: '250',
        label: '250'
      }, {
        value: '255',
        label: '255'
      }, {
        value: '260',
        label: '260'
      }, {
        value: '265',
        label: '265'
      }, {
        value: '270',
        label: '270'
      }, {
        value: '275',
        label: '275'
      }, {
        value: '280',
        label: '280'
      }, {
        value: '285',
        label: '285'
      }, {
        value: '290',
        label: '290'
      }, {
        value: '295',
        label: '295'
      }],
      dialogImageUrl: '',
      dialogVisible: false,
      fileUrl: '',
      hideUpload: false,
      form: {
        companyName: null,
        createCount: null,
        telephone: null,
        deadline: null,
        officialWebsite: null,
        cnSize: null,
        color: null,
        productPhoto: null,
        batchNo: null,
        select: []
      },
      limit: 1,
      disPl: true,
      rules: {
        deadline: [
          {required: true, message: '请输入', trigger: 'blur'}
        ],batchNo: [
          {required: true, message: '请输入', trigger: 'blur'}
        ],
        cnSize: [
          {required: true, message: '请选择', trigger: 'change'}
        ],
        color: [
          {required: true, message: '请输入', trigger: 'blur'}
        ],
        select: [
          {required: true, message: '请选择', trigger: 'change'}
        ]
      }
    }
  },
  mounted() {
    this.fileUrl = `${window.location.origin}/shoes/file/imgUpload`
    this.formatList()
    this.formatGoodList()
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
    formatGoodList() {
      specificationForm({id: 3}).then(res => {
        if (res.flag) {
          this.goodsList = res.data
        }
      })
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
    handleRemove(file, fileList) {
      let array = this.fileList
      let img = file.url
      deleteImg({img: file.url}).then(res => {
        if (res.flag) {
          array.forEach((item, index) => {
            if (item.url == img) {
              array.splice(index, 1)
            }
          })
          this.form.productPhoto = null
          this.hideUpload = false
        }
      })
    },
    handleChange(file, fileList) {
      this.hideUpload = fileList.length >= this.limit
    },
    // 上传失败事件
    uploadError(res) {
      this.$message({
        message: res.msg,
        type: 'warning'
      });
      this.$emit('uploadList')
    },
    uploadSuccess(res, file, fileList) {
      file.name = res.data;
      this.$message({
        message: res.msg,
        type: 'success'
      });
      this.form.productPhoto = res.data
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          this.form.seriesName = this.form.select[0]
          this.form.productName = this.form.select[1]
          this.form.itemNo = this.form.select[2]
          createLabel(this.form).then(res => {
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

<style lang="scss">
  .hide .el-upload--picture-card {
    display: none;
  }
</style>
