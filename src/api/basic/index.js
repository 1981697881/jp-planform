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


