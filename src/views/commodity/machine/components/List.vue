<template>
  <div>
    <list
      class="list-main box-shadow"
      :columns="columns"
      :loading="loading"
      :list="list"
      index
      type
      @handle-size="handleSize"
      @handle-current="handleCurrent"
      @row-click="rowClick"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getTemporaryLabelList, deleteTemporaryLabel } from '@/api/commodity/index'
import List from '@/components/List'

export default {
  components: {
    List
  },
  computed: {
    ...mapGetters(['node'])
  },
  data() {
    return {
      loading: false,
      visible: false,
      list: {},
      fid: null,
      type: null,
      columns: [
        { text: '系列', name: 'seriesName' },
        { text: '品名', name: 'productName' },
        { text: '款号', name: 'itemNo' },
        { text: '尺码CN', name: 'cnSize' },
        { text: '尺码EUR', name: 'eurSize' },
        { text: '尺码US(M\'S)', name: 'usmSize' },
        { text: '尺码US(W\'S)', name: 'uswSize' },
        { text: '颜色', name: 'color' },
        { text: '制令号', name: 'batchNo' },
        { text: '三包期', name: 'warrantyTime' },
        { text: '楦型', name: 'lastShape' },
        { text: '公司', name: 'telephone' },
        { text: '电话', name: 'seriesName' },
        { text: '网址', name: 'officialWebsite' },
        { text: '图片', name: 'productPhoto', default: 'image'}
      ]
    }
  },
  methods: {
    ExportData() {
      import('@/vendor/Export2Excel').then(excel => {
        // 表格的表头列表
        const columns = this.columns
        const tHeader = []
        // 与表头相对应的数据里边的字段
        const filterVal = []
        columns.forEach((item, index) => {
          tHeader.push(item.text)
          filterVal.push(item.name)
        })
        const list = this.list.records
        const data = this.formatJson(filterVal, list);
        // 这里还是使用export_json_to_excel方法比较好，方便操作数据
        excel.exportJsonToExcel({
          header: tHeader,
          data: data,
          filename: '报表',
          autoWidth: true,
          bookType: 'xlsx'})
      })
    },
    formatJson(filter, jsonDate){
      return jsonDate.map(v =>
        filter.map(j => {
          return v[j]
        })
      )
    },
    // 监听每页显示几条
    handleSize(val) {
      this.list.size = val
      this.$emit('uploadList')
    },
    // 监听当前页
    handleCurrent(val) {
      this.list.current = val
      this.$emit('uploadList')
    },
    Delivery(val) {
      deleteTemporaryLabel(val).then(res => {
        if(res.flag) {
          this.$store.dispatch('list/setClickData', '');
          this.$emit('uploadList')
        }
      });
    },
    uploadPr(val) {
      this.fetchData(val, {
        pageNum: 1,
        pageSize: this.list.size || 50
      })
    },
    dblclick(obj) {
      this.$emit('showDialog', obj.row)
    },
    // 监听单击某一行
    rowClick(obj) {
      this.$store.dispatch('list/setClickData', obj.row)
    },
    fetchData(val, data = {
      pageNum: this.list.current || 1,
      pageSize: this.list.size || 50
    }) {
      this.loading = true
      getTemporaryLabelList(data, val).then(res => {
        this.loading = false
        this.list = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.list-main {
  height: calc(100vh - 250px);
}
</style>
