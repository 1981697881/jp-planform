<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'文件名称'">
            <el-input v-model="form.officialWebsite" readOnly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'导入人'">
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
      <el-button type="primary" @click="saveData('form')">确认</el-button>
    </div>
  </div>
</template>

<script>import { temporaryLabels, temporaryLabelsConfirm } from '@/api/basic/index'
export default {
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
      form: {
        companyName: null,
        officialWebsite: null,
        telephone: null
      },
      disPl: true,
      rules: {
        companyName: [
          {required: true, message: '请选择', trigger: 'change'}
        ]
      },
    };
  },
  mounted() {
    if (this.listInfo) {
      this.form = this.listInfo
      this.formatList({excelName: this.listInfo.excelName})
    }
  },
  methods: {
    formatList(val) {
      temporaryLabels(val).then(res => {
        if (res.flag) {
          this.list = res.data
        }
      })
    },
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          temporaryLabelsConfirm(this.list).then(res => {
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

<style>
</style>
