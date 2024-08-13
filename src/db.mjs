import { Collection } from './collection.mjs'

export class Db {
  #db

  constructor(client, databaseName) {
    this.options = Object.assign(Object.create(client.options), {
      databaseName,
      client,
    })
  }

  init() {
    return (this.#db ??= this.options.client
      .init()
      .then(mongo => mongo.db(this.options.databaseName)))
  }

  collection(name) {
    return new Collection(this, name)
  }

  async command(command) {
    switch (true) {
      case command.hello:
        return { ok: 1, setName: '', setVersion: '' }
      default:
        return { ok: 0 }
    }
  }
}
