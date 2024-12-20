import { FindCursor } from './find.mjs'
import { AggregationCursor } from './aggregate.mjs'

export class Collection {
  #collection

  constructor(db, collectionName) {
    this.options = Object.assign(Object.create(db.options), {
      collectionName,
      db,
    })
  }

  init() {
    return (this.#collection ??= this.options.db
      .init()
      .then(db => db.collection(this.options.collectionName)))
  }

  aggregate(pipeline) {
    return new AggregationCursor(this, pipeline)
  }

  async count(filter, options) {
    const collection = await this.init()
    return collection.count(filter, options)
  }

  countDocuments(filter, options) {
    return this.count(filter, options)
  }

  estimatedDocumentCount(options) {
    return this.count(undefined, options)
  }

  async deleteMany(filter) {
    const collection = await this.init()
    return collection.deleteMany(filter)
  }

  async deleteOne(filter) {
    const collection = await this.init()
    return collection.deleteOne(filter)
  }

  find(filter, options) {
    return new FindCursor(this, filter, options)
  }

  async findOne(filter, options) {
    const collection = await this.init()
    return collection.findOne(filter, options)
  }

  async findOneAndDelete(filter, options) {
    const collection = await this.init()
    return collection.findOneAndDelete(filter, options)
  }

  async findOneAndReplace(filter, replacement, options) {
    const collection = await this.init()
    return collection.findOneAndReplace(filter, replacement, options)
  }

  async findOneAndUpdate(filter, update, options) {
    const collection = await this.init()
    return collection.findOneAndUpdate(filter, update, options)
  }

  async insertMany(docs) {
    const collection = await this.init()
    return collection.insertMany(docs)
  }

  async insertOne(doc) {
    const collection = await this.init()
    return collection.insertOne(doc)
  }

  async updateMany(filter, update, options) {
    const collection = await this.init()
    return collection.updateMany(filter, update, options)
  }

  async updateOne(filter, update, options) {
    const collection = await this.init()
    return collection.updateOne(filter, update, options)
  }

  async replaceOne(filter, replacement, options) {
    return this.updateOne(filter, { $set: replacement }, options)
  }

  async watch(pipeline, options) {
    const collection = await this.init()
    return collection.watch(options)
  }

  async createIndex() {
    return ''
  }
}
