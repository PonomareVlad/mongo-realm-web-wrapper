import {MongoRealmFindCursor} from "./find.mjs";
import {MongoRealmAggregateCursor} from "./aggregate.mjs";

export class MongoRealmCollection {

    constructor(db, collectionName) {
        this.options = Object.assign(
            Object.create(db.options),
            {db, collectionName}
        )
    }

    init() {
        const {db, collectionName} = this.options;
        return this.options.collection ??= db.init()
            .then(db => db.collection(collectionName));
    }

    async aggregate(pipeline) {
        return new MongoRealmAggregateCursor(this, pipeline);
    }

    async count(filter, options) {
        const collection = await this.init();
        return collection.count(filter, options);
    }

    async countDocuments(filter, options) {
        return this.count(filter, options);
    }

    async estimatedDocumentCount(options) {
        return this.count(undefined, options);
    }

    async deleteMany(filter) {
        const collection = await this.init();
        return collection.deleteMany(filter);
    }

    async deleteOne(filter) {
        const collection = await this.init();
        return collection.deleteOne(filter);
    }

    async find(filter, options) {
        return new MongoRealmFindCursor(this, filter, options);
    }

    async findOne(filter, options) {
        const collection = await this.init();
        return collection.findOne(filter, options);
    }

    async findOneAndDelete(filter, options) {
        const collection = await this.init();
        return collection.findOneAndDelete(filter, options);
    }

    async findOneAndReplace(filter, replacement, options) {
        const collection = await this.init();
        return collection.findOneAndReplace(filter, replacement, options);
    }

    async findOneAndUpdate(filter, update, options) {
        const collection = await this.init();
        return collection.findOneAndUpdate(filter, update, options);
    }

    async insertMany(docs) {
        const collection = await this.init();
        return collection.insertMany(docs);
    }

    async insertOne(doc) {
        const collection = await this.init();
        return collection.insertOne(doc);
    }

    async updateMany(filter, update, options) {
        const collection = await this.init();
        return collection.updateMany(filter, update, options);
    }

    async updateOne(filter, update, options) {
        const collection = await this.init();
        return collection.updateOne(filter, update, options);
    }

    async watch(pipeline, options) {
        const collection = await this.init();
        return collection.watch(options);
    }

}
