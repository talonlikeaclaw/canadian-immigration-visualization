import { MongoClient, ServerApiVersion } from 'mongodb';
import process from 'node:process';

process.loadEnvFile();
const NODE_ENV = process.env.NODE_ENV ?? 'develoment';
const ATLAS_URI =
  NODE_ENV === 'production'
    ? process.env.ATLAS_URI_PROD
    : process.env.ATLAS_URI_DEV;

let instance = null;

class DB {
  constructor() {
    if (!instance) {
      instance = this;
      this.mongoClient = null;
      this.db = null;
      this.collection = null;
    }
    return instance;
  }

  // Only connect to database if not already connected
  async connect(dbName) {
    if (instance.db) {
      return;
    }
    this.mongoClient = new MongoClient(ATLAS_URI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
      }
    });
    await instance.mongoClient.connect();
    instance.db = await instance.mongoClient.db(dbName);
    await instance.mongoClient.db(dbName).command({ ping: 1 });
    console.log(
      '[DB] Successfully connected to MongoDB database ' + dbName
    );
  }

  // Set the collection desired
  async setCollection(collectionName) {
    instance.collection = await instance.db.collection(collectionName);
  }

  // Close the connection when gracefully shutting down
  async close() {
    await instance.mongoClient.close();
    this.db = null;
    this.collection = null;
  }

  readAll() {
    return instance.collection.find().project({ _id: 0 }).toArray();
  }

  create(quote) {
    return instance.collection.insertOne(quote);
  }

  async createMany(quotes) {
    const result = await instance.collection.insertMany(quotes);
    return result.insertedCount;
  }
}

export const db = new DB();
