import Dexie, { Table } from 'dexie';
import { City } from '../model/city';



export class AppDB extends Dexie {

    cities!: Table<City, string>
    
    constructor() {
        super('fileupload')
        this.version(1).stores({
            cities: 'code, city_name'
        })
    }

    async addCity(item: City) {
        await this.cities.put(item)     // inserts of updates the item in the database, if pk already exists, it updates existing entry
    }
}


export const db = new AppDB();