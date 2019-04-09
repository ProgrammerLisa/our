import store from '@/store'
export function hasPermission (val) {
  if (store.getters.permissions.includes(val)) {
    return true
  } else {
    return false
  }
}
