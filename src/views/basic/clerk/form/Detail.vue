<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'工号'" prop="jobNum">
            <el-input v-model="form.jobNum"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'名称'" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'职员角色'" prop="storeId">
            <el-select v-model="form.storeId" class="width-full" placeholder="请选择">
              <el-option :label="t.name" :value="t.value" v-for="(t,i) in levelFormat" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'联系地址'">
            <el-input v-model="form.address"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'联系电话'">
            <el-input v-model="form.tel"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'描述'">
            <el-input v-model="form.remark"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'是否开单'">
            <el-switch
              v-model="form.disable"
              :active-value=false
              :inactive-value=true>
            </el-switch>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-dialog
      :visible.sync="visible"
      title="微信用户"
      v-if="visible"
      :width="'50%'"
      destroy-on-close
      append-to-body
    >
      <el-form ref="postform" label-width="80px" :size="'mini'">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label-width="0">
              <el-input v-model="username" placeholder="名称">
                <el-button slot="append" icon="el-icon-search" @click="fetchFormat"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="20">
          <el-col :span="24">
            <el-table class="list-main" height="200px" :data="list" border size="mini" :highlight-current-row="true"
                      @row-dblclick="dblclick">
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
    </el-dialog>
    <div slot="footer" style="text-align:center">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>

<script>import { addClerk, alterClerk, clerkInfo } from '@/api/basic/index'

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
        eid: null,
        jobNum: null,
        address: null,
        tel: null,
        uid: null,
        disable: true,
        username: null,
        remark: null,
        name: null// 名称
      },
      list: [],
      columns: [
        { text: '会员名称', name: 'username' },
        { text: '微信号', name: 'wechatId' },
        { text: '联系地址', name: 'adress' },
        { text: '联系电话', name: 'phoneNumber' },
        { text: '注册时间', name: 'createDatetime' },
        { text: '最后登录时间', name: 'editDatetime' },
        { text: '生日', name: 'birthday' },
        { text: '性别', name: 'sex' },
        { text: '描述', name: 'describes' }
      ],
      disPl: true,
      visible: null,
      username: '',
      pidS: [],
      levelFormat: [{ name: '管理员', value: '0' }, { name: '生产企业', value: '1' }, { name: '打码平台', value: '2' }, { name: '销售员', value: '3' }],
      rules: {
        jobNum: [
          { required: true, message: '请输入工号', trigger: 'blur' }
        ],
        storeId: [
          { required: true, message: '请输入选择', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输入名稱', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    if (this.listInfo) {
      this.form = this.listInfo
    }
  },
  methods: {
    query() {
      this.visible = true
    },
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          if (typeof (this.form.eid) != undefined && this.form.eid != null) {
            alterClerk(this.form).then(res => {
              this.$emit('hideDialog', false)
              this.$emit('uploadList')
            })
          } else {
            addClerk(this.form).then(res => {
              this.$emit('hideDialog', false)
              this.$emit('uploadList')
            })
          }
        } else {
          return false
        }
      })
    },
    dblclick(obj) {
      this.visible = false
      this.form.wechatName = obj.username
      this.form.uid = obj.uid
    },
    fetchData(val) {
      clerkInfo(val).then(res => {
        this.form = res.data
      })
    }
  }
}
</script>

<style>
</style>
