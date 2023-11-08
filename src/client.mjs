import {App, Credentials} from "realm-web";
import {appIdFromDataUrl} from "./utils.mjs";
import {MongoRealmDb} from "./db.mjs";

export class MongoRealmClient {

    #mongo;

    constructor({
                    url,
                    key,
                    serviceName,
                    id = appIdFromDataUrl(url),
                    credentials = Credentials.apiKey(key),
                    app = new App({id})
                } = {}) {
        this.options = {app, serviceName, credentials}
    }

    init() {
        return this.#mongo ??= this.connect().then(() => {
            const {
                serviceName,
                app: {currentUser} = {}
            } = this.options
            if (!currentUser)
                throw new Error("Client not logged in");
            return currentUser.mongoClient(serviceName);
        });
    }

    async connect() {
        const {app, credentials} = this.options;
        if (app.currentUser) return this;
        await app.logIn(credentials);
        return this;
    }

    async close() {
        const {
            app: {currentUser} = {}
        } = this.options;
        if (!currentUser) return;
        await currentUser.logOut();
    }

    db(dbName) {
        return new MongoRealmDb(this, dbName);
    }

}
