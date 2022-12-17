<template>
  <div class="app-list">
    <div class="list-containerOther">
      <div>
        <tabs-bar ref="tabs" @showDialog="handlerDialog" @showImageDialog="handlerImageDialog" @showUploadDialog="handlerUploadDialog" @exportData="exportData" @del="delivery" @queryBtn="query" @uploadList="upload"/>
      </div>
      <list ref="list" @uploadList="uploadPage" @showDialog="handlerDialog"/>
    </div>
    <el-dialog
      :visible.sync="visible"
      title="商品上传"
      v-if="visible"
      v-dialogDrag
      :width="'40%'"
      destroy-on-close
    >
      <info @hideDialog="hideWindow" @uploadList="upload" :listInfo="listInfo"></info>
    </el-dialog>
    <el-dialog
      :visible.sync="visible2"
      title="订单确认"
      v-if="visible2"
      v-dialogDrag
      :width="'70%'"
      destroy-on-close
    >
      <upload-info @hideDialog="hideWindow" @uploadList="upload" :listInfo="listInfo"></upload-info>
    </el-dialog>
    <el-dialog
      :visible.sync="visible3"
      title="图片上传"
      v-if="visible3"
      v-dialogDrag
      :width="'40%'"
      destroy-on-close
    >
      <image-info @hideDialog="hideWindow" @uploadList="upload" :listInfo="listInfo"></image-info>
    </el-dialog>
  </div>
</template>

<script>import { TabsBar, List } from './components'
import { Info, UploadInfo, imageInfo } from './form'

export default {
  components: {
    TabsBar,
    List,
    UploadInfo,
    imageInfo,
    Info
  },
  data() {
    return {
      visible: null,
      visible2: null,
      visible3: null,
      rid: null,
      listInfo: null,
      floorId: null
    }
  },
  mounted() {
    this.$refs.list.fetchData(this.$refs.tabs.qFilter())
  },
  methods: {
    exportData() {
      this.$refs.list.ExportData()
    },
    delivery(obj) {
      if (obj) {
        this.$refs.list.Delivery(obj)
      }
    },
    hideWindow(val) {
      this.visible = val
      this.visible2 = val
      this.visible3 = val
    },
    handlerUploadDialog(obj) {
      this.listInfo = null
      if (obj) {
        const info = JSON.parse(JSON.stringify(obj))
        this.listInfo = info
      }
      this.visible2 = true
    },
    handlerImageDialog(obj) {
      this.listInfo = null
      if (obj) {
        const info = JSON.parse(JSON.stringify(obj))
        this.listInfo = info
      }
      this.visible3 = true
    },
    handlerDialog(obj) {
      this.listInfo = null
      if (obj) {
        const info = JSON.parse(JSON.stringify(obj))
        this.listInfo = info
      }
      this.visible = true
    },
    // 更新列表
    upload() {
      this.$refs.list.uploadPr(this.$refs.tabs.qFilter())
    },
    uploadPage(val) {
      this.$refs.list.fetchData(this.$refs.tabs.qFilter())
    },
    // 查询
    query() {
      this.$refs.list.uploadPr(this.$refs.tabs.qFilter())
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
