export function appIdFromDataUrl(dataUrl = '') {
  const { pathname } = new URL(dataUrl)
  const [, app, id] = pathname.split('/')
  if (app !== 'app' || !id) throw new Error('Invalid Data API URL')
  return id
}
