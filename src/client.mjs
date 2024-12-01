import { Db } from './db.mjs'
import { ClientSession } from './session.mjs'
import { appIdFromDataUrl } from './utils.mjs'
import { App, Credentials } from 'realm-web'

export class MongoClient {
  #mongo

  constructor({
    url,
    key,
    serviceName,
    id = appIdFromDataUrl(url),
    credentials = Credentials.apiKey(key),
    app = new App({ id }),
  } = {}) {
    this.options = { app, serviceName, credentials }
  }

  init() {
    return (this.#mongo ??= this.connect().then(() => {
      const { serviceName, app: { currentUser } = {} } = this.options
      if (!currentUser) throw new Error('Client not logged in')
      return currentUser.mongoClient(serviceName)
    }))
  }

  async connect() {
    const { app, credentials } = this.options
    if (app.currentUser) return this
    await app.logIn(credentials)
    return this
  }

  async close() {
    const { app: { currentUser } = {} } = this.options
    if (!currentUser) return
    await currentUser.logOut()
  }

  db(dbName) {
    return new Db(this, dbName)
  }

  async withSession(executor) {
    const session = this.startSession()
    const result = await executor(session)
    await session.endSession()
    return result
  }

  startSession() {
    return new ClientSession()
  }

  getMaxListeners() {
    return 1
  }

  setMaxListeners() {
    return this
  }

  on() {
    return this
  }
}
