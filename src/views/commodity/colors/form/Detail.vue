<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <!--<el-form-item :label="'所属上级'" prop="parentId">
            <el-select v-model="form.parentId" placeholder="请选择">
              <el-option
                v-for="(item, index) in goodsList"
                :key="index"
                :label="item.seriesName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>-->
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
          <el-form-item :label="'颜色'" prop="color">
            <el-input v-model="form.color"></el-input>
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
        type: 2,
        color: null,
        parentId: 0,
        select: []
      },
      goodsList: [{
        id: 0,
        seriesName: '产品',
        children: []
      }
      ],
      rules: {
        color: [
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
