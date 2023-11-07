export class MongoRealmCursor {

    #results;
    #index = 0;

    init() {
        throw new Error("No init() method in cursor");
    }

    async toArray() {
        const cursor = await this.init();
        return this.#results ??= await cursor.toArray();
    }

    async next() {
        await this.toArray();
        if (this.#results.length >= this.#index) return null;
        return this.#results.at(this.#index++);
    }

}
