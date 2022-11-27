<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="110px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'产品'" prop="select">
            <el-cascader
              placeholder="请选择"
              v-model="form.select"
              :options="goodsList"
              :props="{ checkStrictly: true,value:'id',label:'seriesName' }"
              clearable></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'中码'" prop="cn">
            <el-input v-model="form.cn"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'欧码'" prop="eur">
            <el-input v-model="form.eur"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'美码（男）'" prop="usm">
            <el-input v-model="form.usm"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'美码（女）'" prop="usw">
          <el-input v-model="form.usw"></el-input>
        </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center;">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>

<script>import {createSizeColor, specificationForm} from '@/api/commodity/index'

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
        type: 1,
        cn: null,
        eur: null,
        usm: null,
        usw: null,
        select: []
      },
      goodsList: [{
        id: 0,
        seriesName: '产品',
        children: []
      }
      ],
      rules: {
        cn: [
          {required: true, message: '请输入', trigger: 'blur'}
        ],eur: [
          {required: true, message: '请输入', trigger: 'blur'}
        ],usm: [
          {required: true, message: '请输入', trigger: 'blur'}
        ],usw: [
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
      specificationForm({id: null}).then(res => {
        if (res.flag) {
          this.goodsList[0].children = res.data
        }
      })
    },
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          this.form.parentId = this.form.select[this.form.select.length-1]
          this.form.parentIdList = this.form.select.join(',')
          createSizeColor(this.form).then(res => {
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
