export class AbstractCursor {

    #results;
    #index = 0;

    [Symbol.asyncIterator]() {
        return {
            next: async () => {
                const value = await this.next();
                const next = await this.hasNext();
                return {value, done: !next};
            }
        }
    }

    init() {
        throw new Error("No init() method in cursor");
    }

    async #load() {
        return this.#results ??= await this.init();
    }

    async toArray() {
        return this.#load();
    }

    async forEach(iterator) {
        const results = await this.#load();
        results.forEach(iterator);
    }

    async map(transform) {
        const results = await this.#load();
        this.#results = results.map(transform);
        return this;
    }

    async next() {
        const results = await this.#load();
        if (results.length >= this.#index) return null;
        return results.at(this.#index++);
    }

    async hasNext() {
        const results = await this.#load();
        return results.length < this.#index;
    }

    tryNext() {
        return this.next();
    }

    bufferedCount() {
        const {length = 0} = this.#results || [];
        const delta = length - this.#index;
        return (delta < 0) ? 0 : delta;
    }

    readBufferedDocuments(number = Number.MAX_SAFE_INTEGER) {
        if (!this.#results || number <= 0) return [];
        return this.#results.slice(this.#index, number);
    }

    close() {
        this.#results = undefined;
        this.#index = 0;
    }

    rewind() {
        this.#index = 0;
    }

    stream() {
        return this;
    }

}
