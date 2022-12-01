import request from '@/utils/request'
import {
  getToken
} from '@/utils/auth'

// 产品信息-获取列表
export function getGoodsList(params, data) {
  const url = '/specification/specificationList/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('jprx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: data
  })
}
// 产品信息-下拉
export function specificationForm(params) {
  const url = '/specification/specificationForm'
  return request({
    url: url,
    headers: {
      'authorization': getToken('jprx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: params
  })
}
// 产品信息-新增
export function addCommodity(params) {
  const url = '/specification/addSpecification'
  return request({
    url: url,
    headers: {
      'authorization': getToken('jprx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: params
  })
}
// 产品信息-刪除
export function deleteCommodity(params) {
  const url = '/specification/deleteSpecification'
  return request({
    url: url,
    headers: {
      'authorization': getToken('jprx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: params
  })
}
// 标签信息-获取列表
export function getLabelList(params, data) {
  const url = '/label/labelList/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('jprx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: data
  })
}
// 标签信息-生成
export function createLabel(params) {
  const url = '/label/createLabel'
  return request({
    url: url,
    headers: {
      'authorization': getToken('jprx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: params
  })
}
// 尺码颜色-获取列表
export function getSizeColorList(params, data) {
  const url = '/sizeColor/sizeColorList/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('jprx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: data
  })
}
// 尺码颜色-下拉
export function sizeColorForm(params) {
  const url = '/sizeColor/sizeColorForm'
  return request({
    url: url,
    headers: {
      'authorization': getToken('jprx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: params
  })
}
// 尺码颜色-新增
export function createSizeColor(params) {
  const url = '/sizeColor/createSizeColor'
  return request({
    url: url,
    headers: {
      'authorization': getToken('jprx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: params
  })
}
// 尺码颜色-刪除
export function deleteSizeColor(params) {
  const url = '/sizeColor/deleteSizeColor'
  return request({
    url: url,
    headers: {
      'authorization': getToken('jprx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: params
  })
}
// 产品上传-获取列表
export function getTemporaryLabelList(params, data) {
  const url = '/temporaryLabel/temporaryLabelList/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('jprx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: data
  })
}
// 产品上传-刪除
export function deleteTemporaryLabel(params) {
  const url = '/temporaryLabel/deleteTemporaryLabel'
  return request({
    url: url,
    headers: {
      'authorization': getToken('jprx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: params
  })
}// 标签信息-刪除
export function deleteLabel(params) {
  const url = '/label/deleteLabel'
  return request({
    url: url,
    headers: {
      'authorization': getToken('jprx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: params
  })
}
