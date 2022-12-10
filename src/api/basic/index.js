import request from '@/utils/request'
import {
  getToken
} from '@/utils/auth'

// 职员管理-获取列表
export function getClerkList(params, query) {
  const url = '/Admin/employee/list/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('jprx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: query
  })
}

// 职员管理-新增
export function addClerk(params) {
  return request({
    url: '/employee/add',
    headers: {
      'authorization': getToken('jprx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}

// 职员管理-修改
export function alterClerk(params) {
  return request({
    url: '/employee/update',
    headers: {
      'authorization': getToken('jprx'),
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    data: params
  })
}

// 职员管理-获取详情
export function clerkInfo(params) {
  return request({
    url: '/table/list' + params,
    headers: {
      'authorization': getToken('jprx')
    },
    method: 'get'
  })
}

// 职员管理-获取部门下拉
export function clerkDepartment(params) {
  return request({
    url: '/table/list' + params,
    headers: {
      'authorization': getToken('jprx')
    },
    method: 'get',
    params
  })
}

// 职员管理-删除
export function delClerk(params) {
  return request({
    url: '/employee/del/' + params,
    headers: {
      'authorization': getToken('jprx')
    },
    method: 'delete',
  })
}// 公司管理-获取列表
export function getCompanyList(params, query) {
  const url = '/company/companyList/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('jprx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: query
  })
}

// 公司管理-新增
export function addCompany(params) {
  return request({
    url: '/company/addCompany',
    headers: {
      'authorization': getToken('jprx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 公司管理-删除
export function deleteCompany(params) {
  return request({
    url: '/company/deleteCompany',
    headers: {
      'authorization': getToken('jprx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}// 删除图片
export function deleteImg(params) {
  return request({
    url: '/file/deleteImg',
    headers: {
      'authorization': getToken('jprx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 尺码对照-获取列表
export function getContrastSizeList(params, query) {
  const url = '/contrastSizeDetail/contrastSizeList/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('jprx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: query
  })
}

// 尺码对照-新增
export function addContrastSize(params) {
  return request({
    url: '/contrastSizeDetail/addContrastSize',
    headers: {
      'authorization': getToken('jprx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 尺码对照-删除
export function deleteContrastSize(params) {
  return request({
    url: '/contrastSizeDetail/deleteContrastSize',
    headers: {
      'authorization': getToken('jprx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}

// 订单管理-上传文件明细
export function temporaryLabels(params) {
  return request({
    url: '/temporaryLabel/temporaryLabels',
    headers: {
      'authorization': getToken('jprx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 订单管理-确认
export function temporaryLabelsConfirm(params) {
  return request({
    url: '/temporaryLabel/confirm',
    headers: {
      'authorization': getToken('jprx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 订单管理-保存导入数据
export function inputTemporaryLabel(params) {
  return request({
    url: '/temporaryLabel/inputTemporaryLabel',
    headers: {
      'authorization': getToken('jprx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
