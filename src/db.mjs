import {MongoRealmCollection} from "./collection.mjs";

export class MongoRealmDb {

    constructor(client, databaseName) {
        this.options = Object.assign(
            Object.create(client.options),
            {client, databaseName}
        )
    }

    init() {
        const {client, databaseName} = this.options;
        return this.options.db ??= client.init()
            .then(mongo => mongo.db(databaseName));
    }

    collection(name) {
        return new MongoRealmCollection(this, name);
    }

}
