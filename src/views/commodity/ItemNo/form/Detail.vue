<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'商品'" prop="select">
            <el-cascader
              placeholder="请选择"
              v-model="form.select"
              :options="goodsList"
              :props="{ value:'id',label:'seriesName' }"
              clearable></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'款号'" prop="seriesName">
            <el-input v-model="form.seriesName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'尺码'" prop="size">
            <el-select
              v-model="form.size"
              filterable
              multiple
              @change="changeSpecs"
              placeholder="请输入关键词"
              class="width-full">
              <el-option :label="t.cn" :value="t.id" v-for="(t,i) in sizeFormat"
                         :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'颜色'" prop="color">
            <el-select
              v-model="form.color"
              filterable
              multiple
              @change="changeSpecs"
              placeholder="请输入关键词"
              class="width-full">
              <el-option :label="t.color" :value="t.id" v-for="(t,i) in colorFormat"
                         :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item :label="'规格'" >
          <el-table class="list-main" height="200px" :data="list" border size="mini" :highlight-current-row="true">
            <el-table-column prop="date" label="序号" type="index" align="center" sortable></el-table-column>
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
        </el-form-item>
      </el-col>
    </el-row>
    </el-form>
    <div slot="footer" style="text-align:center;">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>

<script>import {addCommodity, specificationForm, getSizeColorList} from '@/api/commodity/index'

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
        select: [],
        size: [],
        color: []
      },
      columns: [
        { text: '尺码', name: 'size' },
        { text: '颜色', name: 'color' }
      ],
      list: [],
      sizeFormat: [],
      colorFormat: [],
      goodsList: [
      ],
      rules: {
        seriesName: [
          {required: true, message: '请输入', trigger: 'blur'}
        ],
        select: [
          {required: true, message: '请选择', trigger: 'change'}
        ],color: [
          {required: true, message: '请选择', trigger: 'change'}
        ],size: [
          {required: true, message: '请选择', trigger: 'change'}
        ]
      }
    }
  },
  mounted() {
    this.formatList()
    this.fetchFormat1({type: 1})
    this.fetchFormat2({type: 2})
    if (this.listInfo) {
      this.form = this.listInfo
      this.form.select = this.listInfo.parentIdList.split(',')
      this.form.select = this.form.select.map(item => {
        return +item
      })
    }
  },
  methods: {
    changeSpecs(){
      if(this.form.size.length>0 && this.form.color.length>0){
        let array = []
        let sizeArr = []
        let colorArr = []
        this.sizeFormat.forEach((item)=>{
          this.form.size.forEach((size)=>{
            if(item.id == size){
              sizeArr.push(item)
            }
          })
        })
        this.colorFormat.forEach((item)=>{
          this.form.color.forEach((color)=>{
            if(item.id == color){
              colorArr.push(item)
            }
          })
        })
        colorArr.forEach((color)=>{
          sizeArr.forEach((size)=>{
            let obj = {}
            obj.sizeId = size.id
            obj.colorId = color.id
            obj.size = size.cn
            obj.color = color.color
            array.push(obj)
          })
        })
        this.list = array
      }
    },

    formatList() {
      specificationForm({id: 2}).then(res => {
        if (res.flag) {
          this.goodsList= res.data
        }
      })
    },
    fetchFormat1(val) {
      const data = {
        pageNum: 1,
        pageSize: 1000
      };
      getSizeColorList(data, val).then(res => {
        if (res.flag) {
          this.loading = false;
          this.sizeFormat = res.data.records
        }
      });
    },
    fetchFormat2(val) {
      const data = {
        pageNum: 1,
        pageSize: 1000
      };
      getSizeColorList(data, val).then(res => {
        if (res.flag) {
          this.loading = false;
          this.colorFormat = res.data.records
        }
      });
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
