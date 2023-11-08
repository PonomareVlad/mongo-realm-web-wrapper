import {MongoRealmCursor} from "./cursor.mjs";

export class MongoRealmFindCursor extends MongoRealmCursor {

    #cursor;

    constructor(collection, filter, options) {
        super();
        this.options = Object.assign(
            Object.create(collection.options),
            {collection, filter, options}
        )
    }

    init() {
        return this.#cursor ??= this.options.collection.init().then(collection => {
            const {filter, options} = this.options;
            return collection.find(filter, options);
        });
    }

}
