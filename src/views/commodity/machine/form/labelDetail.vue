<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'规格'" >
            <el-table class="list-main" height="200px" :data="list" border size="mini" :highlight-current-row="true">
              <el-table-column prop="date" label="序号" type="index" align="center" sortable></el-table-column>
              <el-table-column prop="volume" label="数量" align="center">
                <template slot-scope="scope">
                  <el-input type="text" v-model="scope.row.createCount"/>
                </template>
              </el-table-column>
              <el-table-column prop="seriesName" label="系列" align="center" />
              <el-table-column prop="productName" label="品名" align="center" />
              <el-table-column prop="itemNo" label="款号" align="center" />
              <el-table-column prop="cnSize" label="尺码CN" align="center" />
              <el-table-column prop="eurSize" label="尺码EUR" align="center" />
              <el-table-column prop="usmSize" label="尺码US(M'S)" align="center" />
              <el-table-column prop="uswSize" label="尺码US(W'S)" align="center" />
              <el-table-column prop="color" label="颜色" align="center" />
            </el-table>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>

<script>
import {createLabel} from '@/api/commodity/index'
export default {
  props: {
    listInfo: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      columns: [
        { text: '系列', name: 'seriesName' },
        { text: '品名', name: 'productName' },
        { text: '款号', name: 'itemNo' },
        { text: '尺码CN', name: 'cnSize' },
        { text: '尺码EUR', name: 'eurSize' },
        { text: '尺码US(M\'S)', name: 'usmSize' },
        { text: '尺码US(W\'S)', name: 'uswSize' },
        { text: '颜色', name: 'color' }
      ],
      list: [],
      form: {
      },
      limit: 1,
      disPl: true,
      rules: {
      }
    }
  },
  mounted() {
    console.log(this.listInfo)
    if (this.listInfo.length > 0) {
      this.list = this.listInfo
    }
  },
  methods: {
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          createLabel(this.list).then(res => {
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
