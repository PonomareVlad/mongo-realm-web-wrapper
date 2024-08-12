import { AbstractCursor } from './cursor.mjs'

export class AggregationCursor extends AbstractCursor {
  #cursor

  constructor(collection, pipeline) {
    super()
    this.options = Object.assign(Object.create(collection.options), {
      collection,
      pipeline,
    })
  }

  init() {
    return (this.#cursor ??= this.options.collection
      .init()
      .then(collection => collection.aggregate(this.options.pipeline)))
  }
}
