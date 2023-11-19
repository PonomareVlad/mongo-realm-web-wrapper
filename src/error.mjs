import {MongoDBRealmError} from "realm-web";

export class MongoError extends MongoDBRealmError {
}

export class MongoServerError extends MongoError {
}
