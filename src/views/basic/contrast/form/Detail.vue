<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="110px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'对照号'" prop="contrastId">
            <el-input v-model="form.contrastId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'备注'">
            <el-input v-model="form.remark"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'规格'" >
            <el-table class="list-main" height="200px" :data="form.contrastSizeDetailList" border size="mini" :highlight-current-row="true">
              <el-table-column prop="sizeName" label="序号" align="center"></el-table-column>
              <el-table-column prop="cn" label="尺码CN" align="center" ><template slot-scope="scope">
                <el-input type="text" v-model="scope.row.cn"/>
              </template></el-table-column>
              <el-table-column prop="eur" label="尺码EUR" align="center" ><template slot-scope="scope">
                <el-input type="text" v-model="scope.row.eur"/>
              </template></el-table-column>
              <el-table-column prop="usm" label="尺码US(M'S)" align="center" ><template slot-scope="scope">
                <el-input type="text" v-model="scope.row.usm"/>
              </template></el-table-column>
              <el-table-column prop="usw" label="尺码US(W'S)" align="center" ><template slot-scope="scope">
                <el-input type="text" v-model="scope.row.usw"/>
              </template></el-table-column>
            </el-table>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center;">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>

<script>import {addContrastSize} from '@/api/basic/index'

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
        contrastId: '',
        remark: null,
        contrastSizeDetailList: [
          { no: 1, sizeName: 'cn1', cn: 0, eur: 0, usm: 0, usw: 0, contrastId: null },
          { no: 2, sizeName: 'cn2', cn: 0, eur: 0, usm: 0, usw: 0, contrastId: null },
          { no: 3, sizeName: 'cn3', cn: 0, eur: 0, usm: 0, usw: 0, contrastId: null },
          { no: 4, sizeName: 'cn4', cn: 0, eur: 0, usm: 0, usw: 0, contrastId: null },
          { no: 5, sizeName: 'cn5', cn: 0, eur: 0, usm: 0, usw: 0, contrastId: null },
          { no: 6, sizeName: 'cn6', cn: 0, eur: 0, usm: 0, usw: 0, contrastId: null },
          { no: 7, sizeName: 'cn7', cn: 0, eur: 0, usm: 0, usw: 0, contrastId: null },
          { no: 8, sizeName: 'cn8', cn: 0, eur: 0, usm: 0, usw: 0, contrastId: null },
          { no: 9, sizeName: 'cn9', cn: 0, eur: 0, usm: 0, usw: 0, contrastId: null },
          { no: 10, sizeName: 'cn10', cn: 0, eur: 0, usm: 0, usw: 0, contrastId: null },
          { no: 11, sizeName: 'cn11', cn: 0, eur: 0, usm: 0, usw: 0, contrastId: null },
          { no: 12, sizeName: 'cn12', cn: 0, eur: 0, usm: 0, usw: 0, contrastId: null },
          { no: 13, sizeName: 'cn13', cn: 0, eur: 0, usm: 0, usw: 0, contrastId: null },
          { no: 14, sizeName: 'cn14', cn: 0, eur: 0, usm: 0, usw: 0, contrastId: null },
          { no: 15, sizeName: 'cn15', cn: 0, eur: 0, usm: 0, usw: 0, contrastId: null },
          { no: 16, sizeName: 'cn16', cn: 0, eur: 0, usm: 0, usw: 0, contrastId: null },
          { no: 17, sizeName: 'cn17', cn: 0, eur: 0, usm: 0, usw: 0, contrastId: null },
          { no: 18, sizeName: 'cn18', cn: 0, eur: 0, usm: 0, usw: 0, contrastId: null },
          { no: 19, sizeName: 'cn19', cn: 0, eur: 0, usm: 0, usw: 0, contrastId: null },
          { no: 20, sizeName: 'cn20', cn: 0, eur: 0, usm: 0, usw: 0, contrastId: null },
          { no: 21, sizeName: 'cn21', cn: 0, eur: 0, usm: 0, usw: 0, contrastId: null },
          { no: 22, sizeName: 'cn22', cn: 0, eur: 0, usm: 0, usw: 0, contrastId: null },
          { no: 23, sizeName: 'cn23', cn: 0, eur: 0, usm: 0, usw: 0, contrastId: null },
          { no: 24, sizeName: 'cn24', cn: 0, eur: 0, usm: 0, usw: 0, contrastId: null },
          { no: 25, sizeName: 'cn25', cn: 0, eur: 0, usm: 0, usw: 0, contrastId: null },
          { no: 26, sizeName: 'cn26', cn: 0, eur: 0, usm: 0, usw: 0, contrastId: null },
          { no: 27, sizeName: 'cn27', cn: 0, eur: 0, usm: 0, usw: 0, contrastId: null },
          { no: 28, sizeName: 'cn28', cn: 0, eur: 0, usm: 0, usw: 0, contrastId: null },
          { no: 29, sizeName: 'cn29', cn: 0, eur: 0, usm: 0, usw: 0, contrastId: null },
          { no: 30, sizeName: 'cn30', cn: 0, eur: 0, usm: 0, usw: 0, contrastId: null }
        ]
      },
      columns: [
        { text: '尺码CN', name: 'cn' },
        { text: '尺码EUR', name: 'eur' },
        { text: '尺码US(M\'S)', name: 'usm' },
        { text: '尺码US(W\'S)', name: 'usw' },
      ],
      rules: {
        contrastId: [
          {required: true, message: '请输入', trigger: 'blur'}
        ]
      }
    }
  },
  mounted() {
    if (this.listInfo) {
      this.form = this.listInfo
    }
  },
  watch: {
    'form.contrastId': {
      handler(newVal, oldVal) {
        this.form.contrastSizeDetailList.forEach((item)=>{
          item.contrastId = newVal
        });
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          addContrastSize(this.form).then(res => {
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
