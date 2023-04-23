export function throwNotice(type: 'error' | 'warning' | 'success' | 'info', message: string) {
  ElNotification({
    title: type.toUpperCase(),
    message: message,
    type: type,
    position: 'top-left'
  })
}
