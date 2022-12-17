<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'80px'">
      <el-button-group style="float:right">
        <el-button v-for="(t,i) in btnList" :key="i" v-if="t.category == 'default'" :size="'mini'" type="primary"
                   :icon="t.cuicon" @click="onFun(t.path)">{{t.menuName}}
        </el-button>
        <el-button :size="'mini'" type="primary" icon="el-icon-refresh" @click="upload">刷新</el-button>
      </el-button-group>
    </el-form>
  </div>
</template>

<script>import { mapGetters } from 'vuex'
import { getByUserAndPrId } from '@/api/system/index'

export default {
  components: {
  },
  data() {
    return {
      btnList: [],
      search: {
        name: '',
      }
    }
  },
  computed: {
    ...mapGetters(['node', 'clickData', 'selections'])
  },
  mounted() {
    this.fileUrl = `${window.location.origin}/shoes/inputData/input`
    let path = this.$route.meta.id
    getByUserAndPrId(path).then(res => {
      this.btnList = res.data
      this.$forceUpdate()
    })
  },
  methods: {
    // 导出
    exportData() {
      this.$emit('exportData')
    },
    // 查询条件过滤
    qFilter() {
      let obj = {}
      this.search.name != null && this.search.name != '' ? obj.productName = this.search.name : null
      return obj
    },
    onFun(method, event) {
      this[method](event)
    },
    handlerAdd() {
      this.$emit('showDialog')
    },
    handlerUploadAdd() {
      this.$emit('showImageDialog')
    },
    upload() {
      this.search.name = ''
      this.$emit('uploadList')
    },
    del() {
      /*if (this.selections.length > 0) {
        this.$confirm('是否删除，删除后将无法恢复?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var idArray = []
          this.selections.forEach((item) => {
            idArray.push({excelName: item.excelName})
          })
          this.$emit('del', idArray)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      } else {
        this.$message({
          message: '无选中行',
          type: 'warning'
        })
      }*/
      if (this.clickData.excelName) {
        this.$confirm('是否删除（' + this.clickData.excelName + '），删除后将无法恢复?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('del', {
            excelName: this.clickData.excelName
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      } else {
        this.$message({
          message: '无选中行',
          type: 'warning'
        })
      }
    },
    handlerAlter() {
      if (this.clickData.excelName) {
        this.$emit('showUploadDialog', this.clickData)
      } else {
        this.$message({
          message: '无选中行',
          type: 'warning'
        })
      }
    },
  }
}
</script>

<style>
  @media print {
    @page {
      size: auto;
      margin: 3mm;
    }
  }

  .scanImg {
    height: 23mm;
    width: 23mm;
    margin-left: 4.3mm;
  }

  .printClass {
    width: 0;
    height: 0;
    overflow: hidden;
  }

  .rowClass {
    heihgt: 30mm;
    width: 40mm;
  }

  .rowClass .pageWarp {
    width: 40mm;
    /*float: left;*/
    page-break-after: always;
    padding-left: 0.3mm;
  }

  .rowClass .pageWarp:nth-child(even) {
    /* padding-left: 8mm;  page-break-after: always;*/
  }

  .rowClass .myPrint {
    -webkit-print-color-adjust: exact;
  }

  .upload-demo {
    float: right;
  }
</style>
