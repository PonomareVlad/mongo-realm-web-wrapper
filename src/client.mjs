import {App, Credentials} from "realm-web";
import {MongoRealmDb} from "./db.mjs";

export class MongoRealmClient {

    constructor(id, {
        serviceName,
        app = new App({id}),
        credentials = Credentials.anonymous()
    } = {}) {
        this.options = {app, serviceName, credentials}
    }

    init() {
        const {app, serviceName, credentials} = this.options;
        return this.options.mongo ??= app.logIn(credentials)
            .then(user => user.mongoClient(serviceName));
    }

    db(dbName) {
        return new MongoRealmDb(this, dbName);
    }

    connect() {
        return this;
    }

    close() {
        return this;
    }

}
