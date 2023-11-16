import {
    Collection
} from "./collection.mjs";

export class Db {

    #db;

    constructor(client, databaseName) {
        this.options = Object.assign(
            Object.create(client.options),
            {client, databaseName}
        )
    }

    init() {
        return this.#db ??= this.options.client.init()
            .then(mongo => mongo.db(this.options.databaseName));
    }

    collection(name) {
        return new Collection(this, name);
    }

}
