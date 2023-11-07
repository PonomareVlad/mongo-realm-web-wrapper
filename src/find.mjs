import {MongoRealmCursor} from "./cursor.mjs";

export class MongoRealmFindCursor extends MongoRealmCursor {

    constructor(collection, filter, options) {
        super();
        this.options = Object.assign(
            Object.create(collection.options),
            {collection, filter, options}
        )
    }

    init() {
        const {collection, filter, options} = this.options;
        return this.options.cursor ??= collection.init()
            .then(collection => collection.find(filter, options));
    }

}
