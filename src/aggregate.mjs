import {MongoRealmCursor} from "./cursor.mjs";

export class MongoRealmAggregateCursor extends MongoRealmCursor {

    constructor(collection, pipeline) {
        super();
        this.options = Object.assign(
            Object.create(collection.options),
            {collection, pipeline}
        )
    }

    init() {
        const {collection, pipeline} = this.options;
        return this.options.cursor ??= collection.init()
            .then(collection => collection.aggregate(pipeline));
    }

}
