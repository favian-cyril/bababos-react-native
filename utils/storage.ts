import { Platform } from 'react-native';
import * as SQLite from 'expo-sqlite';

class Storage {
  #sqlite: SQLite.SQLiteDatabase | null;
  constructor() {
    this.#sqlite = null
  }

  async init() {
    if (Platform.OS === 'android') {
      this.#sqlite = SQLite.openDatabase('myapp.db')
      await this.#sqlite.transactionAsync(async (tx) => {
        await tx.executeSqlAsync(`CREATE TABLE IF NOT EXISTS cart (id INTEGER, title TEXT, price REAL, description TEXT, category TEXT, image TEXT, rating REAL, ratingCount INTEGER)`)
      });
    }
    console.log('DB Initiated');
    
  }

  async get(key: string) {
    try {
      if (Platform.OS === 'web') {
        const storedData = localStorage.getItem(key);
        return storedData ? JSON.parse(storedData) : null;
      } else if (Platform.OS === 'android') {
        let res = null;
        if (this.#sqlite !== null) {
          await this.#sqlite.transactionAsync(async (tx) => {
            const data = await tx.executeSqlAsync(`SELECT * FROM ${key}`)
            res = data.rows
          })
        }
        return res;
      }
    } catch (error) {
      console.error('Error fetching data from storage:', error);
      return null;
    }
  }

  async set(key: string, newData: any) {
    try {
      if (Platform.OS === 'web') {
        const currentData = await this.get(key);
        
        if (currentData) {
          currentData.push(newData);
          localStorage.setItem(key, JSON.stringify(currentData))
        } else {
          localStorage.setItem(key, JSON.stringify([newData]));
        }
      } else if (Platform.OS === 'android') {
        if (typeof newData === 'string' || Array.isArray(newData)) {
          throw Error('Cannot parse data type');
        } else {
          const columns = Object.keys(newData);
          const values = Object.values(newData);
        
          const columnString = columns.join(', ');
          const valuePlaceholders = values.map((val) => typeof val === 'string' ? `"${val}"` : val).join(', ');
          
          if (this.#sqlite !== null) {
            await this.#sqlite.transactionAsync(async (tx) => {
              await tx.executeSqlAsync(`INSERT INTO ${key} (${columnString}) VALUES (${valuePlaceholders})`)
            });
          }
        }
      
      }
    } catch (error) {
      console.error('Error storing data to storage:', error);
    }
  }
};

export default Storage;
