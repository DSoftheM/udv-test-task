import { IDBPDatabase, openDB } from "idb";

export class IndexedDB {
    private dbPromise: Promise<IDBPDatabase<unknown>> = new Promise(() => { });
    private storageNames: string[] = [];

    constructor(private dbName: string) { }

    public async openDb(storageName: string) {
        this.storageNames.push(storageName);
        this.dbPromise = openDB(this.dbName, 1, {
            upgrade(db: IDBPDatabase<unknown>) {
                db.createObjectStore(storageName);
            },
        });
    }

    public async get(key: string) {
        return (await this.dbPromise).get(this.storageNames[0], key);
    }

    public async set(key: string, val: any) {
        return (await this.dbPromise).put(this.storageNames[0], val, key);
    }

    public async del(key: string) {
        return (await this.dbPromise).delete(this.storageNames[0], key);
    }

    public async clear() {
        return (await this.dbPromise).clear(this.storageNames[0]);
    }

    public async keys() {
        return (await this.dbPromise).getAllKeys(this.storageNames[0]);
    }
}