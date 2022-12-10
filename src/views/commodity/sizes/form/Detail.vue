<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="110px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'对照号'" prop="cn">
            <el-input v-model="form.cn"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'备注'" prop="eur">
            <el-input v-model="form.eur"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'规格'" >
            <el-table class="list-main" height="200px" :data="list" border size="mini" :highlight-current-row="true">
              <el-table-column prop="date" label="序号" type="index" align="center" sortable></el-table-column>
              <el-table-column prop="cnSize" label="尺码CN" align="center" ><template slot-scope="scope">
                <el-input type="text" v-model="scope.row.cnSize"/>
              </template></el-table-column>
              <el-table-column prop="eurSize" label="尺码EUR" align="center" ><template slot-scope="scope">
                <el-input type="text" v-model="scope.row.eurSize"/>
              </template></el-table-column>
              <el-table-column prop="usmSize" label="尺码US(M'S)" align="center" ><template slot-scope="scope">
                <el-input type="text" v-model="scope.row.usmSize"/>
              </template></el-table-column>
              <el-table-column prop="uswSize" label="尺码US(W'S)" align="center" ><template slot-scope="scope">
                <el-input type="text" v-model="scope.row.uswSize"/>
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
      columns: [
        { text: '尺码CN', name: 'cnSize' },
        { text: '尺码EUR', name: 'eurSize' },
        { text: '尺码US(M\'S)', name: 'usmSize' },
        { text: '尺码US(W\'S)', name: 'uswSize' },
      ],
      list: [
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
      ],
      goodsList: [
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
       /* select: [
          {required: true, message: '请选择', trigger: 'change'}
        ],*/
      }
    }
  },
  mounted() {
   /* this.formatList()*/
    if (this.listInfo) {
      this.form = this.listInfo
     /* this.form.select = this.listInfo.parentIdList.split(',')
      this.form.select = this.form.select.map(item => {
        return +item
      })*/
    }
  },
  methods: {
    formatList() {
      specificationForm({id: null}).then(res => {
        if (res.flag) {
          this.goodsList= res.data
        }
      })
    },
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
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
