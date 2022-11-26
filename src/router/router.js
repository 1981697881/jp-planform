export default file => {
  return map[file] || null
}

const map = {
  Layout: () => import('@/layout'),
  error: () => import('@/views/404'),
  '/basic': () => import('@/layout'),
  'clerk': () => import('@/views/basic/clerk'),
  'company': () => import('@/views/basic/company'),

  'machine': () => import('@/views/commodity/machine'),
  'ItemNo': () => import('@/views/commodity/ItemNo'),
  'series': () => import('@/views/commodity/series'),
  'label': () => import('@/views/commodity/label'),
  'colors': () => import('@/views/commodity/colors'),
  'sizes': () => import('@/views/commodity/sizes'),
  'users': () => import('@/views/system/users'),
}
