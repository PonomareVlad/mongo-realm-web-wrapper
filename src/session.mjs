export class ClientSession {
  hasEnded = false

  startTransaction() {}

  async withTransaction(executor) {
    this.startTransaction()
    const result = await executor(this)
    await this.commitTransaction()
    return result
  }

  async commitTransaction() {}

  async abortTransaction() {}

  async endSession() {
    this.hasEnded = true
  }
}
